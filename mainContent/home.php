<?php
session_start();
// If the user is not logged in redirect to the login page...
if (!isset($_SESSION['loggedin'])) {
    header('Location: login/login.html');
    exit;
}
?>
<p>
<h1 style="text-align:center;">Index</h1>
<table id ="home_table">
<tr id="home_tr">
<td class="home_td" id="home_td1">
    <ul>
    </ul>
<td class="home_td"id="home_td2">
    <ul>
    </ul>
<td class="home_td"id="home_td3">
    <ul>
    </ul>
<td class="home_td"id="home_td4">
<ul>
    </ul>

</td>
</tr>
</table>