<?php
  require '../vendor/autoload.php';
  $client = new MongoDB\Client('mongodb+srv://speiererg:guichsp2004Pi@cluster0.lhafb.mongodb.net/?retryWrites=true&w=majority');


$inputs_output = array();

for ($i = 1; $i <= $_POST['modifier_nbr']; $i++) {
   for ($k = 1; $k <= $_POST['modifierSub_nbr']; $k++) {
      $input_ID = "input{$i}_{$k}";
      $inputs_output = array_merge($inputs_output, array("input{$i}_{$k}" => $_POST[$input_ID]));
   }
}


$parameters_output = array();

for ($i = 1; $i <= $_POST['modifier_nbr']; $i++) {
      $select_ID = "select_input_{$i}";
      $radio_ID = "radio_input";
      $checkbox_ID = "checkbox_input_{$i}";
      $checkbox_multiple_ID = "checkbox_multiple_input_{$i}";

      $parameters_output = array_merge($parameters_output, array(
         $select_ID => $_POST[$select_ID],
         $radio_ID => $_POST[$radio_ID],
         $checkbox_ID => $_POST[$checkbox_ID],
         $checkbox_multiple_ID => $_POST[$checkbox_multiple_ID]));
}


date_default_timezone_set("Europe/Paris");
$time = date("d.m.Y h:i:sa");
$calculator_id = $_POST['calculator_id'];


$collection_lastId = $client->DiagCalc_Calculators->Calculators;
// $id = $_POST['id'];
// $version = $_POST['version'];

$cursor_lastId = $collection_lastId->findOne(
    array(),
    array(
        'projection' => array('calculator_id' => 1),
        'sort' => array('calculator_id' => 1),
        'limit' => 1
        )
);
echo $_POST['calculator_id'];
if ($_POST['calculator_id'] == null){
   echo 'egal null';
   $lastId = $cursor_lastId->calculator_id;
   $lastId = $lastId + 1;

   $collection2 = $client->DiagCalc_Calculators->Index;

$insertOneResult2 = $collection2->insertOne([
 
   'calculator_id' => intval($lastId),
   'mainName' => $_POST['input_maindiagnose'],
   'lastVersion' => intval($_POST['select_version']),
   'EDG_id' => $_POST['EDG_id'],
   'last_modification_Time' => $time,
   'last_modification_timestamp' => time(),
   'active' => 'yes'
   
]);

}else{
   $lastId = $_POST['calculator_id'];
echo $lastId;
   $collection2 = $client->DiagCalc_Calculators->Index;

   $insertOneResult2 = $collection2->updateOne(
      array('calculator_id' => intval($lastId)),
      array('$set'=> array(
         'lastVersion' => intval($_POST['select_version']),
         'EDG_id' => $_POST['EDG_id'],
         'last_modification_Time' => $time,
         'last_modification_timestamp' => time()
          )
      )
      
   );
};

echo 'lastId :'.$lastId;
$collection = $client->DiagCalc_Calculators->Calculators;

$insertOneResult = $collection->insertOne([
 
   'calculator_id' => intval($lastId),
   'mainName' => $_POST['input_maindiagnose'],
   'version' => intval($_POST['select_version']),
   'modifier_nbr' => intval($_POST['modifier_nbr']),
   'modifierSub_nbr' => intval($_POST['modifierSub_nbr']),
   'EDG_id' => $_POST['EDG_id'],
   'created_Time' => $time,
   'created_timestamp' => time(),
   'inputs' => $inputs_output,
   'parameters' => $parameters_output,
   'XML_output' => $_POST['XML_output'],
   
]);



 //header('Location: ../index.php?calculator='.$calculator_id);
?>
