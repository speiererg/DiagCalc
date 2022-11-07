<?php
session_start();
// If the user is not logged in redirect to the login page...
/*if (!isset($_SESSION['loggedin'])) {
  header('Location: login/login.html');
  exit;
}*/
require '../vendor/autoload.php';
require '../../conf/connect.php';
$client = new MongoDB\Client('mongodb+srv://' . $DBusername . ':' . $DBpassword . '@' . $DBservername . '/?retryWrites=true&w=majority');



$array_output = json_decode($_POST['array_output']);

$mainName = ucfirst($_POST['input_maindiagnose']);

date_default_timezone_set("Europe/Paris");
$time = date("d.m.Y h:i:sa");
$calculator_id = $_POST['calculator_id'];

// Search for last Calculator Id 
$collection_lastId = $client->DiagCalc_Calculators->Calculators;

$cursor_lastId = $collection_lastId->findOne(
   array(),
   array(
      'projection' => array('calculator_id' => 1),
      'sort' => array('calculator_id' => -1),
      'limit' => 1
   )
);

if ($cursor_lastId->calculator_id)
{
   $lastFoundId = $cursor_lastId->calculator_id;
}else{
   $lastFoundId = 0;

}


// Search for last Modifier Id 
$collection_lastModifierId = $client->DiagCalc_Calculators->Modifiers;
$cursor_lastModifierId = $collection_lastModifierId->findOne(
   array(),
   array(
      'projection' => array('modifier_id' => 1),
      'sort' => array('modifier_id' => -1),
      'limit' => 1
   )
);

if ($cursor_lastModifierId->modifier_id)
{
   $lastModifierId = intval($cursor_lastModifierId->modifier_id);
}else{
   $lastModifierId = 0;
}

echo 'Last found id' . $lastFoundId . '</br>';
echo 'Last Modifier id'. $lastModifierId . '</br>';


if ($_POST['calculator_id'] == null) {
   echo 'egal null';
   $lastId = $lastFoundId + 1;

   $str_length = 5;
   $EDGId = substr("00000{$lastId}", -$str_length);
   $EDGId = '8' . $EDGId . '00000';

   $collection2 = $client->DiagCalc_Calculators->Index;

   $insertOneResult2 = $collection2->insertOne(
      [
         'calculator_id' => intval($lastId),
         'mainName' => $mainName,
         'lastVersion' => intval($_POST['select_version']),
         'EDG_id' => intval($EDGId),
         'last_modification_Time' => $time,
         'last_modification_timestamp' => time(),
         'active' => 'yes'

      ]
   );

} else {
   $lastId = $_POST['calculator_id'];
   $EDGId = $_POST['EDG_id'];
   $collection2 = $client->DiagCalc_Calculators->Index;

   $insertOneResult2 = $collection2->updateOne(
      array('calculator_id' => intval($lastId)),
      array(
         '$set' => array(
            'mainName' => $mainName,
            'lastVersion' => intval($_POST['select_version']),
            'EDG_id' => intval($EDGId),
            'last_modification_Time' => $time,
            'last_modification_timestamp' => time()
         )
      )

   );

   $collection3 = $client->DiagCalc_Calculators->Calculators;

   $insertOneResult3 = $collection3->updateMany(
      array('calculator_id' => intval($lastId)),
      array(
         '$set' => array(
            'mainName' => $mainName,
            'lastVersion' => intval($_POST['select_version'])
         )
      )

   );
}
;

//calculate the modifier Array
$inputs_array = array();
$SNOMED_array = array();
$ICD_array = array();
$modifiers_array = array();
$parameters_output_forMongo = array();

for ($i = 1; $i <= $_POST['modifier_nbr']; $i++) {
   $checkbox_multiple_ID = "checkbox_multiple_input_{$i}";
   $inputs_array = [];
   $SNOMED_array = [];
   $ICD_array = [];
   for ($k = 1; $k <= $_POST['modifierSub_nbr']; $k++) {
      $input_ID = "input{$i}_{$k}";
      $inputSNOMED_ID = "inputSNOMED{$i}_{$k}";
      $inputICD_ID = "inputICD{$i}_{$k}";
      if ($_POST[$input_ID] == "") {
         $output_input = null;
      } else {
         $output_input = $_POST[$input_ID];
      }
      if ($_POST[$inputSNOMED_ID] == "") {
         $output_SNOMED = null;
      } else {
         $output_SNOMED = $_POST[$inputSNOMED_ID];
      }
      if ($_POST[$inputICD_ID] == "") {
         $output_ICD = null;
      } else {
         $output_ICD = $_POST[$inputICD_ID];
      }

      $inputs_array = array_merge($inputs_array, array($output_input));
      $SNOMED_array = array_merge($SNOMED_array, array($output_SNOMED));
      $ICD_array = array_merge($ICD_array, array($output_ICD));
   }


   // Parameters 

   $select_ID = "select_input_{$i}";
   $radio_ID = "radio_input";
   $checkbox_ID = "checkbox_input_{$i}";
   $checkbox_multiple_ID = "checkbox_multiple_input_{$i}";

   if ($_POST[$radio_ID] == $i) {
      $radio_on = true;
   } else {
      $radio_on = false;
   }

   $parameters_output = array(
      'main' => $radio_on,
      'separator' => $_POST[$select_ID],
      'not_required' => $_POST[$checkbox_ID],
      'multiple' => $_POST[$checkbox_multiple_ID]
   );


   $parameters_output_forMongo = array_merge(
      $parameters_output_forMongo,
      array(
         $select_ID => $_POST[$select_ID],
         $radio_ID => $_POST[$radio_ID],
         $checkbox_ID => $_POST[$checkbox_ID],
         $checkbox_multiple_ID => $_POST[$checkbox_multiple_ID]
      )
   );

   $modifier_id_name = "input_modifier_id_{$i}";
   $modifier_mainName = "input_modifier_title_{$i}";

   if($_POST[$modifier_id_name]==null){
      $lastModifierId = $lastModifierId + 1; $modifier_id = $lastModifierId;
   }else{
      $modifier_id = $_POST[$modifier_id_name];
   }
   $modifiers_array[] = array('calcualtor_id' => intval($lastId), 'lastUpdate_timestamp' => time(), 'modifier_id' => $modifier_id , 'modifier_name' => $_POST[$modifier_mainName], 'modifier_nbr' => intval($_POST['modifier_nbr']), 'modifierSub_nbr' => intval($_POST['modifierSub_nbr']), 'modifier_array' => $inputs_array, 'SNOMED_array' => $SNOMED_array, 'ICD_array' => $ICD_array, 'parameters' => $parameters_output);
}

//Inserting the Calculators in Calculators
$collection = $client->DiagCalc_Calculators->Calculators;
$insertOneResult = $collection->insertOne(
   [
      'calculator_id' => intval($lastId),
      'mainName' => $mainName,
      'version' => intval($_POST['select_version']),
      'lastVersion' => intval($_POST['select_version']),
      'modifier_nbr' => intval($_POST['modifier_nbr']),
      'modifierSub_nbr' => intval($_POST['modifierSub_nbr']),
      'EDG_id' => intval($EDGId),
      'created_Time' => $time,
      'created_timestamp' => time(),
      'modifiers' => $modifiers_array,
      'output_array' => $array_output,
      'parameters' => $parameters_output_forMongo,
      'XML_output' => $_POST['XML_output'],
      'updateMapping' => false
   ]
);

$collectionModifier = $client->DiagCalc_Calculators->Modifiers;
$insertOneResult = $collectionModifier->insertMany(
   $modifiers_array
);

print_r($array_output); //first

//header('Location: ../index.php?calculator=' . $calculator_id . '&version=' . $_POST['select_version']);
?>
