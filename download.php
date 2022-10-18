<html>
    <body>

    <head>
  <title>Diagnostic Calculator</title>
  <link rel="stylesheet" href="design.css">
  <!-- <script src="https://code.jquery.com/jquery-1.11.0.min.js"></script>-->
  <link rel="icon" type="image/png" href="images/choice.png" />
</head>

<body>

  <div id="header">
  </div>
  <div id="headerbar"></div>

  <div id="navigationbar">
    <ul>
      <li><a id="navPageMain">Main</a></li>
      <li><a id="navPageCalculator">Calculator</a></li>
    </ul>
  </div>

  <div id="headerbar"></div>

<?PHP

//config
$namefile = "test.txt";
$content = "lorem ipsum";

//save file
$file = fopen($namefile, "w") or die("Unable to open file!");
fwrite($file, $_POST['input_XML']);
echo $_POST['input_XML'];
fclose($file);

//header download
header("Content-Disposition: attachment; filename=\"" . $namefile . "\"");
header("Content-Type: application/force-download");
header('Expires: 0');
header('Cache-Control: must-revalidate');
header('Pragma: public');
header("Content-Type: text/plain");

echo $content;?>


</body>
</html>