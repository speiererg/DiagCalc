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

$calculator_id_array = $_POST['calculator_id_array'];
$calculator_id_array = array_map('intval', explode(",", $calculator_id_array));

$collection = $client->DiagCalc_Calculators->Index;

$cursor = $collection->find(
    ['calculator_id' => ['$in' => $calculator_id_array]],
  ['_id'=>0,]
);


echo json_encode(iterator_to_array($cursor));

/*
 echo "<pre>";
 print_r($cursor);
 echo "</pre>";
 */
?>



