<?php
  require '../vendor/autoload.php';

$inputs_output = array();

echo  $_POST['modifier_nbr'];

for ($i = 1; $i <= $_POST['modifier_nbr']; $i++) {
   for ($k = 1; $k <= $_POST['modifierSub_nbr']; $k++) {
      $input_ID = "input{$i}_{$k}";
      $array_push = "'input{$i}_{$k}' => '" . $_POST[$input_ID];
      $inputs_output = array($inputs_output, $arraypush) ;
   }
}
echo $inputs_output;

  $client = new MongoDB\Client('mongodb+srv://speiererg:guichsp2004Pi@cluster0.lhafb.mongodb.net/?retryWrites=true&w=majority');
$db = $client->test;


$collection = $client->DiagCalc_Calculators->Calculators;

$insertOneResult = $collection->insertOne([
   'parameters' => 
   ['id' => '1',
      'mainName' => 'Herzinsuffizienz',
   'Version' => '1'],
   
   'inputs' => [$inputs_output]
   
]);


printf("Inserted %d document(s)\n", $insertOneResult->getInsertedCount());

// header('Location: ../index.php');
?>
