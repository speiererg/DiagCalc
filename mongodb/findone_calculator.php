<?php
  require '../vendor/autoload.php';

$client = new MongoDB\Client('mongodb+srv://speiererg:guichsp2004Pi@cluster0.lhafb.mongodb.net/?retryWrites=true&w=majority');
$db = $client->test;


$collection = $client->DiagCalc_Calculators->Calculators;
$id = $_POST['id'];
$item = $collection->findOne(array('id' => "{$id}"));

$test = json_encode($item);
echo $test;

// header('Location: ../index.php');
?>



