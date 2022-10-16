<?php
session_start();
// If the user is not logged in redirect to the login page...
if (!isset($_SESSION['loggedin']) ) {
	header('Location: ../../login/login.html');
	exit;
}
require "../../conf/user.php";
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
        if ($ad != "24" && $ad != "12") {   
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
		<title>Patient Administration</title>
		<link rel="stylesheet" href="loginDesign.css">
	</head>
	<body>
    <body class="loggedin">
		<nav class="navtop">
			<div>
				<h1>EMRIS</h1>
                <a href="../index.php"><i class="fas fa-user-circle"></i>Cockpit</a>
                <a href="patient.php"><i class="fas fa-user-circle"></i>Patient</a>
				<a href="register.php"><i class="fas fa-user-circle"></i>ADM</a>
				<a href="profile.php"><i class="fas fa-user-circle"></i>Profile</a>
				<a href="logout.php"><i class="fas fa-sign-out-alt"></i>Logout</a>
			</div>
		</nav>
		<div class="content">
            <h1>New Patient</h1>
            <div>
                <form action="addPatient.php" method="post" autocomplete="off">
                    <input type="text" name="namePatient" placeholder="Name" required></br>
                    <input type="text" name="vornamePatient" placeholder="Vorname"  required></br>
                    <input type="date" name="geburtsdatumPatient"  required></br>
                    <select type="text" name="ISBett"  id="ISBett" required>
                    </select>
                    </br>
                    <input type="submit" value="New Patient">
                </form>
            </div>
        </div>
        <div class="content">
            <h1>Actual User</h1>
            <div>
                <ul>
                <?php

                    if ($conn->connect_error) {
                            die("Connection failed: " . $conn->connect_error);
                    } 

                    $sql= "SELECT FID, name, vorname, geburtsdatum, ISBett, active FROM patients ORDER BY ISBett";
                    $result = $conn->query($sql);
                    if ($result->num_rows > 0) {
                            if ($result->num_rows > 0) {
                                while($row = $result->fetch_assoc()) {
                                    if($row["active"]=="1"){$checked = 'checked';}else {$checked ="";}
                                echo '<li><form action="editPatient.php" method="post"><select class="selectISBett" name="EditISBettSelect"><option value="'.$row['ISBett'].'" selected>ISBett '.$row['ISBett'].'</option></select> FID: ' . $row['FID'] . ' ; '. $row['name'] . ' ' . $row['vorname'] . ' ' . $row['geburtsdatum'] . ',    Active: <input type="checkbox" name="checkboxActive" value="active"'.$checked.'> <input type="hidden" name="FID" value="'. $row['FID'] .'">   <input type="submit" name="button" value="Update" class="buttonClass"/><input type="submit" name="button" value="Delete" class="buttonClass"/></form> </li>' ;
                            }
                            } 
                        }                   
                    $conn->close();
                ?>
				</ul>
            </div>                
		</div>
    </body>
<script src="patient.js"></script>
</html>
