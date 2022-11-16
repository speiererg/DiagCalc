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
<p>
<select id="import_select">
    <option value="all_without_sd">All</option>
    <option value="to_be_reviewed_coding">To be reviewed by coding</option>
    <option value="to_be_reviewed_SME">To be reviewed by SMEs</option>
    <option value="ready_import" selected>Ready to import</option>
    <option value="imported">Imported</option>
    <option value="all">All with soft deleted</option>
</select>
<ul id="importing_diagnostic_ul">
</ul>
<p>
     <form name="form" action="download/download_diagCalc_ready_import_XML.php" method="POST">
    <input type="hidden" name="input_hidden_diag_calc_XML" id="input_hidden_diag_calc_XML" value="">
    <input type="button" class="button_download" id="button_download_diagCalc_ready_import_XML"value="Download DiagCalc of this list (XML Format)" />
     <input type="submit" name="button1" class="button_download" id="button_download__diagCalc_ready_import_XML_submit" style="display:none"/>
            </form>
            <p>