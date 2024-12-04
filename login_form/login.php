<?php
// Database connection
$servername = "localhost";
$username = "root"; // Your MySQL username
$password = ""; // Your MySQL password
$dbname = "project_shakeys"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle user login
if (isset($_POST['signIn'])) {
    // Get form data
    $email = $_POST['email'];
    $password = $_POST['password'];

    // SQL query to fetch user
    $sql = "SELECT first_name, last_name, password_hash FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($firstName, $lastName, $hashedPassword);

    if ($stmt->fetch() && password_verify($password, $hashedPassword)) {
        // Start the session and set session variables
        session_start();
        $_SESSION['email'] = $email;
        $_SESSION['firstName'] = $firstName;
        $_SESSION['lastName'] = $lastName;

        // Redirect to homepage or dashboard
        echo "<script>alert('Login successful!'); window.location.href='homepage.php';</script>";
    } else {
        echo "<script>alert('Invalid email or password.'); window.location.href='index.html';</script>";
    }

    $stmt->close();
}

// Close connection
$conn->close();
?>
