<?php
  require '../vendor/autoload.php';

$client = new MongoDB\Client('mongodb+srv://speiererg:guichsp2004Pi@cluster0.lhafb.mongodb.net/?retryWrites=true&w=majority');
$db = $client->test;


$collection = $client->DiagCalc_Calculators->Calculators;
$id = $_POST['id'];
$version = $_POST['version'];
$cursor = $collection->findOne(array('calculator_id' => "{$id}", 'version' => "{$version}"));

// 

echo json_encode($cursor);
?>



