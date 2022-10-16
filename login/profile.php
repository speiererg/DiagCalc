<?php

session_start();
// If the user is not logged in redirect to the login page...
if (!isset($_SESSION['loggedin']) ) {
	header('Location: ../../login/login.html');
	exit;
}
require "../../conf/user.php";



if (mysqli_connect_errno()) {
	exit('Failed to connect to MySQL: ' . mysqli_connect_error());
}
// We don't have the password or email info stored in sessions so instead we can get the results from the database.
$stmt = $conn->prepare('SELECT pass, name, vorname FROM users WHERE id = ?');
// In this case we can use the account ID to get the account info.
$stmt->bind_param('i', $_SESSION['id']);
$stmt->execute();
$stmt->bind_result($pass, $name, $vorname);
$stmt->fetch();
$stmt->close();
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Profile Page</title>
		<link href="loginDesign.css" rel="stylesheet" type="text/css">
	</head>
	<body class="loggedin">
		<nav class="navtop">
			<div>
				<h1>EMRIS</h1>
				<a href="../index.php"><i class="fas fa-user-circle"></i>Cockpit</a>
				<?php 

					if ($stmt2 = $conn->prepare('SELECT ad FROM users WHERE username = ?')) {
						// Bind parameters (s = string, i = int, b = blob, etc), in our case the username is a string so we use "s"
						$stmt2->bind_param('s', $_SESSION['name']);
						$stmt2->execute();
						// Store the result so we can check if the account exists in the database.
						$stmt2->store_result();

						if ($stmt2->num_rows > 0) {

							$stmt2->bind_result($ad);
							$stmt2->fetch();
							if ($ad === 24 || $ad === 12) {   
								echo '<a href="patient.php"><i class="fas fa-user-circle"></i>Patient</a>';
							}
							if ($ad === 24) {   
								echo '<a href="register.php"><i class="fas fa-user-circle"></i>Useradmin</a>';
							}
							
						}
					}
				?>
				<a href="profile.php"><i class="fas fa-user-circle"></i>Profile</a>
				<a href="logout.php"><i class="fas fa-sign-out-alt"></i>Logout</a>
			</div>
		</nav>
		<div class="content">
			<h2>Profile Page</h2>
			<div>
				<p>Your account details are below:</p>
				<table>
					<tr>
						<td>Username:</td>
						<td><?=$_SESSION['name']?></td>
					</tr>
					<tr>
						<td>Name:</td>
						<td><?=$name?></td>
					</tr>
					<tr>
						<td>Vorname:</td>
						<td><?=$vorname?></td>
					</tr>
				</table>
			</div>
		</div>
	</body>
</html>