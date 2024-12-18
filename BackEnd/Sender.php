<?php
include("./functions.php");

// Directory with images
$imageDirectory = 'D:\Upload\01'; // Replace with your directory path
$receiverUrl = 'http://web6.adgyde.in/Receiver.php';

// Get all files in the directory
$files = scandir($imageDirectory);

// Filter out non-image files and sort files alphabetically
$files = array_filter($files, function ($file) use ($imageDirectory) {
    $filePath = $imageDirectory . '/' . $file;
    $fileNameWithoutExtension = pathinfo($file, PATHINFO_FILENAME); // Remove the extension
    return is_file($filePath) && !str_ends_with($fileNameWithoutExtension, '_done') && preg_match('/\.(jpg|jpeg|png|gif)$/i', $file);
});

sort($files); // Ensure files are processed in sorted order

// Process each file
foreach ($files as $file) {
    $filePath = $imageDirectory . '/' . $file;

    echo "Processing: $file\n";

    // Prepare the file for upload
    $postFields = [
        'image' => new CURLFile($filePath)
    ];

    // Initialize cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $receiverUrl);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Execute the request
    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        echo "cURL error: " . curl_error($ch) . "\n";
        curl_close($ch);
        exit; // Exit the script on cURL error
    }

    // Close cURL
    curl_close($ch);

    // Decode the response
    $responseData = json_decode($response, true);

    // Check for success
    if ($responseData && isset($responseData['success']) && $responseData['success'] === true) {
        // Rename the file with "_done" postfix
        $newFilePath = $imageDirectory . '/' . pathinfo($file, PATHINFO_FILENAME) . '_done.' . pathinfo($file, PATHINFO_EXTENSION);
        if (rename($filePath, $newFilePath)) {
            echo "File marked as done: $newFilePath\n";
        } else {
            echo "Failed to rename file: $file\n";
        }
    } else {
        echo "Failed to upload file: $file\nResponse: $response\n";
        exit; // Exit the script if the response is not successful
    }
}

echo "All files processed.\n";
