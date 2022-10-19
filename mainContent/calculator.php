<table class="CSS_contentTable">
        <tr id="tr_maindiagnose">
          <td>
           Main Diagnose: <input type="text" id="input_maindiagnose" name="input_maindiagnose" class="input_maindiagnose" value="Herzinsuffizienz" form="form_saveMongoDB"> 
           Version: <select id="select_version" name="select_version" class="input_select" form="form_saveMongoDB"><option value="1" selected>Version. 1</option></select>
          </td>
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
                <td><select id="select_input_1" name="select_input_1" class="input_select" disabled form="form_saveMongoDB"></select></td>
                <td><select id="select_input_2" class="input_select" form="form_saveMongoDB"><?php include 'include/select_input.php' ?></select></td>
                <td><select id="select_input_3" class="input_select" form="form_saveMongoDB"><?php include 'include/select_input.php' ?></select></td>
              </tr> 
             <tr id="tr_input_radio">
                <td><input type="radio" id="radio_input_1" name="radio_input" value="1" class="radio_input" form="form_saveMongoDB">Main</td>
                <td><input type="radio" id="radio_input_2" name="radio_input" value="2" class="radio_input"form="form_saveMongoDB">Main</td>
                <td><input type="radio" id="radio_input_3" name="radio_input" value="3" class="radio_input" form="form_saveMongoDB">Main</td>
              </tr>  
              <tr id="tr_input_checkbox">
                <td><input type="checkbox" id="checkbox_input_1" class="input_checkbox" checked form="form_saveMongoDB">Not required</td>
                <td><input type="checkbox" id="checkbox_input_2" class="input_checkbox"checked form="form_saveMongoDB">Not required</td>
                <td><input type="checkbox" id="checkbox_input_3"class="input_checkbox"checked form="form_saveMongoDB">Not required</td>
              </tr>  
              <tr id="tr_input_multiple_checkbox">
                <td><input type="checkbox" id="checkbox_multiple_input_1" class="input_checkbox" form="form_saveMongoDB">Multiple</td>
                <td><input type="checkbox" id="checkbox_multiple_input_2"class="input_checkbox" form="form_saveMongoDB">Multiple</td>
                <td><input type="checkbox" id="checkbox__multiple_input_3" class="input_checkbox" form="form_saveMongoDB">Multiple</td>
              </tr>  
              <tr id="tr_input_1">
                <td><input type="text" id="input1_1" name="input1_1" value="Linksführende dekompensierte" class="input_modifier" form="form_saveMongoDB"></td>
                <td><input type="text" id="input2_1" name="input2_1" value="Herzinsuffizienz" class="input_modifier" form="form_saveMongoDB"></td>
                <td><input type="text" id="input3_1" name="input3_1" value="NYHA I " class="input_modifier" form="form_saveMongoDB"></td>
              </tr>
              <tr id="tr_input_2">
                <td><input type="text" id="input1_2" name="input1_2" value="Rechtsführende dekompensierte" class="input_modifier" form="form_saveMongoDB"></td>
                <td><input type="text" id="input2_2" name="input2_2" value="" class="input_modifier" form="form_saveMongoDB"></td>
                <td><input type="text" id="input3_2" name="input3_2" value="NYHA II" class="input_modifier" form="form_saveMongoDB"></td>
              </tr>
              <tr id="tr_input_3">
              
                <td><input type="text" id="input1_3" name="input1_3" value="Biventrikuläre dekompensierte" class="input_modifier" form="form_saveMongoDB"></td>
                <td><input type="text" id="input2_3" name="input2_3" value="" class="input_modifier" form="form_saveMongoDB"></td>
                <td><input type="text" id="input3_3" name="input3_3" value="NYHA III" class="input_modifier" form="form_saveMongoDB"></td>
              </tr>
              <tr id="tr_input_4">
             
                <td><input type="text" id="input1_4" name="input1_4" value="" class="input_modifier" form="form_saveMongoDB"></td>
                <td><input type="text" id="input2_4" name="input2_4" value="" class="input_modifier" form="form_saveMongoDB"></td>
                <td><input type="text" id="input3_4" name="input3_4" value="NYHA IV" class="input_modifier" form="form_saveMongoDB"></td>
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
              <td>
              <form id="form_saveMongoDB" action="mongodb/add_calculator.php" method="POST">
              <input type="hidden" name="modifier_nbr" id="input_hidden_modifier_nbr" value="" >
              <input type="hidden" name="modifierSub_nbr" id="input_hidden_modifierSub_nbr" value="" >
                <input type="submit" name="button2"  class="button_download" value="Save in MongoDB" />
              </form>  
            </td>
            <td>
              <form id="form_loadCalculator" action="mongodb/findone_calculator.php" method="POST">
                <input type="submit" name="button2"  class="button_download" value="FindOne in MongoDB" />
              </form>  
            </td>
            <td>
                <input type="submit" id="button_findOne_calculator" value="FindOne in MongoDB" />
            </td>
</tr>
</table>
           </td>
<!--  Right Component -->
           <td>
</br></br>
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

      <script src="app.js"></script>
