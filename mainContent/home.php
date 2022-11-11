<?php
session_start();
// If the user is not logged in redirect to the login page...
if (!isset($_SESSION['loggedin'])) {
    header('Location: login/login.html');
    exit;
}
?>
<select id="home_select">
    <option value="all_without_sd" selected>All</option>
    <option value="to_be_reviewed_coding">To be reviewed by coding</option>
    <option value="ready_import">Ready to import</option>
    <option value="imported">Imported</option>
    <option value="all">All with soft deleted</option>

</select><p>
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