<?php
  require '../vendor/autoload.php';
  require '../../conf/connect.php';
  $client = new MongoDB\Client('mongodb+srv://'.$DBusername . ':' . $DBpassword . '@' . $DBservername . '/?retryWrites=true&w=majority');


$collection = $client->DiagCalc_Calculators->Calculators;
$id = intval($_POST['id']);
$version = intval($_POST['version']);
$cursor = $collection->findOne(array('calculator_id' => $id, 'version' => $version));

// 

echo json_encode($cursor);
?>



