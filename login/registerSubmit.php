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

// Now we check if the data was submitted, isset() function will check if the data exists.
if (!isset($_POST['username'], $_POST['pass'], $_POST['name'], $_POST['vorname'])) {
	// Could not get the data that should have been sent.
	exit('Please complete the registration form!');
}
// Make sure the submitted registration values are not empty.
if (empty($_POST['username']) || empty($_POST['pass']) || empty($_POST['name']) || empty($_POST['vorname'])) {
    // One or more values are empty.
	exit('Please complete the registration form');
}

// We need to check if the account with that username exists.
if ($stmt = $conn->prepare('SELECT id, pass FROM users WHERE username = ?')) {
	// Bind parameters (s = string, i = int, b = blob, etc), hash the password using the PHP password_hash function.
	$stmt->bind_param('s', $_POST['username']);
	$stmt->execute();
	$stmt->store_result();
	// Store the result so we can check if the account exists in the database.
	if ($stmt->num_rows > 0) {
		// Username already exists
		echo 'Username exists, please choose another!';
	} else {
    // Username doesnt exists, insert new account
    if ($stmt = $conn->prepare('INSERT INTO users (username, pass, name, vorname, role, ad ) VALUES (?, ?, ?, ?, ?, ?)')) {
        // We do not want to expose passwords in our database, so hash the password and use password_verify when a user logs in.
		$password = password_hash($_POST['pass'], PASSWORD_DEFAULT);
		if (strval($_POST['role']) == "Arzt"){$ad = "12";}
        $stmt->bind_param('ssssss', $_POST['username'], $password, $_POST['name'], $_POST['vorname'], $_POST['role'],$ad);
        $stmt->execute();
        echo 'You have successfully registered, you can now login! <a href="register.php">Return to edit</a>';
} else {
	// Something is wrong with the sql statement, check to make sure accounts table exists with all 3 fields.
	echo 'Could not prepare statement!';
}	}
	$stmt->close();
} else {
	// Something is wrong with the sql statement, check to make sure accounts table exists with all 3 fields.
	echo 'Could not prepare statement!';
}
$conn->close();
?>


