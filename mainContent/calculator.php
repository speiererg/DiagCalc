<?php
session_start();
// If the user is not logged in redirect to the login page...
if (!isset($_SESSION['loggedin'])) {
  header('Location: login/login.html');
  exit;
}
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
              <input type="hidden" name="calculator_id" id="input_hidden_form_deactivate_calculator" value="">
              <input type="submit" name="button2" class="button_download" value="Soft Delete" />
            </form>
          </td>
          <td>
            <input type="button" id="button_edit_calculator" class="button_download" value="Edit">
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr id="tr_maindiagnose">
    <td>
      Main Diagnose: <input type="text" id="input_maindiagnose" name="input_maindiagnose"
        class="input_maindiagnose input_readonly" value="" form="form_saveMongoDB">
      Version: <select id="select_version" name="select_version" class="input_select" form="form_saveMongoDB">
        <option value="1" selected>Version 1</option>
      </select>
      Last Version: <input type="number" id="input_last_version" name="lastVersion" class="input_calculator_id" value=""
        form="form_saveMongoDB" readonly>
      Calculator ID: <input type="number" id="input_calculator_id" name="calculator_id"
        class="input_calculator_id" value="" form="form_saveMongoDB" readonly>
      MedSP_id: <input type="number" id="input_medsp_id" name="medsp_id" class="input_maindiagnose" value=""
        form="form_saveMongoDB" readonly>
    </td>
  </tr>
  <tr>
    <td>
      <table id="table_input">
      <tr id="tr_input_modifier_id">
          <td id="td_input_modifier_id_1" class="td_modifier_id"> 
            <span id="span_modifier_id_1" >Modifier X</span>
          <input type="hidden" name="input_modifier_id_1" id="input_modifier_id_1" value="" form="form_saveMongoDB">
          </td>

        </tr>
        <tr id="tr_input_title">
          <td id="td_input_modifier_title_1"> <input type="text" id="input_modifier_title_1" name="input_modifier_title_1" value="Modifier 1" class="input_title input_readonly"
              form="form_saveMongoDB"></td>
        </tr>
        <tr id="tr_input_separator">
          <td><select id="select_input_1" name="select_input_1" class="input_select input_disabled" disabled
              form="form_saveMongoDB"></select></td>
        </tr>
        <tr id="tr_input_radio">
          <td><input type="radio" id="radio_input_1" name="radio_input" value="1" class="radio_input"
              form="form_saveMongoDB" data-id="1"  >Main</td>
        </tr>
        <tr id="tr_input_checkbox">
          <td><input type="checkbox" name="checkbox_input_1" id="checkbox_input_1" class="input_checkbox"
              form="form_saveMongoDB" value="true">Not required</td>
        </tr>
        <tr id="tr_input_multiple_checkbox">
          <td><input type="checkbox" name="checkbox_multiple_input_1" id="checkbox_multiple_input_1"
              class="input_checkbox" form="form_saveMongoDB" value="true">Multiple</td>
        </tr>
        <tr id="tr_input_1">
          <td>
            <input type="text" id="input1_1" name="input1_1" value="" class="input_modifier input_readonly"
              form="form_saveMongoDB"></br>
            <input type="text" id="inputSNOMED1_1" name="inputSNOMED1_1" value="" class="input_SNOMED input_readonly"
              form="form_saveMongoDB"></br>
            <input type="text" id="inputICD1_1" name="inputICD1_1" value="" class="input_ICD input_readonly"
              form="form_saveMongoDB">
          </td>
        </tr>

      </table>

      <img src="img/add.png" id="img_button_add_row" class="img_button">
      <p>
      <table>
        <tr>

          <td>
            <form name="form" action="download/download_XML.php" method="POST">
              <input type="hidden" name="input_XML" id="input_XML" value="">
              <input type="button" class="button_download" id="button_download_XML"value="Download as XML" />
              <input type="submit" name="button1" class="button_download" id="button_download_XML_submit" value="Download as XML" style="display:none"/>
            </form>
            <p>


            <form name="form" action="download/download_TXT.php" method="POST">
              <input type="hidden" name="input_TXT" id="input_TXT" value="">
              <input type="button" class="button_download" id="button_download_TXT" value="Download as TXT" />
              <input type="submit" name="button2" class="button_download" id="button_download_TXT_submit" value="Download as TXT" style="display:none"/>

            </form>
          </td>
          <td>
            <button class="button_download" id="button_calculate">Calculate</button>
          </td>
          <td>
            <form id="form_saveMongoDB" action="mongodb/add_calculator.php" method="POST">
              <input type="hidden" name="new_calculator" id="input_hidden_new_calculator" value="1">
              <input type="hidden" name="modifier_nbr" id="input_hidden_modifier_nbr" value="">
              <input type="hidden" name="modifierSub_nbr" id="input_hidden_modifierSub_nbr" value="">
              <input type="hidden" name="XML_output" id="input_hidden_XML_output" value="">
              <input type="hidden" name="TXT_output" id="input_hidden_TXT_output" value="">
              <input type="hidden" name="array_output" id="input_hidden_array_output" value="">

              <input type="submit" name="button2" id="button_save_calculator" class="button_download" value="Save new Version" />
            </form>
          </td>
          <td>
          Reviewed by Coding:<input type ="checkbox" name="checkbox_reviewed_coding" id="checkbox_reviewed_coding" form="form_saveMongoDB" class="input_disabled" value="true"></br>
          <input type="text" name="input_reviewed_coding_last" id="input_reviewed_coding_last" class="input_information_italic" form="form_saveMongoDB" readonly></br>
          <input type="text" name="input_reviewed_coding_changed_since" id="input_reviewed_coding_changed_since" class="input_information_red" form="form_saveMongoDB" readonly> 
          <input type="hidden" name="checkbox_reviewed_coding_changed" id="checkbox_reviewed_coding_changed" value=""form="form_saveMongoDB">
</td>
          <td>
          Reviewed by SME:<input type ="checkbox" name="checkbox_reviewed_SME" id="checkbox_reviewed_SME" form="form_saveMongoDB" class="input_disabled" value="true"></br>
          <input type="text" name="input_reviewed_SME_last" id="input_reviewed_SME_last" class="input_information_italic" form="form_saveMongoDB"readonly></br>
          <input type="text" name="input_reviewed_SME_changed_since" id="input_reviewed_SME_changed_since" class="input_information_red" form="form_saveMongoDB"readonly> 
          <input type="hidden" name="checkbox_reviewed_SME_changed" id="checkbox_reviewed_SME_changed" value=""form="form_saveMongoDB">   
        </td>
          <td>
          Ready to import:<input type ="checkbox" name="checkbox_ready_import" id="checkbox_ready_import" form="form_saveMongoDB" class="input_disabled" value="true"></br>
          <input type="text" name="input_ready_import_last" id="input_ready_import_last" class="input_information_italic" form="form_saveMongoDB"readonly></br>
          <input type="text" name="input_ready_import_changed_since" id="input_ready_import_changed_since" class="input_information_red" form="form_saveMongoDB"readonly> 
          <input type="hidden" name="checkbox_ready_import_changed" id="checkbox_ready_import_changed" value=""form="form_saveMongoDB">
          </td>
          <td>
          Imported:<input type ="checkbox" name="checkbox_imported" id="checkbox_imported" form="form_saveMongoDB" class="input_disabled" value="true"></br>
          <input type="text" name="input_imported_last" id="input_imported_last" class="input_information_italic" form="form_saveMongoDB"readonly></br>
          <input type="text" name="input_imported_changed_since" id="input_imported_changed_since" class="input_information_red" form="form_saveMongoDB"readonly> 
          <input type="hidden" name="checkbox_imported_changed" id="checkbox_imported_changed" value=""form="form_saveMongoDB">
          </td>
        </tr>
      </table>
    </td>
    <!--  Right Component -->
    <td>
      </br></br>
      <img src="img/add.png" id="img_button_add_column" class="img_button">
    </td>
  </tr>
  <tr>
    <td>
      <div>
        <table id="table_output_calculator">
          <h3 id="total_count" style="display:none;">Total Count: </h3>
        </table>
      </div>
    </td>
  </tr>
</table>
<p>