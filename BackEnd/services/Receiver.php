<?php
require './Connection.php'; // Include database connection
$basePath = dirname(__DIR__);
$response = ["success" => false];

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    // Directory to save resized images
    $baseDirectory = 'uploads/' . date('YmdH') . "/";

    // Ensure the base directory exists
    if (!is_dir($basePath . "/" . $baseDirectory)) {
        mkdir($basePath . "/" . $baseDirectory, 0777, true);
    }

    // Handle the uploaded file
    $image = $_FILES['image'];
    $fileName = basename($image['name']);
    $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);
    $uniqueId = uniqid('photo_', true);

    // Check for upload errors
    if ($image['error'] !== UPLOAD_ERR_OK) {
        $response["message"] = "Error uploading the file.";
        echo json_encode($response);
        exit;
    }

    // Get the image info
    $imageInfo = getimagesize($image['tmp_name']);
    if ($imageInfo === false) {
        $response["message"] = "The file is not a valid image.";
        echo json_encode($response);
        exit;
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
            echo json_encode($response);
            exit;
    }

    // Get the original dimensions
    $originalWidth = $imageInfo[0];
    $originalHeight = $imageInfo[1];

    // Define sizes to create
    $sizes = [100, 256, 512, 1024];
    $savedPath = '';

    foreach ($sizes as $size) {
        // Calculate new dimensions
        if ($originalWidth > $originalHeight) {
            $newWidth = $size;
            $newHeight = intval($originalHeight * ($size / $originalWidth));
        } else {
            $newHeight = $size;
            $newWidth = intval($originalWidth * ($size / $originalHeight));
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

        // Subdirectory for the current size
        $sizeDirectory = $baseDirectory . $size . '/';
        if (!is_dir($basePath . "/" . $sizeDirectory)) {
            mkdir($basePath . "/" . $sizeDirectory, 0777, true);
        }

        // Save the resized image
        $targetFile = $sizeDirectory . $uniqueId . '.' . $fileExtension;
        switch ($mimeType) {
            case 'image/jpeg':
                imagejpeg($resizedImage, $basePath . "/" . $targetFile, 90);
                break;
            case 'image/png':
                imagepng($resizedImage, $basePath . "/" . $targetFile, 9);
                break;
            case 'image/gif':
                imagegif($resizedImage, $basePath . "/" . $targetFile);
                break;
        }

        // Save the path for the 512 size in the database
        if ($size === 512) {
            $savedPath = $targetFile;
        }

        // Free memory for the resized image
        imagedestroy($resizedImage);
    }

    // Save details to the database for the 512 size
    $name = $fileName;
    $path = $savedPath;
    $order = getPhotoNextOrder();
    $url = 'http://' . $_SERVER['HTTP_HOST'] . '/' . $savedPath;
    $createTime = date('Y-m-d H:i:s');

    $stmt = $mysqli->prepare("INSERT INTO photos (`name`, `order`, `path`, `url`, `create_time`) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sisss", $name, $order, $path, $url, $createTime);

    if ($stmt->execute()) {
        $response["success"] = true;
        setOption("photoNextOrder", $order);
    } else {
        $response["message"] = $stmt->error;
    }

    $stmt->close();

    // Free memory for the source image
    imagedestroy($srcImage);
} else {
    $response["message"] = 'No image file uploaded';
}

echo json_encode($response);
