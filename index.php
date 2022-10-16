<!DOCTYPE html>
<html id="allHtml">

<head>
  <title>Diagnostic Calculator</title>
  <link rel="stylesheet" href="design.css">
  <!-- <script src="https://code.jquery.com/jquery-1.11.0.min.js"></script>-->
  <link rel="icon" type="image/png" href="images/choice.png" />
</head>

<body>

  <div id="header">
  </div>
  <div id="headerbar"></div>

  <div id="navigationbar">
    <ul>
      <li><a id="navPageMain">Main</a></li>
      <li><a id="navPageCalculator">Calculator</a></li>
    </ul>
  </div>

  <div id="headerbar"></div>

  <div id="maincontent">
    <div id="mainpage">
<table>
  <tr>
  <td><input type="text" id="input1a" value="Linksführende dekompensierte" class="input_modifier"></td>
  <td><input type="text" id="input1b" value="Rechtsführende dekompensierte"></td>
  <td><input type="text" id="input1c" value="Biventrikuläre dekompensierte"></td>
  <td><input type="text" id="input1d" value=""></td>

</tr>
<tr>
  <td><input type="text" id="input2a" value="Herzinsuffizienz"></td>
  <td><input type="text" id="input2b" value=""></td>
  <td><input type="text" id="input2c" value=""></td>
  <td><input type="text" id="input2d" value=""></td>
</tr>
<tr>
  <td><input type="text" id="input3a" value="NYHA I "></td>
  <td><input type="text" id="input3b" value="NYHA II"></td>
  <td><input type="text" id="input3c" value="NYHA III"></td>
  <td><input type="text" id="input3d" value="NYHA IV"></td>
</tr>
</table>
<p>
  <button class="btn btn-1 hover-filled-slide-down" id="button_calculate">
    <span>Calculate</span>
  </button>

    </div>
  </div>


  <div id="footer">
  </div>

  <script src="js/index.js"></script>


</body>
</html>