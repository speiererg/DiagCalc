<?php
 // require '../vendor/autoload.php';
$client = new MongoDB\Client('mongodb+srv://speiererg:guichsp2004Pi@cluster0.lhafb.mongodb.net/?retryWrites=true&w=majority');

$collection = $client->DiagCalc_Calculators->Index;

//POST
$item = $_POST['item'];
$value = $_POST['value'];

$params = array('active' => 'yes');

$cursor = $collection->find($params);

echo json_encode(iterator_to_array($cursor));

/*
echo "<pre>";
print_r($cursor);
echo "</pre>";
*/
?>



