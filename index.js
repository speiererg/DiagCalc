var modifier_nbr = 3
var modifierTyp_nbr = 4
var array_inputs_value = [];
var array_inputs_itemNbr = [];
var array_calculator = [];

// Loading 
function loadingIndex() {
    document_addeventlistener()
}

function document_addeventlistener() {
    document.getElementById('button_calculate').addEventListener('click', click_calculate)
}

function click_calculate() {
    array_inputs_value = [];
    array_inputs_itemNbr = [];
    array_calculator = [];
    for (let i = 1; i <= modifier_nbr; i++) {
        let array_inputs_oneModifier = [];
        let item_nbr = 0
        for (let k = 1; k <= modifierTyp_nbr; k++) {
            let input_value = document.getElementById(`input${i}_${k}`).value
            if (document.getElementById(`input${i}_${k}`).value != '') {
                item_nbr++
                array_inputs_oneModifier.push(input_value)
            }
        }
        array_inputs_itemNbr.push(item_nbr)
        array_inputs_value.push(array_inputs_oneModifier);
    }

    // Creation du array_Calculator
    array_calculator.unshift(1)
    for (let i = modifier_nbr; i > 1; i--) {
        array_calculator.unshift(array_calculator[0] * array_inputs_itemNbr[i - 1])
        console.log(i)
    }

    console.log(array_inputs_value);
    console.log(array_inputs_itemNbr);
    console.log(array_calculator);
    create_calculator_output();
    console.log('test launch')
}


function create_calculator_output() {
    console.log("launch create calculator")
    for (let modifier1 = 0; modifier1 < array_inputs_itemNbr[0]; modifier1++) {
        for (let modifier2 = 0; modifier2 < array_inputs_itemNbr[1]; modifier2++) {
            for (let modifier3 = 0; modifier3 < array_inputs_itemNbr[2]; modifier3++) {
                let row_output_calculator = document.createElement('tr')
                let row_output_calculator_Column = document.createElement('td')
                let calculated_diag = `${array_inputs_value[0][modifier1]} ${array_inputs_value[1][modifier2]} ${array_inputs_value[2][modifier3]}`
                row_output_calculator_Column.appendChild(document.createTextNode(calculated_diag));
                row_output_calculator.appendChild(row_output_calculator_Column)
                document.getElementById('table_output_calculator').innerHTML="";
                document.getElementById('table_output_calculator').appendChild(row_output_calculator);
                console.log(calculated_diag)
            }
        }
    }

}









loadingIndex()


