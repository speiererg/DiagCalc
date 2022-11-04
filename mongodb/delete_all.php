
<?php
session_start();
// If the user is not logged in redirect to the login page...
if (!isset($_SESSION['loggedin'])) {
  header('Location: login/login.html');
  exit;
}
require '../vendor/autoload.php';
require '../../conf/connect.php';
$client = new MongoDB\Client('mongodb+srv://' . $DBusername . ':' . $DBpassword . '@' . $DBservername . '/?retryWrites=true&w=majority');


$collection = $client->DiagCalc_Calculators->Calculators;
$deleteResult = $collection->deleteMany(array());

$collection2 = $client->DiagCalc_Calculators->Index;
$deleteResult = $collection2->deleteMany(array());

$collection2 = $client->DiagCalc_Calculators->Modifiers;
$deleteResult = $collection2->deleteMany(array());

echo 'delete all'
  ?>






