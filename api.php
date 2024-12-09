<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "project_shakeys";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $pass = $_POST['password'];

    $sql = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($pass, $row['password'])) {
            $_SESSION['user_id'] = $row['id'];
            echo "Login successful!";
            // Redirect to dashboard or another page
        } else {
            echo "Invalid password.";
        }
    } else {
        echo "No user found with that email.";
    }
}

$conn->close();
?>