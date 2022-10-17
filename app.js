var modifier_nbr = 3
var modifierSub_nbr = 4
var array_inputs_value = [];
var array_inputs_itemNbr = [];
var array_calculator = [];
var array_hiden_inputs = []

// Loading 
function loadingIndex() {
    document_addeventlistener()
}

function document_addeventlistener() {
    document.getElementById('button_calculate').addEventListener('click', click_calculate)
    document.getElementById('img_button_add_row').addEventListener('click', addInputRow)

    for (let i = 1; i <= modifier_nbr; i++) {
        document.getElementById(`radio_input_${i}`).addEventListener('click', function () { click_radio_input(i) })
    }
}

function click_radio_input(radio_input_id) {
    for (let i = 0; i < array_hiden_inputs.length; i++) { document.getElementById(array_hiden_inputs[i]).style.display = "block" }
    array_hiden_inputs = []
    for (let i = 2; i <= modifierSub_nbr; i++) {
        document.getElementById(`input${radio_input_id}_${i}`).style.display = "none";
        document.getElementById(`input${radio_input_id}_${i}`).value = ""
        array_hiden_inputs.push(`input${radio_input_id}_${i}`);
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
        if (document.getElementById(`checkbox_input_${i}`).checked == true) {
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

    console.log(array_inputs_value);
    console.log(array_inputs_itemNbr);
    console.log(array_calculator);
    create_calculator_output();
}


function create_calculator_output() {
    document.getElementById('table_output_calculator').innerHTML = "";
    for (let modifier1 = 0; modifier1 < array_inputs_itemNbr[0]; modifier1++) {
        for (let modifier2 = 0; modifier2 < array_inputs_itemNbr[1]; modifier2++) {
            for (let modifier3 = 0; modifier3 < array_inputs_itemNbr[2]; modifier3++) {
                console.log(modifier1, modifier2, modifier3)
                let row_output_calculator = document.createElement('tr')
                let row_output_calculator_Column = document.createElement('td')
                let calculated_diag = `${array_inputs_value[0][modifier1]} ${array_inputs_value[1][modifier2]} ${array_inputs_value[2][modifier3]}`
                row_output_calculator_Column.appendChild(document.createTextNode(calculated_diag));
                row_output_calculator.appendChild(row_output_calculator_Column)
                document.getElementById('table_output_calculator').appendChild(row_output_calculator);
            }
        }
    }
}


function addInputRow() {
    let row_input = document.createElement('tr')
    for (let i = 0; i < modifier_nbr; i++) {
        let column_input = document.createElement('td')
        let input_input = document.createElement('input')
        column_input.appendChild(input_input);
        input_input.setAttribute('id', `input${i + 1}_${modifierSub_nbr + 1}`);
        input_input.setAttribute('class', `input_modifier`);
        row_input.appendChild(column_input)
    }
    document.getElementById('table_input').appendChild(row_input)
    modifierSub_nbr++
}

loadingIndex()


