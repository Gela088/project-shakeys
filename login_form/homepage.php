<?php
session_start();
include("connect.php");

if(!isset($_SESSION['email'])) {
    header("Location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Homepage</title>
</head>
<body>
    <div style="text-align:center; padding:15%;">
        <p style="font-size:50px; font-weight:bold;">
            Hello  <?php 
            if(isset($_SESSION['email'])){
                $email = $_SESSION['email'];

                // Use prepared statement to prevent SQL injection
                $stmt = $conn->prepare("SELECT users.firstName, users.lastName FROM users WHERE users.email = ?");
                $stmt->bind_param("s", $email);  // "s" means the parameter is a string
                $stmt->execute();
                $result = $stmt->get_result();

                if($row = $result->fetch_assoc()) {
                    echo $row['firstName'].' '.$row['lastName'];
                }

                $stmt->close();
            }
            ?>
            :)
        </p>
        <a href="logout.php">Logout</a>
    </div>
</body>
</html>
