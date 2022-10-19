<?php
  require '../vendor/autoload.php';

$client = new MongoDB\Client('mongodb+srv://speiererg:guichsp2004Pi@cluster0.lhafb.mongodb.net/?retryWrites=true&w=majority');
$db = $client->test;


$collection = $client->DiagCalc_Calculators->Index;

//POST
$item = $_POST['item'];
$value = $_POST['value'];

$params = array('active' => 'yes');

$cursor = $collection->find($params);
foreach ($cursor as $doc) {
    var_dump($doc);
}
/*
$cursor = $collection->find(
    [
        'active' => 'yes',
    ],
    [
        'limit' => 5,
    ]
);
*/

//$response = $collection->find("{$item}" : "{$value}");
/*
$test = json_encode($cursor);
echo "<pre>";
print_r($cursor);
echo "</pre>";
*/

// header('Location: ../index.php');
?>



