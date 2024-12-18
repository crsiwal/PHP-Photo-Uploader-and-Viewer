<?php
// Include the database connection file
require_once './Connection.php';  // Ensure you include the file where $mysqli is initialized

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Set the Content-Type header for JSON response
header('Content-Type: application/json');

// Get pagination parameters from URL query
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1; // Default to page 1
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10; // Default limit to 10 per page

// Validate pagination parameters
if ($page < 1) {
    $page = 1;
}

if ($limit < 1) {
    $limit = 10;
}

// Calculate the OFFSET for pagination
$offset = ($page - 1) * $limit;

// SQL query to fetch only id and url, ordered by 'order' and paginated
$sql = "SELECT id, `url` FROM photos ORDER BY `order` ASC LIMIT ?, ?";

$stmt = $mysqli->prepare($sql);
$stmt->bind_param("ii", $offset, $limit);
$stmt->execute();

// Fetch the result set
$result = $stmt->get_result();

// Check if any rows were returned
if ($result->num_rows > 0) {
    // Prepare the response data
    $images = [];
    while ($row = $result->fetch_assoc()) {
        $images[] = $row;
    }

    // Send success response with images data
    echo json_encode([
        'success' => true,
        'page' => $page,
        'limit' => $limit,
        'images' => $images
    ]);
} else {
    // Send response indicating no images found
    echo json_encode([
        'success' => false,
        'page' => $page,
        'limit' => $limit,
        'images' => [],
        'message' => 'No images found'
    ]);
}

// Close the statement and connection
$stmt->close();
$mysqli->close();
