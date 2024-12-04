<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "project_shakeys";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    error_log("Database connection failed: " . $conn->connect_error); // Logs the error to a server log.
    die("Unable to connect to the database. Please try again later.");
}
?>
