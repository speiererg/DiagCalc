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
<ul id="modifier_typ_ul">
</ul>
<table>
        <tr>

          <td>
            <form name="form" action="download/download_modifier_XML.php" method="POST">
              <input type="hidden" name="input_XML" id="input_XML" value="">
              <input type="button" class="button_download" id="button_download_modifier_XML"value="Download as XML" />
              <input type="submit" name="button1" class="button_download" id="button_download_modifier_XML_submit" value="Download Modifier as XML" style="display:none"/>
            </form>
            <p>


            <form name="form" action="download/download_modifier_TXT.php" method="POST">
              <input type="hidden" name="input_TXT" id="input_TXT" value="">
              <input type="button" class="button_download" id="button_download_modifier_TXT" value="Download as TXT" />
              <input type="submit" name="button2" class="button_download" id="button_download_modifier_TXT_submit" value="Download Modifier as TXT" style="display:none"/>
            </form>
          </td>
          <td>
            <form name="form" action="download/download_sub_modifier_XML.php" method="POST">
              <input type="hidden" name="input_XML" id="input_XML" value="">
              <input type="button" class="button_download" id="button_download_sub_modifier_XML"value="Download as XML" />
              <input type="submit" name="button1" class="button_download" id="button_download_sub_modifier_XML_submit" value="Download Sub-Modifier as XML" style="display:none"/>
            </form>
            <p>


            <form name="form" action="download/download_sub_modifier_TXT.php" method="POST">
              <input type="hidden" name="input_TXT" id="input_TXT" value="">
              <input type="button" class="button_download" id="button_download_sub_modifier_TXT" value="Download as TXT" />
              <input type="submit" name="button2" class="button_download" id="button_download__sub_modifier_TXT_submit" value="Download Sub-Modifier as TXT" style="display:none"/>
            </form>
          </td>
        </tr>
      </table>