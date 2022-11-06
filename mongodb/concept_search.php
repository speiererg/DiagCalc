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

$sPOSTConcept = $_POST['concept'];

$cursor = $collection->findOne(
  array($all , $sPOSTConcept ),
  array(  )
);

//*
 echo "<pre>";
 print_r($cursor);
 echo "</pre>";
 //*/

//echo json_encode(iterator_to_array($cursor));

?>



