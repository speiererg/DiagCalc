document.getElementById('input_hidden_modifier_nbr').value = modifier_nbr
document.getElementById('input_hidden_modifierSub_nbr').value = modifierSub_nbr


function loading_page_calculator() {
    document_addeventlistener_calculator()
    console.log('test')
    console.log(id_POST, version_POST)
    findOne_Calculator_mongoDB(id_POST, version_POST)
}


function document_addeventlistener_calculator() {
    console.log('guisdf')
    document.getElementById('button_calculate').addEventListener('click', click_calculate)
    document.getElementById('img_button_add_row').addEventListener('click', addInputRow)
    document.getElementById('img_button_add_column').addEventListener('click', addInputColumn)

    for (let i = 0; i <= modifier_nbr; i++) {
        document.getElementById(`radio_input_${i}`).addEventListener('click', function () { click_radio_input(i) })
    }
}


//MondoDB

function findOne_Calculator_mongoDB(id, version) {
    console.log('test')
    var xmlhttp = new XMLHttpRequest();
    let params = `id=${id}&version=${version}`
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);
            console.log(myObj)
            console.log(myObj['inputs'])
        }
    };
    xmlhttp.open("POST", "mongodb/findOne_calculator.php", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
}



loading_page_calculator()