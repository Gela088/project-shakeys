<?php
session_start();

// Database connection settings
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "project_shakeys";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle login
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['login'])) {
    // Get form data
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    // Validate inputs
    if (empty($email) || empty($password)) {
        echo "<script>alert('Email and password are required.'); window.history.back();</script>";
        exit;
    }

    // Check if user exists
    $sql = "SELECT id, firstName, password FROM users WHERE email = ?";
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            // User found, fetch user details
            $stmt->bind_result($userId, $firstName, $hashedPassword);
            $stmt->fetch();

            // Verify password
            if (password_verify($password, $hashedPassword)) {
                // Password is correct, start session
                $_SESSION['userId'] = $userId;
                $_SESSION['userName'] = $firstName; // Store first name in session
                header('Location: dashboard.php'); // Redirect to dashboard
                exit;
            } else {
                // Incorrect password
                echo "<script>alert('Invalid email or password.'); window.history.back();</script>";
            }
        } else {
            // User not found
            echo "<script>alert('Invalid email or password.'); window.history.back();</script>";
        }

        $stmt->close();
    } else {
        echo "<script>alert('Database error. Please try again later.'); window.history.back();</script>";
    }
}

// Close connection
$conn->close();
?>
