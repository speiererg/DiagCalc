<?php
// We need to use sessions, so you should always start sessions using the below code.
session_start();
// If the user is not logged in redirect to the login page...
if (!isset($_SESSION['loggedin'])) {
  header('Location: login/login.html');
  exit;
}
?>

<!DOCTYPE html>
<html id="allHtml">

<head>
  <title>Cockpit EMRIS</title>
  <link rel="stylesheet" href="design.css">
  <!-- <script src="https://code.jquery.com/jquery-1.11.0.min.js"></script>-->
  <link rel="icon" type="image/png" href="images/choice.png" />
</head>

<body>
  <?php
  include "popUp.php";
  ?>

  <div id="header">
    <select id="patientSelect" class="patientSelect"></select>
  </div>
  <div id="headerbar"></div>

  <div id="#summary"></div>

  <div id="navigationbar">
    <ul>
      <li><a id="selectPageKurven">Kurven</a></li>
      <li><a id="selectPageVerordnungen">Verordnungen</a></li>
      <li><a id="selectPageRespiration"><img src="images/respiration.png" class="navigationbarButton"> Respiration</a></li>
      <li><a id="selectPageBilanzierung">Bilanzierung</a></li>
      <li><a id="selectPagePicco">PicCo</a></li>
      <li><a id="selectPagePatientInfos">PatientInfos</a></li>
      <li style="float:right;"><a href="login/profile.php"><input value="<?= $_SESSION['name'] ?>" id="actualUsername" class="inputHide" disabled><img src="images/user.png" class="navigationbarButton"></a></li>
      <li style="float:right;"><a class="REARed" id="REAButton">REA</a></li>
      <li style="float:right;" id="neueVerordnungLi"><a id="selectPageVerordnungen2" style="font-style:italic;">Neue Verordnung</a></li>
      <li style="float:right;"><a><img src="images/stn.png" id="savepage" class="navigationbarButton"></a></li>
    </ul>
  </div>
  <div id="headerbar"></div>

  <div id="maincontent">
    <div id="mainpage">
    </div>
  </div>


  <div id="footer">
    <div id="textActualUser" style="float: right; font-size: 0.8em; margin: 10px;"></div>
    <input value="<?= $_SESSION['role'] ?>" id="actualRole" style="display:none" disabled>

  </div>

  <script src="js/index.js"></script>


</body>


</html>