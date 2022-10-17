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
      <table class="CSS_contentTable">
        <tr>
          <td>
            <table id="table_input">
             <tr>
                <td><input type="radio" id="radio_input_1" name="radio_input" value="1" class="radio_input"></td>
                <td><input type="radio" id="radio_input_2" name="radio_input" value="2" class="radio_input"></td>
                <td><input type="radio" id="radio_input_3" name="radio_input" value="3" class="radio_input"></td>
              </tr>  
              <tr>
                <td><input type="checkbox" id="checkbox_input_1" checked>Not required</td>
                <td><input type="checkbox" id="checkbox_input_2"checked>Not required</td>
                <td><input type="checkbox" id="checkbox_input_3"checked>Not required</td>
              </tr>  
              <tr>
                <td><input type="text" id="input1_1" value="Linksführende dekompensierte" class="input_modifier"></td>
                <td><input type="text" id="input2_1" value="Herzinsuffizienz" class="input_modifier"></td>
                <td><input type="text" id="input3_1" value="NYHA I " class="input_modifier"></td>
              </tr>
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
          <input type="radio" id="radio_input_0" name="radio_input" value="0" class="radio_input">None is main</br>
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

  <script src="app.js"></script>


</body>
</html>