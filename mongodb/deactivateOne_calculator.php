<?php
session_start();
// If the user is not logged in redirect to the login page...
if (!isset($_SESSION['loggedin'])) {
  header('Location: login/login.html');
  exit;
}
  require '../vendor/autoload.php';
  require '../../conf/connect.php';
  $client = new MongoDB\Client('mongodb+srv://'.$DBusername . ':' . $DBpassword . '@' . $DBservername . '/?retryWrites=true&w=majority');



$collection = $client->DiagCalc_Calculators->Index;
$id = intval($_POST['calculator_id']);
echo $id;
$cursor = $collection->updateOne(
  array( 'calculator_id' => $id ),
  array( '$set' => array('active' => 'no'))
);


// 

echo json_encode($cursor);
header('Location: ../index.php?calculator='.$calculator_id);

?>

