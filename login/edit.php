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
        if ($ad != "24") {   
            header('Location: ../index.php');
            exit;
        }
    } else {
        header('Location: ../index.php');
        exit;
    }
}

if ($stmt2 = $conn->prepare('SELECT username, name, vorname, role FROM users WHERE id = ?')) {
    // Bind parameters (s = string, i = int, b = blob, etc), in our case the username is a string so we use "s"
    $stmt2->bind_param('s', $_POST['id']);
    $stmt2->execute();
    // Store the result so we can check if the account exists in the database.
    $stmt2->store_result();

    if ($stmt2->num_rows > 0) {
        $stmt2->bind_result($username,$name,$vorname,$role);
        $stmt2->fetch();
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
    <body >
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
			<form action="editSubmit.php" method="post" autocomplete="off">
                <input type="text" name="usernameshow"  value="<?php echo $username?>" disabled required></br>
                <input type="text" name="username"  value="<?php echo $username?>" id="username" style="display:none;" required></br>
				<input type="password" name="pass" placeholder="New Password" id="pass" ></br>
                <input type="text" name="name"  value="<?php echo $name?>" id="name" required></br>
                <input type="text" name="vorname"  value="<?php echo $vorname?>" id="vorname" required></br>
                <select type="text" name="role" placeholder="Rolle" id="role" required>
                        <option value="Pflege" >Pflege</option>
                        <option value="Arzt" >Arzt</option>
                        <option value="Physiotherapie" >Physiotherapie</option>
                        <option value="Techniker">Techniker</option>
                </select>

            </br>
                <input type="submit" value="Edit">
            </form>
            <form action="deleteSubmit.php" method="post" autocomplete="off">
                <input type="text" name="usernameDelete"  value="<?php echo $username?>" id="usernameDelete" style="display:none;" required></br>
                <input type="submit" value="Delete User">
			</form>
        </div>
    
	</body>
</html>
<?php
$conn->close();
?>