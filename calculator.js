document.getElementById('input_hidden_modifier_nbr').value = modifier_nbr
document.getElementById('input_hidden_modifierSub_nbr').value = modifierSub_nbr


function loading_page_calculator() {
    document_addeventlistener_calculator()
}


function document_addeventlistener_calculator() {
    document.getElementById('button_calculate').addEventListener('click', click_calculate)
    document.getElementById('img_button_add_row').addEventListener('click', addInputRow)
    document.getElementById('img_button_add_column').addEventListener('click', addInputColumn)
    document.getElementById('button_findOne_calculator').addEventListener('click', findOne_Calculator_mongoDB)

    for (let i = 0; i <= modifier_nbr; i++) {
        document.getElementById(`radio_input_${i}`).addEventListener('click', function () { click_radio_input(i) })
    }
}



loading_page_calculator()