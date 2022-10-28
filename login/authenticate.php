<?php
session_start();
require '../../conf/connect.php';
echo 'mongodb+srv://'.$DBusername . ':' . $DBpassword . '@' . $DBservername . '/?retryWrites=true&w=majority';

$client = new MongoDB\Client('mongodb+srv://'.$DBusername . ':' . $DBpassword . '@' . $DBservername . '/?retryWrites=true&w=majority');



if ( !isset($_POST['username'], $_POST['password']) ) {
	// Could not get the data that should have been sent.
	exit('Please fill both the username and password fields!');
}


$collection_userGet = $client->DiagCalc_Config->Users;

$userName = $_POST['username'];

$cursor_userGet = $collection_lastId->findOne(
    array('username' => $userName),
    array(
        'projection' => array('password' => 1, 'function' => 1, 'id' => 1),
        'limit' => 1
        )
);

   $password = $cursor_userGet->password;
   $role = $cursor_userGet->role;
   $id = $cursor_userGet->id;

   echo $password;
   echo $role;


    if ($password) {

        // Account exists, now we verify the password.
        // Note: remember to use password_hash in your registration file to store the hashed passwords.
        
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


?>