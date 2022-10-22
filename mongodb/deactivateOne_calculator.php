<?php
  require '../vendor/autoload.php';

$client = new MongoDB\Client('mongodb+srv://speiererg:guichsp2004Pi@cluster0.lhafb.mongodb.net/?retryWrites=true&w=majority');

$collection = $client->DiagCalc_Calculators->Index;
$id = $_POST['id'];
$cursor = $collection->updateOne(array('active' => "no"));

// 

echo json_encode($cursor);
?>

