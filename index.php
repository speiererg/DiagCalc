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
      <li><a id="navPageMain">Mainse</a></li>
      <li><a id="navPageCalculator">Calculator</a></li>
    </ul>
  </div>

  <div id="headerbar"></div>

  <div id="maincontent">
    <div id="mainpage">
      <table class="CSS_contentTable">
        <tr>
          <td>
            <table id="table_input" >
              <tr>
                <td><input type="text" id="input1_1" value="Linksführende dekompensierte" class="input_modifier"></td>
                <td><input type="text" id="input2_1" value="Herzinsuffizienz" class="input_modifier"></td>
                <td><input type="text" id="input3_1" value="NYHA I " class="input_modifier"></td>
              <tr>
                <td><input type="text" id="input1_2" value="Rechtsführende dekompensierte" class="input_modifier"></td>
                <td><input type="text" id="input2_2" value="" class="input_modifier"></td>
                <td><input type="text" id="input3_2" value="NYHA II" class="input_modifier"></td>
              </tr>
              <tr>
                <td><input type="text" id="input1_3" value="Biventrikuläre dekompensierte" class="input_modifier"></td>
                <td><input type="text" id="input2_3" value="" class="input_modifier"></td>
                <td><input type="text" id="input3_3" value="NYHA III" class="input_modifier"></td>
              </tr>
              <tr>
                <td><input type="text" id="input1_4" value="" class="input_modifier"></td>
                <td><input type="text" id="input2_4" value="" class="input_modifier"></td>
                <td><input type="text" id="input3_4" value="NYHA IV" class="input_modifier"></td>
              </tr>
            </table>

            <img src="img/plus.png" id="img_button_add_row" width="50" height="50">
            <p>
            <button class="btn btn-1 hover-filled-slide-right" id="button_calculate"><span>Calculate</span></button>
            <p>
            <input type="text" id="diag_result" readonly>
          </td>
          <td>
          <img src="img/plus.png" id="img_button_add_column" width="50" height="50">

          </td>
        <tr>
          <td>
            <div >
              <table id="table_output_calculator">
              </table>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>


  <div id="footer">
  </div>

  <script src="index.js"></script>


</body>
</html>