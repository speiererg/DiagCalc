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
    DiagCalc by MedSP
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
        <tr id="tr_maindiagnose">
          Main Diagnose: <input type="text" id="input_maindiagnose" class="input_maindiagnose"> 
          Version: <select id="select_version" class="input_select"><option value="0" selected>Ver. 1</option></select>
        </tr>
        <tr>
          <td>
            <table id="table_input">
            <tr id="tr_input_title">
                <td><span class="input_title">Modifier 1</span></td>
                <td><span class="input_title">Modifier 2</span></td>
                <td><span class="input_title">Modifier 3</span></td>
              </tr>              
              <tr id="tr_input_separator">
                <td><select id="select_input_1" class="input_select" disabled></select></td>
                <td><select id="select_input_2" class="input_select"><?php include 'include/select_input.php' ?></select></td>
                <td><select id="select_input_3" class="input_select"><?php include 'include/select_input.php' ?></select></td>
              </tr> 
             <tr id="tr_input_radio">
                <td><input type="radio" id="radio_input_1" name="radio_input" value="1" class="radio_input">Main</td>
                <td><input type="radio" id="radio_input_2" name="radio_input" value="2" class="radio_input">Main</td>
                <td><input type="radio" id="radio_input_3" name="radio_input" value="3" class="radio_input">Main</td>
              </tr>  
              <tr id="tr_input_checkbox">
                <td><input type="checkbox" id="checkbox_input_1" class="input_checkbox" checked>Not required</td>
                <td><input type="checkbox" id="checkbox_input_2" class="input_checkbox"checked>Not required</td>
                <td><input type="checkbox" id="checkbox_input_3"class="input_checkbox"checked>Not required</td>
              </tr>  
              <tr id="tr_input_multiple_checkbox">
                <td><input type="checkbox" id="checkbox_multiple_input_1" class="input_checkbox">Multiple</td>
                <td><input type="checkbox" id="checkbox_multiple_input_2"class="input_checkbox">Multiple</td>
                <td><input type="checkbox" id="checkbox__multiple_input_3" class="input_checkbox">Multiple</td>
              </tr>  
              <tr id="tr_input_1">
                <td><input type="text" id="input1_1" value="Linksführende dekompensierte" class="input_modifier"></td>
                <td><input type="text" id="input2_1" value="Herzinsuffizienz" class="input_modifier"></td>
                <td><input type="text" id="input3_1" value="NYHA I " class="input_modifier"></td>
              </tr>
              <tr id="tr_input_2">
                <td><input type="text" id="input1_2" value="Rechtsführende dekompensierte" class="input_modifier"></td>
                <td><input type="text" id="input2_2" value="" class="input_modifier"></td>
                <td><input type="text" id="input3_2" value="NYHA II" class="input_modifier"></td>
              </tr>
              <tr id="tr_input_3">
              
                <td><input type="text" id="input1_3" value="Biventrikuläre dekompensierte" class="input_modifier"></td>
                <td><input type="text" id="input2_3" value="" class="input_modifier"></td>
                <td><input type="text" id="input3_3" value="NYHA III" class="input_modifier"></td>
              </tr>
              <tr id="tr_input_4">
             
                <td><input type="text" id="input1_4" value="" class="input_modifier"></td>
                <td><input type="text" id="input2_4" value="" class="input_modifier"></td>
                <td><input type="text" id="input3_4" value="NYHA IV" class="input_modifier"></td>
              </tr>
            </table>

            <img src="img/add.png" id="img_button_add_row" width="30" height="30">
            <p>
              <table>
                <tr>
                  <td>
            <button class="btn btn-1 hover-filled-slide-right" id="button_calculate"><span>Calculate</span></button>
</td><td>
<form name="form" action="download/download_XML.php" method="POST">
                <input type="hidden" name="input_XML" id="input_XML" value="" >
                <input type="submit" name="button1"  class="button_download" value="Download as XML" />
              </form>
             <p>
            
              <form name="form" action="download/download_txt.php" method="POST">
                <input type="hidden" name="input_XML" id="input_TXT" value="" >
                <input type="submit" name="button2"  class="button_download" value="Download as TXT" />
              </form>
              </td>
</tr>
</table>
           </td>
<!--  Right Component -->
           <td>
</br></br></br>
<input type="radio" id="radio_input_0" name="radio_input" value="0" class="radio_input">None is main</br>
</br></br>
              <img src="img/add.png" id="img_button_add_column" width="30" height="30">
          </td>
        </tr>
        <tr>
          <td>
          

          </td>
        </tr>
        <tr>
          <td>
            <div >
              <table id="table_output_calculator">
              </table>
            </div>
          </td>
        </tr>
      </table>
      <p>

    </div>
  </div>


  <div id="footer">
  </div>

  <script src="app.js"></script>


</body>
</html>