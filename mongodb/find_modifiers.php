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

/*
 $cursor = $collection->find(
 //
 array('parameters.main' => false),
 array(
 'sort' => array('modifier_name' => 1),
 )
 );
 */
$cursor = $collection->find(
    ['parameters.main' => false,'current_version'=>true],
    [ '$sort' => ['modifier_name' => 1] ],
   // ['$project' => ['lastUpdate_timestamp' => 1]]

    //[ '$limit' => 14 ]

  ]
);

echo json_encode(iterator_to_array($cursor));

/*
 echo "<pre>";
 print_r($cursor);
 echo "</pre>";
 */
?>



