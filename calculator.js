document.getElementById('input_hidden_modifier_nbr').value = modifier_nbr
document.getElementById('input_hidden_modifierSub_nbr').value = modifierSub_nbr


function loading_page_calculator() {
    document_addeventlistener_calculator()
    id_POST = document.getElementById('input_hidden_POST_id').value
    version_POST = document.getElementById('input_hidden_POST_version').value
    findOne_Calculator_mongoDB(id_POST, version_POST)
    document.getElementById(`radio_input_1`).dataset.id = 1

}

function document_addeventlistener_calculator() {
    document.getElementById('button_calculate').addEventListener('click', click_calculate)
    document.getElementById('img_button_add_row').addEventListener('click', addInputRow)
    document.getElementById('img_button_add_column').addEventListener('click', addInputColumn)

    document.getElementById(`radio_input_1`).addEventListener('click', function () { click_radio_input(1) })

}


//MondoDB




loading_page_calculator()