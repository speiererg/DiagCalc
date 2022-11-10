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


$collection = $client->DiagCalc_Calculators->Modifiers;


$cursor = $collection->find(
  //'parameters.main' => 'false'
  array(),
  array(
    'sort' => array('modifier_name' => 1),
  )
);

echo json_encode(iterator_to_array($cursor));

/*
 echo "<pre>";
 print_r($cursor);
 echo "</pre>";
 */
?>



