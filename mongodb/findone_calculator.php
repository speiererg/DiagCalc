<?php
  require '../vendor/autoload.php';

$client = new MongoDB\Client('mongodb+srv://speiererg:guichsp2004Pi@cluster0.lhafb.mongodb.net/?retryWrites=true&w=majority');
$db = $client->test;


$collection = $client->DiagCalc_Calculators->Calculators;

$item = $collection->findOne(array('id' => '2'));


echo json_encode($item);

echo '<pre>';
print_r($item);
echo '</pre>';


// header('Location: ../index.php');
?>



