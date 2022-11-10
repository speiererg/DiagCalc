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
$id = intval($_POST['id']);
$version = intval($_POST['version']);
$cursor = $collection->findOne(
  array('calculator_id' => $id, 'version' => $version),
['medsp_term'=>0]
);

// 

echo json_encode($cursor);
?>



