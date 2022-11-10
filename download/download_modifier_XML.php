<?PHP

//config
$namefile = "EPIC_import_Modifier_Category_List.xml";
$content = $_POST['input_hidden_modifier_XML'];

//save file
$file = fopen($namefile, "w") or die("Unable to open file!");
fwrite($file, $content);
fclose($file);

//header download
header("Content-Disposition: attachment; filename=\"" . $namefile . "\"");
header("Content-Type: application/force-download");
header('Expires: 0');
header('Cache-Control: must-revalidate');
header('Pragma: public');
header("Content-Type: text/plain");

echo $content;?>