<?php
session_start();
// If the user is not logged in redirect to the login page...
if (!isset($_SESSION['loggedin'])) {
    header('Location: login/login.html');
    exit;
}
?>
<p>
<h1 style="text-align:center;">Mapping managment</h1>
<input type="text" id="input_concept_search">
<p>
<button class="button_download" id ="button_concept_search">Search</button>
