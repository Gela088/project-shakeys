<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $title = $_POST['title'];
    $description = $_POST['description'];

    $sql = "INSERT INTO concerns (title, description) VALUES ('$title', '$description')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Concern submitted successfully"]);
    } else {
        echo json_encode(["error" => "Error: " . $conn->error]);
    }
}
?>
