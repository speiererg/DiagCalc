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


$collection = $client->DiagCalc_Calculators->Index;

if ($_POST['request'] == "all_without_sd"){
$cursor = $collection->find(
  array('active' => 'yes'),
  array(
    'sort' => array('mainName' => 1),
  )
);
}else if ($_POST['request'] == "all"){
  $cursor = $collection->find(
    array(),
    array(
      'sort' => array('mainName' => 1),
    )
  );
}else if ($_POST['request'] == "ready_import"){
  $cursor = $collection->find(
    ['ready_import.checked' => "true"],
    ['sort' => array('mainName' => 1)]
  );
}else if ($_POST['request'] == "imported"){
  $cursor = $collection->find(
    ['imported.checked' => "true"],
    ['sort' => array('mainName' => 1)]
  );
}else if ($_POST['request'] == "to_be_reviewed_coding"){
  $cursor = $collection->find(
    ['review_coding.checked' => "false"],
    ['sort' => array('mainName' => 1)]
  );
}

echo json_encode(iterator_to_array($cursor));

/*
 echo "<pre>";
 print_r($cursor);
 echo "</pre>";
 */
?>



