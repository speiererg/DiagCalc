<?php
  require '../vendor/autoload.php';

$client = new MongoDB\Client('mongodb+srv://speiererg:guichsp2004Pi@cluster0.lhafb.mongodb.net/?retryWrites=true&w=majority');
$db = $client->test;


$collection = $client->DiagCalc_Calculators->Index;

//POST
$item = $_POST['item'];
$value = $_POST['value'];


$response = $collection->find(array("{$item}" : "{$value}"));

$test = json_encode($response);
echo $test;

// header('Location: ../index.php');
?>



