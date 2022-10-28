<?php
session_start();
// If the user is not logged in redirect to the login page...
if (!isset($_SESSION['loggedin']) ) {
	header('Location: ../../login/login.html');
	exit;
}
require '../../conf/connect.php';
if ($stmt = $conn->prepare('SELECT ad FROM users WHERE username = ?')) {
	// Bind parameters (s = string, i = int, b = blob, etc), in our case the username is a string so we use "s"
    $stmt->bind_param('s', $_SESSION['name']);
	$stmt->execute();
	// Store the result so we can check if the account exists in the database.
	$stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($ad);
        $stmt->fetch();
        
        // Account exists, now we verify the password.
        // Note: remember to use password_hash in your registration file to store the hashed passwords.
        if ($ad != "24") {   
            header('Location: ../index.php');
            exit;
        }
    } else {
        header('Location: ../index.php');
        exit;
    }
}

?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Register</title>
		<link rel="stylesheet" href="loginDesign.css">
	</head>
	<body>
    <body class="loggedin">
		<nav class="navtop">
			<div>
				<h1>EMRIS</h1>
				<a href="../index.php"><i class="fas fa-user-circle"></i>Cockpit</a>
				<a href="register.php"><i class="fas fa-user-circle"></i>Register</a>
				<a href="profile.php"><i class="fas fa-user-circle"></i>Profile</a>
				<a href="logout.php"><i class="fas fa-sign-out-alt"></i>Logout</a>
			</div>
		</nav>
		<div class="content">
            <h1>Register</h1>
            <div>
                <form action="registerSubmit.php" method="post" autocomplete="off">
                    <input type="text" name="username" placeholder="Username" id="username" required></br>
                    <input type="password" name="pass" placeholder="Password" id="pass" required></br>
                    <input type="text" name="name" placeholder="Name" id="name" required></br>
                    <input type="text" name="vorname" placeholder="Vorname" id="vorname" required></br>
                    <select type="text" name="role" placeholder="Rolle" id="role" style="width:160px;" required>
                        <option value="Pflege" >Pflege</option>
                        <option value="Arzt" >Arzt</option>
                        <option value="Physiotherapie" >Physiotherapie</option>
                        <option value="Techniker">Techniker</option>
                    </select>
                    </br>
                    <input type="submit" value="Register">
                </form>
            </div>
        </div>
        <div class="content">
            <h1>Edit User</h1>
            <div>
                <ul>
                <?php

                    $sql= "SELECT id, username, name, vorname, role FROM users";
                    $result = $conn->query($sql);
                    if ($result->num_rows > 0) {
                            if ($result->num_rows > 0) {
                                while($row = $result->fetch_assoc()) {
                                echo '<li><form action="edit.php" method="post">' . $row['username'] . ': ' . $row['name'] . ' ' . $row['vorname'] . ' ' . $row['role'] . '    <input type="hidden" name="id" value="'. $row['id'] .'"><input type="submit" name="button" value="edit" class="buttonClass"/></form> </li>' ;
                                }
                            } 
                        }                   
                    $conn->close();
                ?>
				</ul>
            </div>                
		</div>
	</body>
</html>
