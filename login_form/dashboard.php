<?php
session_start();
if (!isset($_SESSION['userName'])) {
  header('Location: login.php'); // Redirect if the user is not logged in
  exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Add meta tags, title, and styles -->
</head>
<body>

  <main id="main" class="main">

    <!-- Welcome Message Section -->
    <div id="welcome-message" class="alert alert-success" role="alert">
      Welcome, <?php echo $_SESSION['userName']; ?>! You have successfully signed in.
    </div>

    <div class="pagetitle">
      <h1>Dashboard</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="dashboard.php">Home</a></li>
          <li class="breadcrumb-item active">Dashboard</li>
        </ol>
      </nav>
    </div><!-- End Page Title -->

    <section class="section dashboard">
      <!-- Existing dashboard content -->
    </section>

  </main>

</body>
</html>
