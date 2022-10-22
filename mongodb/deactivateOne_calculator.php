<?php
  require '../vendor/autoload.php';

$client = new MongoDB\Client('mongodb+srv://speiererg:guichsp2004Pi@cluster0.lhafb.mongodb.net/?retryWrites=true&w=majority');

$collection = $client->DiagCalc_Calculators->Index;
$id = $_POST['calculator_id'];
echo $id;
$cursor = $collection->updateOne(
  [ 'calculator_id' => $id ],
  [ 'active' => 'no']
);


// 

echo json_encode($cursor);
?>

