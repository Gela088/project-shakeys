<?php
// Database connection
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

// Handle user registration
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['signUp'])) {
    // Get form data
    $fName = trim($_POST['fName']);
    $lName = trim($_POST['lName']);
    $email = trim($_POST['email']);
    $password = $_POST['password']; // Plain text password

    // Validate inputs
    if (empty($fName) || empty($lName) || empty($email) || empty($password)) {
        echo "<script>alert('All fields are required.'); window.history.back();</script>";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Invalid email format.'); window.history.back();</script>";
        exit;
    }

    if (strlen($password) < 6) {
        echo "<script>alert('Password must be at least 6 characters long.'); window.history.back();</script>";
        exit;
    }

    // Check if email already exists
    $checkEmailQuery = "SELECT email FROM users WHERE email = ?";
    if ($stmt = $conn->prepare($checkEmailQuery)) {
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            echo "<script>alert('Email is already registered.'); window.location.href='index.html';</script>";
            $stmt->close();
            exit;
        }
        $stmt->close();
    } else {
        echo "<script>alert('Database error. Please try again later.'); window.history.back();</script>";
        exit;
    }

    // Insert user into the database
    $sql = "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)";
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("ssss", $fName, $lName, $email, $password); // Store password as plain text

        if ($stmt->execute()) {
            echo "<script>alert('Registration successful!'); window.location.href='index.html';</script>";
        } else {
            echo "<script>alert('Error: " . htmlspecialchars($stmt->error, ENT_QUOTES) . "'); window.history.back();</script>";
        }
        $stmt->close();
    } else {
        echo "<script>alert('Database error. Please try again later.'); window.history.back();</script>";
    }
}

// Close connection
$conn->close();
?>
