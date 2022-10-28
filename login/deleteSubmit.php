<?php
session_start();
// If the user is not logged in redirect to the login page...
if (!isset($_SESSION['loggedin']) ) {
	header('Location: ../../login/login.html');
	exit;
}

require '../../conf/connect.php';
$client = new MongoDB\Client('mongodb+srv://'.$DBusername . ':' . $DBpassword . '@' . $DBservername . '/?retryWrites=true&w=majority');


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

// We need to check if the account with that username exists.
if ($stmt2 = $conn->prepare('DELETE FROM users WHERE username = ?')) {
	// Bind parameters (s = string, i = int, b = blob, etc), hash the password using the PHP password_hash function.
	$stmt2->bind_param('s', $_POST['usernameDelete']);
    $stmt2->execute();
    $stmt2->store_result();
    echo 'You have successfully deleted ' . $_POST['usernameDelete'] . ', you can now login! <a href="register.php">Return to edit</a>';

}
$conn->close();
?>


