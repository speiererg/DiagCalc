<?php
// Start the session
session_start();
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
    <div>DiagCalc by <img src="img/logo.png" width="100px" style="vertical-align:middle"/></div>
  </div>
  <div id="headerbar"></div>

  <div id="navigationbar">
    <ul>
      <li><a id="navPageHome">Main - Index</a></li>
      <li><a id="navPageCalculator">New Calculator</a></li>
      <li><a id="navPageTest">TestMongoDB</a></li>
      <li><a id="navPageDelete">Delete all</a></li>

    </ul>
  </div>

  <div id="headerbar"></div>

  
  <div id="maincontent">
    <div id="mainpage">
    </div>
  </div>

  <div id="footer">
  </div>




  <script src="app.js"></script>

</body>
</html>