
<?php
  require '../vendor/autoload.php';

$client = new MongoDB\Client('mongodb+srv://speiererg:guichsp2004Pi@cluster0.lhafb.mongodb.net/?retryWrites=true&w=majority');

$collection = $client->DiagCalc_Calculators->Calculators;
// $id = $_POST['id'];
// $version = $_POST['version'];

$cursor = $collection->find(
    array(),
    array(
        'projection' => array('id'=> 1, '_id'=>0)
        'sort' => array('calculator_id' => -1),
        'limit' => 1
        )
);
/*
$cursor->sort(
    ['id' => -1],
['limit' => 1]);
*/
//$cursor = $collection->findOne(array('calculator_id' => "{$id}", 'version' => "{$version}"));


//$params = array('active' => 'yes');
//$cursor = $collection->find($params);
 
echo json_encode(iterator_to_array($cursor));
?>






