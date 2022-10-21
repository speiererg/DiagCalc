
<?php
echo "<input type='hidden' name='input_hidden_POST_id' id='input_hidden_POST_id' value='" . $_POST['id'] . "' >";
echo "<input type='hidden' name='input_hidden_POST_version' id='input_hidden_POST_version' value='" . $_POST['version'] . "' >";
?>


<table class="CSS_contentTable">
        <tr id="tr_maindiagnose">
          <td>
           Main Diagnose: <input type="text" id="input_maindiagnose" name="input_maindiagnose" class="input_maindiagnose" value="" form="form_saveMongoDB"> 
           Version: <select id="select_version" name="select_version" class="input_select" form="form_saveMongoDB"></select>
           Calculator_id: <input type="number" id="input_calculator_id" name="calculator_id" class="input_maindiagnose" value="" form="form_saveMongoDB"> 
           EDG_id: <input type="number" id="input_EDG_id" name="EDG_id" class="input_maindiagnose" value="" form="form_saveMongoDB" readonly> 
        
          </td>
        </tr>
        <tr>
          <td>
            <table id="table_input">
            <tr id="tr_input_title">
            <td><span class="input_title">Modifier 1</span></td>
              </tr>              
              <tr id="tr_input_separator">
              <td><select id="select_input_1" name="select_input_1" class="input_select" disabled form="form_saveMongoDB"></select></td>
              </tr> 
             <tr id="tr_input_radio">
             <td><input type="radio" id="radio_input_1" name="radio_input" value="1" class="radio_input" form="form_saveMongoDB">Main</td>
              </tr>  
              <tr id="tr_input_checkbox">
              <td><input type="checkbox" id="checkbox_input_1" class="input_checkbox" checked form="form_saveMongoDB">Not required</td>
              </tr>  
              <tr id="tr_input_multiple_checkbox">
              <td><input type="checkbox" id="checkbox_multiple_input_1" class="input_checkbox" form="form_saveMongoDB">Multiple</td>
              </tr>  
              <tr id="tr_input_1">
                <td><input type="text" id="input1_1" name="input1_1" value="" class="input_modifier" form="form_saveMongoDB"></td>
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
              <input type="hidden" name="XML_output" id="input_hidden_XML_output" value="" >

                <input type="submit" name="button2"  class="button_download" value="Save in MongoDB" />
              </form>  
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

