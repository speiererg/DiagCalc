<?php
require '../vendor/autoload.php';
require '../../conf/connect.php';

$collection = $client->DiagCalc_Calculators->Index;


$cursor = $collection->find(
    array('active' => 'yes'),
    array(
        'sort' => array('mainName' => 1 ),
        )
);

echo json_encode(iterator_to_array($cursor));

/*
echo "<pre>";
print_r($cursor);
echo "</pre>";
*/
?>



