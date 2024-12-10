<?php
$host = "localhost";
$user = "root";
$password = ""; // Add your MySQL password
$database = "dashboard";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
