<?php
require("./Connection.php");

/*
    CREATE DATABASE photo_viewer;
    CREATE TABLE `options` (
        `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
        `name` varchar(16) NOT NULL,
        `data` varchar(512) NOT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `UNIQUE` (`name`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
*/



// Array of queries
$queries = [
    "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), email VARCHAR(100));",
];

// Function to get the last executed index
function getLastExecutedIndex($mysqli) {
    $result = $mysqli->query("SELECT data FROM options where name='lastQueryIndex' order by id desc limit 1");
    if ($result && $row = $result->fetch_assoc()) {
        return (int) $row['data'];
    }
    return 0; // Default to 0 if no entry exists
}

// Function to update the last executed index
function updateLastExecutedIndex($mysqli, $index) {
    $stmt = $mysqli->prepare("INSERT INTO options (name, data) VALUES ('lastQueryIndex', ?)");
    $stmt->bind_param("i", $index);
    $stmt->execute();
    $stmt->close();
}

// Main logic
$lastExecutedIndex = getLastExecutedIndex($mysqli);
echo "Last executed index: $lastExecutedIndex\n";

for ($i = $lastExecutedIndex; $i < count($queries); $i++) {
    $query = $queries[$i];
    if ($mysqli->query($query) === TRUE) {
        echo "Executed query: $query\n";
        updateLastExecutedIndex($mysqli, $i + 1);
    } else {
        echo "Error executing query: " . $mysqli->error . "\n";
        break; // Stop execution on error to avoid incorrect indexing
    }
}

// Close the connection
$mysqli->close();
