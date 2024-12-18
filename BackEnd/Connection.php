<?php
global $mysqli;
date_default_timezone_set("Asia/Calcutta");   //India time (GMT+5:30)

// Database credentials
$host = 'localhost';
$username = 'root'; // Update with your username
$password = ''; // Update with your password
$database = 'photo_viewer'; // Update with your database name

// Connect to the database
$mysqli = new mysqli($host, $username, $password, $database);

// Check connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Optionally set character set to UTF-8
$mysqli->set_charset("utf8mb4");

function getOption($optionName) {
    global $mysqli;
    $result = $mysqli->query("SELECT data FROM options where name='" . $optionName . "' order by id desc limit 1");
    if ($result && $row = $result->fetch_assoc()) {
        return $row['data'];
    }
    return NULL; // Default to NULL if no entry exists
}

function getPhotoNextOrder() {
    $order =  (int) getOption("photoNextOrder");
    if (empty($order)) {
        $order = 0;
    }
    return ++$order;
}

function setOption($optionName, $optionValue) {
    global $mysqli;
    // $stmt = $mysqli->prepare("INSERT INTO options (name, data) VALUES ('$optionName', ?)");
    $stmt = $mysqli->prepare("INSERT INTO options (`name`, `data`) VALUES ('$optionName', ?) ON DUPLICATE KEY UPDATE `data` = VALUES(`data`)");
    $stmt->bind_param("s", $optionValue);
    $stmt->execute();
    $stmt->close();
    return true;
}
