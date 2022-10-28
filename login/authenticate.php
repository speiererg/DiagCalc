<?php
session_start();
include "../../conf/user.php";

if ( mysqli_connect_errno() ) {
	// If there is an error with the connection, stop the script and display the error.
	exit('Failed to connect to MySQL: ' . mysqli_connect_error());
}

if ( !isset($_POST['username'], $_POST['password']) ) {
	// Could not get the data that should have been sent.
	exit('Please fill both the username and password fields!');
}

if ($stmt = $conn->prepare('SELECT id, pass, role FROM users WHERE username = ?')) {

	// Bind parameters (s = string, i = int, b = blob, etc), in our case the username is a string so we use "s"
    $stmt->bind_param('s', $_POST['username']);
	$stmt->execute();
	// Store the result so we can check if the account exists in the database.
	$stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $pass ,$role);
        $stmt->fetch();
        
        // Account exists, now we verify the password.
        // Note: remember to use password_hash in your registration file to store the hashed passwords.
        
        //$_POST['password'] ==="$pass"
        //password_verify($_POST['password'], $pass)
        if (password_verify($_POST['password'], $pass)) {   
        // if (password_verify($_POST['password'], $pass)) {

            // Verification success! User has loggedin!
            // Create sessions so we know the user is logged in, they basically act like cookies but remember the data on the server.
            session_regenerate_id();
            $_SESSION['loggedin'] = TRUE;
            $_SESSION['name'] = $_POST['username'];
            $_SESSION['id'] = $id;
            $_SESSION['role']=$role;
            header('Location: ../index.php');
                } else {
            echo 'Incorrect password! <a href="login.html"> Return to Login</a>';
        }
    } else {
        echo 'Incorrect username! <a href="login.html"> Return to Login</a>';
    }

	$stmt->close();
}
?>