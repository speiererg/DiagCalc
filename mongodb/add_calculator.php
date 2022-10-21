<?php
  require '../vendor/autoload.php';

$inputs_output = array();

echo  $_POST['modifierSub_nbr'];

for ($i = 1; $i <= $_POST['modifier_nbr']; $i++) {
   for ($k = 1; $k <= $_POST['modifierSub_nbr']; $k++) {
      $input_ID = "input{$i}_{$k}";
      $inputs_output = array_merge($inputs_output, array("input{$i}_{$k}" => $_POST[$input_ID]));
   }
}

  $client = new MongoDB\Client('mongodb+srv://speiererg:guichsp2004Pi@cluster0.lhafb.mongodb.net/?retryWrites=true&w=majority');
$db = $client->test;


$collection = $client->DiagCalc_Calculators->Calculators;

$insertOneResult = $collection->insertOne([
 
   'calculator_id' => $_POST['calculator_id'],
   'mainName' => $_POST['input_maindiagnose'],
   'version' => $_POST['select_version'],
   'modifier_nbr' => $_POST['modifier_nbr'],
   'modifierSub_nbr' => $_POST['modifierSub_nbr'],
   'EDG_id' => $_POST['EDG_id'],
   'inputs' => $inputs_output
   
]);

 //header('Location: ../index.php');
?>
