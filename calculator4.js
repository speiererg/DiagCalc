document.getElementById('input_hidden_modifier_nbr').value = modifier_nbr
document.getElementById('input_hidden_modifierSub_nbr').value = modifierSub_nbr


function loading_page_calculator() {
    document_addeventlistener_calculator()
    console.log('loading page calculator')
    console.log(id_POST,version_POST)
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




window.onload(loading_page_calculator())