
<?php
  require '../vendor/autoload.php';
  require '../../conf/connect.php';

$collection = $client->DiagCalc_Calculators->Calculators;
// $id = $_POST['id'];
// $version = $_POST['version'];

$cursor = $collection->findOne(
    array(),
    array(
        'projection' => array('calculator_id' => 1),
        'sort' => array('calculator_id' => 1),
        'limit' => 1
        )
);
$test = $cursor->calculator_id;


//$cursor = $collection->findOne(array('calculator_id' => "{$id}", 'version' => "{$version}"));


//$params = array('active' => 'yes');
//$cursor = $collection->find($params);
 
//echo print_r($cursor);
//echo iterator_to_array($cursor);
print_r($cursor);

$test = $cursor->calculator_id;
for ($i = 1; $i <= $test; $i++) {

echo $cursor->calculator_id;}
//echo json_encode(iterator_to_array($cursor));
?>






