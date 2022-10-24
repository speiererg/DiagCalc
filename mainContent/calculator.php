
<?php
echo "<input type='hidden' name='input_hidden_POST_id' id='input_hidden_POST_id' value='" . $_POST['calculator_id'] . "' >";
echo "<input type='hidden' name='input_hidden_POST_version' id='input_hidden_POST_version' value='" . $_POST['version'] . "' >";
?>

<!DOCTYPE html>
<table class="CSS_contentTable">
  <tr>
    <td>
      <table>
        <tr>
          <td>
    <form id="form_deactivage_calculator" action="mongodb/deactivateOne_calculator.php" method="POST">
            <input type="hidden" name="calculator_id" id="input_hidden_form_deactivate_calculator" value="" >
            <input type="submit" name="button2"  class="button_download" value="Soft Delete" />
              </form>
</td><td>
            <input type="button"  id="button_edit_calculator"  class="button_download" value="Edit">
</td></tr></table>   
</td>
</tr>
        <tr id="tr_maindiagnose">
          <td>
           Main Diagnose: <input type="text" id="input_maindiagnose" name="input_maindiagnose" class="input_maindiagnose input_readonly" value="" form="form_saveMongoDB"> 
           Version: <select id="select_version" name="select_version" class="input_select" form="form_saveMongoDB"><option value="1" selected>Version 1</option></select>
           Last Version: <input type="number" id="input_last_version" name="lastVersion" class="input_calculator_id" value="" form="form_saveMongoDB" readonly> 
           MedSP Calculator ID: <input type="number" id="input_calculator_id" name="calculator_id" class="input_calculator_id" value="" form="form_saveMongoDB" readonly> 
           EDG_id: <input type="number" id="input_EDG_id" name="EDG_id" class="input_maindiagnose input_readonly" value="" form="form_saveMongoDB" readonly> 
          </td>
        </tr>
        <tr>
          <td>
            <table id="table_input">
            <tr id="tr_input_title">
            <td><span class="input_title">Modifier 1</span></td>
              </tr>              
              <tr id="tr_input_separator">
              <td><select id="select_input_1" name="select_input_1" class="input_select input_readonly" disabled form="form_saveMongoDB"></select></td>
              </tr> 
             <tr id="tr_input_radio">
             <td><input type="radio" id="radio_input_1" name="radio_input" value="1" class="radio_input input_readonly" form="form_saveMongoDB">Main</td>
              </tr>  
              <tr id="tr_input_checkbox">
              <td><input type="checkbox" name="checkbox_input_1" id="checkbox_input_1" class="input_checkbox input_readonly" checked form="form_saveMongoDB" value="true">Not required</td>
              </tr>  
              <tr id="tr_input_multiple_checkbox">
              <td><input type="checkbox" name="checkbox_multiple_input_1" id="checkbox_multiple_input_1" class="input_checkbox input_readonly" form="form_saveMongoDB" value="true">Multiple</td>
              </tr>  
              <tr id="tr_input_1" >
                <td>
                  <input type="text" id="input1_1" name="input1_1" value="" class="input_modifier input_readonly" form="form_saveMongoDB"></br>
                  <input type="text" id="inputSNOMED1_1" name="inputSNOMED1_1" value="" class="input_SNOMED input_readonly" form="form_saveMongoDB"></br>
                  <input type="text" id="inputICD1_1" name="inputICD1_1" value="" class="input_ICD input_readonly" form="form_saveMongoDB">
                </td>
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
              <input type="hidden" name="new_calculator" id="input_hidden_new_calculator" value="1" >
              <input type="hidden" name="modifier_nbr" id="input_hidden_modifier_nbr" value="" >
              <input type="hidden" name="modifierSub_nbr" id="input_hidden_modifierSub_nbr" value="" >
              <input type="hidden" name="XML_output" id="input_hidden_XML_output" value="" >
                <input type="submit" name="button2" id="button_save_calculator"  class="button_download" value="Save in MongoDB" />
              </form>  
            </td>
</tr>
</table>
           </td>
<!--  Right Component -->
           <td>
</br></br>
<input type="radio" id="radio_input_0" name="radio_input" value="0" class="radio_input"  form="form_saveMongoDB">None is main</br>
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

