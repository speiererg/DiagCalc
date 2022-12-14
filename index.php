<?php
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
  <title>Diagnostic Calculator</title>
  <link rel="stylesheet" href="design.css">
  <link rel="stylesheet" href="jQuery/jquery-ui.css">
  <link rel="icon" type="image/png" href="img/logo.png" />

  <script language="JavaScript" type="text/javascript" src="jQuery/jQuery3.js"></script>
  <script language="JavaScript" type="text/javascript" src="jQuery/jQuery-ui.js"></script>

</head>

<body>

  <div id="header">
    <div>DiagCalc by <img src="img/logo.png" width="100px" style="vertical-align:middle" /></div>
  </div>

  <nav class="navtop">
    <div>
      <a id="navPageHome">Main Index</a>
      <a id="navPageCalculator">New Calculator</a>
      <a id="navPageMappingUpdate">Mapping Update</a>
      <a id="navPageModifierManagment">Modifiers Managment</a>
      <a id="navPageImportingTools">Importing Tools</a>
      <a id="navPageTest"style="display:none">TestMongoDB</a>
      <a id="navPageDelete" style="display:none">Delete all</a>
      <a href="https://browser.ihtsdotools.org/?perspective=full&conceptId1=404684003&edition=MAIN/SNOMEDCT-CH/2022-06-07&release=&languages=de" target="_blank"
        rel="noopener noreferrer">SNOMED Browser</a>
      <a href="https://icd.who.int/browse10/2019/en#/" target="_blank" rel="noopener noreferrer">ICD-10 Browser</a>
      <a href="login/logout.php"><i class="fas fa-sign-out-alt"></i>Logout</a>
    </div>
  </nav>





  <div id="maincontent">

    <div id="mainpage">
    </div>
  </div>

  <div id="footer">
  Welcome <?php echo $_SESSION['username'] .', '. date("Y/m/d") ?>

  </div>
  <script src="js/importing.js"></script>

  <script src="js/modifiers.js"></script>
  <script src="js/mapping.js"></script>
  <script src="js/params.js"></script>
  <script src="js/calculator.js"></script>
  <script src="js/download.js"></script>
  <script src="js/var.js"></script>
  <script src="js/app.js"></script>

</body>

</html>