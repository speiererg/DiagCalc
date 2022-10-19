<?php
  require '../vendor/autoload.php';
$client = new MongoDB\Client('mongodb+srv://speiererg:guichsp2004Pi@cluster0.lhafb.mongodb.net/?retryWrites=true&w=majority');
$db = $client->test;


$collection = $client->DiagCalc_Calculators->Calculators;

$insertOneResult = $collection->insertOne([
   'parameters' => 
   ['id' => '1',
      'mainName' => 'Herzinsuffizienz',
   'Version' => '1'],
   
   'inputs' =>
   ['inputsa1' => 'test',
   'inputsa2' => 'test2']
   
]);


printf("Inserted %d document(s)\n", $insertOneResult->getInsertedCount());

?>
