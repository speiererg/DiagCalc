var NumberBett = 8 
selectISBett = document.getElementById("ISBett")
classSelectISBett = document.getElementsByClassName("selectISBett")

var xhttp;
xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        responseArray = this.responseText
        for (i=1;i<=NumberBett;i++)
        {
            if(responseArray.includes(i)) {

            }else{
               let option = document.createElement("option")
               option.value = i
               option.text = `ISBett ${i}`
               selectISBett.appendChild(option)
               for(k=0;k<classSelectISBett.length;k++){
                    let option = document.createElement("option")
                    option.value = i
                    option.text = `ISBett ${i}`
                    classSelectISBett[k].appendChild(option)
               }
            }
        }
    };
}
xhttp.open("POST", "getISBett.php");
xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
xhttp.send(``);
