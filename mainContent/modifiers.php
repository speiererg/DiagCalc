<?php
session_start();
// If the user is not logged in redirect to the login page...
if (!isset($_SESSION['loggedin'])) {
    header('Location: login/login.html');
    exit;
}
?>
<p>
<h1 style="text-align:center;">Modifier Managment</h1>
<h2>Modifier list</h2> 
<p>
<ul >
</ul>
<div class="container_flex_modifier" id="modifier_typ_ul">
</div>
<p>
<table>
        <tr>

          <td>
            <form name="form" action="download/download_modifier_XML.php" method="POST">
              <input type="hidden" name="input_hidden_modifier_XML" id="input_hidden_modifier_XML" value="">
              <input type="button" class="button_download" id="button_download_modifier_XML"value="Download Modifier as XML" />
              <input type="submit" name="button1" class="button_download" id="button_download_modifier_XML_submit" style="display:none"/>
            </form>
            <p>


            <form name="form" action="download/download_modifier_TXT.php" method="POST">
              <input type="hidden" name="input_hidden_modifier_TXT" id="input_hidden_modifier_TXT" value="">
              <input type="button" class="button_download" id="button_download_modifier_TXT" value="Download Modifier as TXT" />
              <input type="submit" name="button2" class="button_download" id="button_download_modifier_TXT_submit" style="display:none"/>
            </form>
          </td>
          <td>
            <form name="form" action="download/download_sub_modifier_XML.php" method="POST">
              <input type="hidden" name="input_hidden_sub_modifier_XML" id="input_hidden_sub_modifier_XML" value="">
              <input type="button" class="button_download" id="button_download_sub_modifier_XML"value="Download Sub-Modifier as XML" />
              <input type="submit" name="button1" class="button_download" id="button_download_sub_modifier_XML_submit" style="display:none"/>
            </form>
            <p>


            <form name="form" action="download/download_sub_modifier_TXT.php" method="POST">
              <input type="hidden" name="input_hidden_sub_modifier_TXT" id="input_hidden_sub_modifier_TXT" value="">
              <input type="button" class="button_download" id="button_download_sub_modifier_TXT" value="Download Sub-Modifier as TXT" />
              <input type="submit" name="button2" class="button_download" id="button_download__sub_modifier_TXT_submit" style="display:none"/>
            </form>
          </td>
        </tr>
      </table>