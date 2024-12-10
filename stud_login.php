<?php
include 'includes/db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $accessCode = $_POST['access-code'];

    // Check credentials in the database
    $sql = "SELECT * FROM students WHERE email = ? AND access_code = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $email, $accessCode);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(["message" => "Login successful", "role" => "student"]);
    } else {
        echo json_encode(["message" => "Invalid credentials"]);
    }
    $stmt->close();
}
$conn->close();
?>
