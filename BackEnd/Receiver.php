<?php
require './Connection.php'; // Include database connection
$response = ["success" => false];
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    // Directory to save the resized image
    $targetDirectory = 'uploads/' . date('YmdH') . "/";

    // Ensure the directory exists
    if (!is_dir($targetDirectory)) {
        mkdir($targetDirectory, 0777, true);
    }

    // Handle the uploaded file
    $image = $_FILES['image'];
    $fileName = basename($image['name']);
    $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);
    $newFileName = uniqid('photo_', true) . '.' . $fileExtension; // Unique file name
    $targetFile = $targetDirectory . $newFileName;

    // Check for upload errors
    if ($image['error'] !== UPLOAD_ERR_OK) {
        $response["message"] = "Error uploading the file.";
    }

    // Get the image info
    $imageInfo = getimagesize($image['tmp_name']);
    if ($imageInfo === false) {
        $response["message"] = "The file is not a valid image.";
    }

    $mimeType = $imageInfo['mime'];

    // Create an image resource from the uploaded file
    switch ($mimeType) {
        case 'image/jpeg':
            $srcImage = imagecreatefromjpeg($image['tmp_name']);
            break;
        case 'image/png':
            $srcImage = imagecreatefrompng($image['tmp_name']);
            break;
        case 'image/gif':
            $srcImage = imagecreatefromgif($image['tmp_name']);
            break;
        default:
            $response["message"] = "Unsupported image type.";
    }

    // Get the original dimensions
    $originalWidth = $imageInfo[0];
    $originalHeight = $imageInfo[1];

    // Calculate the new dimensions (512 pixels as the max width or height)
    if ($originalWidth > $originalHeight) {
        $newWidth = 512;
        $newHeight = intval($originalHeight * (512 / $originalWidth));
    } else {
        $newHeight = 512;
        $newWidth = intval($originalWidth * (512 / $originalHeight));
    }

    // Create a new blank image with the new dimensions
    $resizedImage = imagecreatetruecolor($newWidth, $newHeight);

    // Preserve transparency for PNG and GIF
    if ($mimeType === 'image/png' || $mimeType === 'image/gif') {
        imagealphablending($resizedImage, false);
        imagesavealpha($resizedImage, true);
    }

    // Resize the image
    imagecopyresampled($resizedImage, $srcImage, 0, 0, 0, 0, $newWidth, $newHeight, $originalWidth, $originalHeight);

    // Save the resized image
    switch ($mimeType) {
        case 'image/jpeg':
            imagejpeg($resizedImage, $targetFile, 90); // Save as JPEG with 90% quality
            break;
        case 'image/png':
            imagepng($resizedImage, $targetFile, 9); // Save as PNG with max compression
            break;
        case 'image/gif':
            imagegif($resizedImage, $targetFile); // Save as GIF
            break;
    }

    // Free memory
    imagedestroy($srcImage);
    imagedestroy($resizedImage);

    // Save the image details to the database
    $name = $fileName; // Original file name
    $path = $targetFile; // Local file path
    $order = getPhotoNextOrder();
    $url = 'http://' . $_SERVER['HTTP_HOST'] . '/' . $targetFile; // Accessible URL
    $createTime = date('Y-m-d H:i:s'); // Current timestamp

    $stmt = $mysqli->prepare("INSERT INTO photos (`name`, `order`, `path`, `url`, `create_time`) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sisss", $name, $order, $path, $url, $createTime);

    if ($stmt->execute()) {
        $response["success"] = true;
        setOption("photoNextOrder", $order);
    } else {
        $response["message"] = $stmt->error;
    }

    $stmt->close();
} else {
    $response["message"] = 'No image file uploaded';
}
echo json_encode($response);
