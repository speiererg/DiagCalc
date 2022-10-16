<?php
require "../../conf/sessionStartPHPMySQL.php";
require "../../conf/user.php";


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 


$sql= "SELECT * FROM patients WHERE active = '1' ORDER BY ISBett";
$result = $conn->query($sql);
$number = mysqli_num_rows($result);

$lenghtGetParameters = 1;
$y = 0;
echo "[";
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $y ++;

            echo $row['ISBett'];
            if ($y < $number){
                echo ",";
            }
        }    
        echo"]";  


} else {
    echo "none";
} 



$conn->close();
?>