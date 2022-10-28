<?php
require "../../conf/sessionStartPHPMySQL.php";
require '../../conf/connect.php';

$userChange = $_SESSION['name'];
$ISBett = $conn -> real_escape_string($_POST['EditISBettSelect']);
$FID = $conn -> real_escape_string($_POST['FID']);
if ($_POST['checkboxActive']){$active = 1;}else{$active =0;}

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_POST['button'] == 'Update') {
    $sql = "UPDATE patients SET ISBett = '$ISBett', active = '$active' WHERE FID = '$FID'";
    echo 'You have successfully Change Bett <a href="patient.php">Return to edit</a>';
            $conn->query($sql);

} else if ($_POST['button'] == 'Delete') {
    $tableMedication = 'patientmedication'.$FID;
    $tableData = 'patientdata'.$FID;
    $tablePrescription = 'patientprescription'.$FID;
    $sql = "DROP TABLE $tableMedication";
    $conn->query($sql);
    $sql = "DROP TABLE $tableData";
    $conn->query($sql);
    $sql = "DROP TABLE $tablePrescription";
    $conn->query($sql);
    $sql = "DELETE FROM patients WHERE FID = '$FID'";
    $conn->query($sql);
}



$conn->close();
header('Location: patient.php');?>