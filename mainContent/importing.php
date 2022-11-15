<?php
session_start();
// If the user is not logged in redirect to the login page...
if (!isset($_SESSION['loggedin'])) {
    header('Location: login/login.html');
    exit;
}
?>
<p>
<h1 style="text-align:center;">Importing Tools</h1>
<h2>Ready to Import</h2> 
<p>

<ul id="importing_diagnostic_ul">
</ul>
<p>
     <form name="form" action="download/download_diagCalc_ready_import_XML.php" method="POST">
    <input type="hidden" name="input_hidden_modifier_XML" id="input_hidden_diag_calc_XML" value="input_hidden_diag_calc_XML">
    <input type="button" class="button_download" id="button_download_diagCalc_ready_import_XML"value="Download all DiagCalc ready to import XML" />
              <input type="submit" name="button1" class="button_download" id="button_download__diagCalc_ready_import_XML_submit" style="display:none"/>
            </form>
            <p>