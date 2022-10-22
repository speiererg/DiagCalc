
<?php
  require '../vendor/autoload.php';

$client = new MongoDB\Client('mongodb+srv://speiererg:guichsp2004Pi@cluster0.lhafb.mongodb.net/?retryWrites=true&w=majority');

$collection = $client->DiagCalc_Calculators->Index;
// $id = $_POST['id'];
// $version = $_POST['version'];

$cursor = $collection->find(
    array('active' => "yes")
);
/*
$cursor->sort(
    ['id' => -1],
['limit' => 1]);
*/
//$cursor = $collection->findOne(array('calculator_id' => "{$id}", 'version' => "{$version}"));


//$params = array('active' => 'yes');
//$cursor = $collection->find($params);
 
print_r($cursor);
echo json_encode($cursor);
?>






