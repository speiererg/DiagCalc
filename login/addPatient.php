<?php
require "../../conf/sessionStartPHPMySQL.php";
require "../../conf/user.php";
require "../phpmysql/array.php";

$userChange =  $_SESSION['name'];
$name = $conn -> real_escape_string($_POST['namePatient']);
$vorname = $conn -> real_escape_string($_POST['vornamePatient']);
$geburtsdatum = $conn -> real_escape_string($_POST['geburtsdatumPatient']);
$ISBett = $conn -> real_escape_string($_POST['ISBett']);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sqlFID= "SELECT MAX(FID) AS 'maxFID' FROM patients $";
$result = $conn->query($sqlFID);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $maxFID = $row['maxFID'] + 1;
    }
} else {
    $maxFID = 1;
}

$sql = "INSERT INTO patients 
(name, vorname, geburtsdatum, ISBett, FID, active)
VALUES 
('$name' , '$vorname', '$geburtsdatum', '$ISBett', '$maxFID', '1')";
echo 'You have successfully Create Patient'. $name.' '.$vorname.' mit FID '.$maxFID.'<a href="patient.php">Return to edit</a>';
        $conn->query($sql);

$tableMedication = 'patientmedication'.$maxFID;
$tableData = 'patientdata'.$maxFID;
$tablePrescription = 'patientprescription'.$maxFID;

$sql2="CREATE TABLE $tableMedication LIKE patientmedication0";
$conn->query($sql2);
$sql3="CREATE TABLE $tableData LIKE patientdata0";
$conn->query($sql3);
$sql4="CREATE TABLE $tablePrescription LIKE patientprescription0";
$conn->query($sql4);

//Add line Prescription for Notification
$setArray = "";
$setArray0 = "";
$lenghtgetParametersPrescription = count($getParametersPrescription);
for ($i = 0; $i < $lenghtgetParametersPrescription ; $i++) {
    $setArray .= " ".$getParametersPrescription[$i];
    $setArray0 .= "'0'";
        if($i<$lenghtgetParametersPrescription-1){
            $setArray .= ",";
            $setArray0 .= ",";
        }
    }
$sql = "INSERT INTO $tablePrescription 
(notification, medicament, $setArray)
VALUES
('1', '0', $setArray0)";
$conn->query($sql);

$conn->close();
header('Location: patient.php');?>