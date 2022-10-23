
<?php
  require '../vendor/autoload.php';

$client = new MongoDB\Client('mongodb+srv://speiererg:guichsp2004Pi@cluster0.lhafb.mongodb.net/?retryWrites=true&w=majority');

$collection = $client->DiagCalc_Calculators->Calculators;
$deleteResult = $collection->deleteMany(array());

$collection2 = $client->DiagCalc_Calculators->Index;
$deleteResult = $collection2->deleteMany(array());

?>






