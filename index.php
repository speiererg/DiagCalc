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
  <td><input type="text" id="input1_1" value="Linksführende dekompensierte" class="input_modifier"></td>
  <td><input type="text" id="input2_1" value="Herzinsuffizienz"></td>
  <td><input type="text" id="input3_1" value="NYHA I "></td>
<tr>
  <td><input type="text" id="input1_2" value="Rechtsführende dekompensierte"></td>
  <td><input type="text" id="input2_2" value=""></td>
  <td><input type="text" id="input3_2" value="NYHA II"></td>
</tr>
<tr>
  <td><input type="text" id="input1_3" value="Biventrikuläre dekompensierte"></td>
  <td><input type="text" id="input2_3" value=""></td>
  <td><input type="text" id="input3_3" value="NYHA III"></td>
</tr>
<tr>
<td><input type="text" id="input1_4" value=""></td>
  <td><input type="text" id="input2_4" value=""></td>
  <td><input type="text" id="input3_4" value="NYHA IV"></td>
</tr>
</table>
<p>
  <button class="btn btn-1 hover-filled-slide-right" id="button_calculate"><span>Calculate</span></button>
<p>
  <input type="text" id="diag_result" readonly>


    </div>
  </div>


  <div id="footer">
  </div>

  <script src="js/index.js"></script>


</body>
</html>