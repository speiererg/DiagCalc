
<?php
  require '../vendor/autoload.php';
  require '../../conf/connect.php';
  $client = new MongoDB\Client('mongodb+srv://'.$DBusername . ':' . $DBpassword . '@' . $DBservername . '/?retryWrites=true&w=majority');


$collection = $client->DiagCalc_Calculators->Calculators;
$deleteResult = $collection->deleteMany(array());

$collection2 = $client->DiagCalc_Calculators->Index;
$deleteResult = $collection2->deleteMany(array());

echo 'delete all'
?>






