
function findOne_Calculator_mongoDB(id,version){
    var xmlhttp = new XMLHttpRequest();
  
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);
           console.log(myObj)
        }
    };
    xmlhttp.open("GET", "mongodb/findone_calculator.php", true);
    xmlhttp.send();
}
