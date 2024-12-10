<?php
// products.php
require 'config.php';

$query = "SELECT * FROM products";
$result = $conn->query($query);

while ($row = $result->fetch_assoc()) {
    echo "<div>";
    echo "<h2>" . $row['name'] . "</h2>";
    echo "<p>" . $row['description'] . "</p>";
    echo "<p>Price: $" . $row['price'] . "</p>";
    echo "<a href='add_to_cart.php?id=" . $row['id'] . "'>Add to Cart</a>";
    echo "</div>";
}
?>