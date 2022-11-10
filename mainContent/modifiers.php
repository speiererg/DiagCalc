<?php
session_start();
// If the user is not logged in redirect to the login page...
if (!isset($_SESSION['loggedin'])) {
    header('Location: login/login.html');
    exit;
}
?>
<p>
<h1 style="text-align:center;">Modifier Managment</h1>
<h2>Modifier list</h2> 
<p>
<ul id="modifier_typ_ul">
</ul>
