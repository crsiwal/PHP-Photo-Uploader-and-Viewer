<?php
$basePath = dirname(__DIR__);

// Include the database connection file
require_once './Connection.php';  // Ensure you include the file where $mysqli is initialized

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Set the Content-Type header for JSON response
header('Content-Type: application/json');

$response = [];

// Get pagination parameters from URL query
if (isset($_GET['id'])) {
    $id = (int)$_GET['id'];
    $direction = (isset($_GET['left']) && $_GET['left'] == "true") ? "left" : 'right';

    // SQL query to fetch only id and url, ordered by 'order' and paginated
    $sql = "SELECT id, path as file_path, url as download_url FROM photos where id = ?";

    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();

    // Fetch the result set
    $result = $stmt->get_result();

    // Check if any rows were returned
    if ($result->num_rows > 0) {
        // Prepare the response data
        $image = $result->fetch_assoc();
        if ($image) {
            $sizes = [100, 256, 512, 1024];
            $originalPath = $basePath . "/" . $image["file_path"];
            foreach ($sizes as $size) {
                // Replace "/1024/" with the current size in the path
                $imagePath = str_replace('/1024/', "/$size/", $originalPath);

                // Rotate image
                if (rotateImage($imagePath, $direction)) {
                    $response["urls"][$size] = strval(str_replace('/1024/', "/$size/", $image["download_url"]));
                }
            }
        }
    }
    // Close the statement and connection
    $stmt->close();
    $mysqli->close();
}

// Send success response with images data
echo json_encode($response);





function rotateImage($imagePath, $direction) {
    if (!file_exists($imagePath)) {
        return false;
    }

    try {

        // Get image type
        $imageInfo = getimagesize($imagePath);
        $mime = $imageInfo['mime'];

        // Load the image based on type
        switch ($mime) {
            case 'image/jpeg':
                $image = imagecreatefromjpeg($imagePath);
                break;
            case 'image/png':
                $image = imagecreatefrompng($imagePath);
                break;
            case 'image/gif':
                $image = imagecreatefromgif($imagePath);
                break;
            default:
                die("Unsupported image type: " . $mime);
        }

        // Rotate the image by 90 degrees left or right
        $rotatedImage = imagerotate($image, $direction === 'left' ? -90 : 90, 0);

        // Save the rotated image, replacing the original
        switch ($mime) {
            case 'image/jpeg':
                imagejpeg($rotatedImage, $imagePath, 100);
                break;
            case 'image/png':
                imagepng($rotatedImage, $imagePath);
                break;
            case 'image/gif':
                imagegif($rotatedImage, $imagePath);
                break;
        }

        // Free memory
        imagedestroy($image);
        imagedestroy($rotatedImage);
        return true;
    } catch (Exception $e) {
        return false;
    }
}
