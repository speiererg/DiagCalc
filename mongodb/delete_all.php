
<?php
  require '../vendor/autoload.php';
  require '../../conf/connect.php';

$collection = $client->DiagCalc_Calculators->Calculators;
$deleteResult = $collection->deleteMany(array());

$collection2 = $client->DiagCalc_Calculators->Index;
$deleteResult = $collection2->deleteMany(array());

echo 'delete all'
?>






