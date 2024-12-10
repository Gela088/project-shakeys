<?php
include 'db.php';

$sql = "SELECT * FROM notifications ORDER BY time DESC";
$result = $conn->query($sql);

$notifications = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $notifications[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($notifications);
?>
