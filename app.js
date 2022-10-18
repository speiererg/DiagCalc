var modifier_nbr = 3
var modifierSub_nbr = 4
var array_inputs_value = [];
var array_inputs_itemNbr = [];
var array_calculator = [];
var array_hiden_ID = "";

// Loading 
function loadingIndex() {
    document_addeventlistener()
}

function document_addeventlistener() {
    document.getElementById('button_calculate').addEventListener('click', click_calculate)
    document.getElementById('img_button_add_row').addEventListener('click', addInputRow)
    document.getElementById('img_button_add_column').addEventListener('click', addInputColumn)


    for (let i = 0; i <= modifier_nbr; i++) {
        document.getElementById(`radio_input_${i}`).addEventListener('click', function () { click_radio_input(i) })
    }
}

function click_radio_input(radio_input_id) {
    console.log(radio_input_id)
    if (array_hiden_ID != "") {
        document.getElementById(`checkbox_input_${array_hiden_ID}`).disabled = false
        document.getElementById(`checkbox_input_${array_hiden_ID}`).checked = true
        for (let i = 2; i <= modifierSub_nbr; i++) { document.getElementById(`input${array_hiden_ID}_${i}`).style.display = "block" }
    }
    if (radio_input_id != "0") {
        for (let i = 2; i <= modifierSub_nbr; i++) {
            document.getElementById(`input${radio_input_id}_${i}`).style.display = "none";
            document.getElementById(`input${radio_input_id}_${i}`).value = ""
            document.getElementById(`checkbox_input_${radio_input_id}`).disabled = true
            document.getElementById(`checkbox_input_${radio_input_id}`).checked = false
            array_hiden_ID = radio_input_id
        }
    }
}

function click_calculate() {
    array_inputs_value = [];
    array_inputs_itemNbr = [];
    array_calculator = [];
    for (let i = 1; i <= modifier_nbr; i++) {
        let array_inputs_oneModifier = [];
        let item_nbr = 0
        let modifierSub_iterate = 1
        console.log(`checkbox_input_${i}`)
        if (document.getElementById(`checkbox_input_${i}`).checked == true && document.getElementById(`radio_input_${i}`).checked == false) {
            modifierSub_iterate = 0
        }
        for (let k = modifierSub_iterate; k <= modifierSub_nbr; k++) {
            if (k == 0) {
                item_nbr++
                array_inputs_oneModifier.push('')
            } else {
                let input_value = document.getElementById(`input${i}_${k}`).value
                if (input_value != '') {
                    item_nbr++
                    array_inputs_oneModifier.push(input_value)

                }

            }
        }
        array_inputs_itemNbr.push(item_nbr)
        array_inputs_value.push(array_inputs_oneModifier);
    }

    // Creation du array_Calculator
    array_calculator.unshift(1)
    for (let i = modifier_nbr; i > 1; i--) {
        array_calculator.unshift(array_calculator[0] * array_inputs_itemNbr[i - 1])
    }
    create_calculator_output();
}


function create_calculator_output() {
    document.getElementById('table_output_calculator').innerHTML = "";

    var array_iterate = []
    var itteration_id = modifier_nbr - 1
    for (let i = 0; i < modifier_nbr; i++) { array_iterate.push('0') }
    console.log(array_iterate)
    console.log(array_inputs_itemNbr)
    console.log(array_inputs_value)
    //
    let kg=0;
    while (array_iterate[0] < array_inputs_itemNbr[0]) {
        let calculated_diag = ""
        for (let i = 0; i < modifier_nbr; i++) {
            calculated_diag.concat(array_inputs_value[i][array_iterate[i]])
        }
        console.log(calculated_diag)


        if (array_iterate[itteration_id] < (array_inputs_itemNbr[itteration_id] - 1)) {
            array_iterate[itteration_id]++
        } else {
            for (let test_id = 0, id_increment = 1; test_id == 0; id_increment++) {
                array_iterate[modifier_nbr-id_increment] = 0
                if (array_iterate[itteration_id - id_increment] < (array_inputs_itemNbr[itteration_id - id_increment] - 1)) {
                    array_iterate[itteration_id - id_increment]++
                    test_id = 1
                }
            console.log(test)
            }
        }
        console.log(array_iterate)
        /*let row_output_calculator = document.createElement('tr')
        let row_output_calculator_Column = document.createElement('td')
        row_output_calculator_Column.appendChild(document.createTextNode(calculated_diag));
        row_output_calculator.appendChild(row_output_calculator_Column)
        document.getElementById('table_output_calculator').appendChild(row_output_calculator);
        */
    }
}

function addInputRow() {
    let row_input = document.createElement('tr')
    row_input.setAttribute('id', `tr_input_${modifierSub_nbr + 1}`)
    for (let i = 0; i < modifier_nbr; i++) {
        let column_input = document.createElement('td')
        let input_input = document.createElement('input')
        input_input.setAttribute('id', `input${i + 1}_${modifierSub_nbr + 1}`);
        input_input.setAttribute('class', `input_modifier`);
        if (document.getElementById(`radio_input_${i + 1}`).checked == true) { input_input.setAttribute("style", "display:none") }
        column_input.appendChild(input_input)

        row_input.appendChild(column_input)
    }
    document.getElementById('table_input').appendChild(row_input)
    modifierSub_nbr++
}

function addInputColumn() {
    console.log('add column')
    let input_radio = document.createElement('input');
    input_radio.setAttribute('type', 'radio')
    input_radio.setAttribute('name', 'radio_input')
    input_radio.setAttribute('class', 'radio_input')
    input_radio.setAttribute('value', `${modifier_nbr + 1}`)
    input_radio.setAttribute('id', `radio_input_${modifier_nbr + 1}`)
    let column_input_radio = document.createElement('td')
    column_input_radio.appendChild(input_radio);
    document.getElementById('tr_input_radio').appendChild(column_input_radio)

    let input_checkbox = document.createElement('input');
    input_checkbox.setAttribute('type', 'checkbox')
    input_checkbox.setAttribute('checked', 'true')
    input_checkbox.setAttribute('id', `checkbox_input_${modifier_nbr + 1}`)
    let column_input_checkbox = document.createElement('td')
    column_input_checkbox.appendChild(input_checkbox);
    document.getElementById('tr_input_checkbox').appendChild(column_input_checkbox)

    console.log(modifierSub_nbr)
    for (let i = 0; i < modifierSub_nbr; i++) {
        let column_input = document.createElement('td')
        let input_input = document.createElement('input')
        input_input.setAttribute('id', `input${modifier_nbr + 1}_${i + 1}`);
        input_input.setAttribute('class', `input_modifier`);
        column_input.appendChild(input_input)
        document.getElementById(`tr_input_${i + 1}`).appendChild(column_input)
    }
    modifier_nbr++
    document.getElementById(`radio_input_${modifier_nbr}`).addEventListener('click', function () { click_radio_input(modifier_nbr) })

}

loadingIndex()


