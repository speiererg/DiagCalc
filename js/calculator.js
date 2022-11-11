

function loading_page_calculator(paramsJS) {
    document.getElementById('button_edit_calculator').addEventListener('click', () => { edit_calculator() })
    document.getElementById('input_hidden_modifier_nbr').value = modifier_nbr
    document.getElementById('input_hidden_modifierSub_nbr').value = modifierSub_nbr
    document.getElementById('button_calculate').disabled = true
    document.getElementById('button_save_calculator').disabled = true
    document.getElementById('button_calculate').addEventListener('click', click_calculate)
    document.getElementById('img_button_add_row').addEventListener('click', addInputRow)
    document.getElementById('img_button_add_column').addEventListener('click', () => { addInputColumn('', '') })
    document.getElementById(`radio_input_1`).addEventListener('change', function (event) { click_radio_input(event) })
    document.getElementById('button_download_XML').addEventListener('click', function (event) { download_XML() })
    document.getElementById('button_download_TXT').addEventListener('click', function (event) { download_TXT() })
    document.getElementById('checkbox_imported').addEventListener('click',function(){click_on_checkbox('imported')})
    document.getElementById('checkbox_ready_import').addEventListener('click',function(){click_on_checkbox('ready_import')})
    document.getElementById('checkbox_reviewed_SME').addEventListener('click',function(){click_on_checkbox('reviewed_SME')})
    document.getElementById('checkbox_reviewed_coding').addEventListener('click',function(){click_on_checkbox('reviewed_coding')})


    document.getElementById(`checkbox_multiple_input_1`).addEventListener('change', (event) => {
        if (document.getElementById(`checkbox_multiple_input_1`).checked == true) {
            document.getElementById(`checkbox_input_1`).disabled = true
        } else {
            document.getElementById(`checkbox_input_1`).disabled = false
        }
    })

    id_POST = document.getElementById('input_hidden_POST_id').value
    version_POST = document.getElementById('input_hidden_POST_version').value
    if (paramsJS != "newCalculator") { 
        findOne_Calculator_mongoDB(id_POST, version_POST)
        findOne_Calculator_index_mongoDB(id_POST, version_POST) 
 
    }
    document.getElementById(`radio_input_1`).dataset.id = 1
}


/************* MONGODB */

function findOne_Calculator_mongoDB(id, version) {
    var xmlhttp = new XMLHttpRequest();
    let params = `id=${id}&version=${version}`
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let results_findOne = JSON.parse(this.responseText);
            console.log(results_findOne)
            importing_calculator(results_findOne)
        }
    };
    xmlhttp.open("POST", "mongodb/findOne_calculator.php", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
}

function findOne_Calculator_index_mongoDB(id, version) {
    var xmlhttp = new XMLHttpRequest();
    let params = `id=${id}`
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let results_findOne = JSON.parse(this.responseText);
            importing_calculator_index(results_findOne)
        }
    };
    xmlhttp.open("POST", "mongodb/findOne_calculator_index.php", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
}

function importing_calculator(results_findOne) {
    console.log(results_findOne['modifiers'][0])
    document.getElementById('input_maindiagnose').value = results_findOne['mainName']
    document.getElementById('input_calculator_id').value = results_findOne['calculator_id']
    document.getElementById('input_medsp_id').value = results_findOne['medsp_id']
    document.getElementById('input_hidden_form_deactivate_calculator').value = results_findOne['calculator_id']
    document.getElementById('select_version').addEventListener('change', (event) => { changePage(`calculator`, `calculator_id=${results_findOne['calculator_id']}&version=${document.getElementById('select_version').value}`, '') })
    document.getElementById('select_version').innerHTML = ""

    output_array = results_findOne['output_array']

    // Create version
    for (let i = 1; i <= results_findOne['lastVersion']; i++) {
        let versionOption = document.createElement('option')
        if (i == results_findOne['version']) { versionOption.setAttribute('selected', 'true') }
        versionOption.value = i
        versionOption.appendChild(document.createTextNode(`Version ${i}`))
        document.getElementById('select_version').appendChild(versionOption)
    }
    document.getElementById('input_last_version').value = results_findOne['lastVersion']

    //desactivate edit/download XML+TXT if not last version
    if (results_findOne['version'] != results_findOne['lastVersion']) {
        document.getElementById('button_edit_calculator').disabled = true
        document.getElementById('button_download_XML').disabled = true
        document.getElementById('button_download_TXT').disabled = true

    }
    if (results_findOne['updateMapping'] == true) {
        alert(alert_update_mapping)
        document.getElementById('button_download_XML').disabled = true
        document.getElementById('button_download_TXT').disabled = true

    }

    modifier_nbr_target = results_findOne['modifier_nbr'] - 1
    for (let l = 0; l < modifier_nbr_target; l++) {
        addInputColumn(results_findOne['parameters'], '')
    }

    if (results_findOne['parameters'][`checkbox_input_1`] == "true") {
        document.getElementById(`checkbox_input_1`).checked = true
    } else {
        document.getElementById(`checkbox_input_1`).checked = false
    }
    if (results_findOne['parameters'][`checkbox_multiple_input_1`] == "true") {
        document.getElementById(`checkbox_multiple_input_1`).checked = true
    } else {
        document.getElementById(`checkbox_multiple_input_1`).checked = false
    }

    modifierSub_nbr_target = results_findOne['modifierSub_nbr'] - 1
    for (let i = 0; i < modifierSub_nbr_target; i++) { addInputRow() }

    let modifiers_array = results_findOne['modifiers']

    for (let i = 1, targetI = results_findOne['modifier_nbr']; i <= targetI; i++) {
        document.getElementById(`span_modifier_id_${i}`).innerHTML = `Modifier Id: ${modifiers_array[i - 1]['modifier_id']}`
        document.getElementById(`input_modifier_id_${i}`).value = modifiers_array[i - 1]['modifier_id']
        document.getElementById(`input_modifier_title_${i}`).value = modifiers_array[i - 1]['modifier_name']

        for (let k = 1, targetK = results_findOne['modifierSub_nbr']; k <= targetK; k++) {

            document.getElementById(`input${i}_${k}`).value = modifiers_array[i - 1]['modifier_array'][k - 1]
            document.getElementById(`inputSNOMED${i}_${k}`).value = modifiers_array[i - 1]['SNOMED_array'][k - 1]
            document.getElementById(`inputICD${i}_${k}`).value = modifiers_array[i - 1]['ICD_array'][k - 1]
        }
    }

    if (results_findOne['parameters'][`radio_input`] != null) { document.getElementById(`radio_input_${results_findOne['parameters'][`radio_input`]}`).click() }

    disable_input(true)

    printing_calculator_output(output_array, 'import')
}

function importing_calculator_index(results_findOne_index)
{
    console.log(results_findOne_index)
    function import_calculator_index(checkbox_typ){
        document.getElementById(`checkbox_${checkbox_typ}`).checked = true
        document.getElementById(`input_${checkbox_typ}_last`).value= `${getDateActual(results_findOne_index[checkbox_typ]['time'])} by: ${results_findOne_index[checkbox_typ]['user']}`
        if(results_findOne_index['last_modification_timestamp'] > results_findOne_index[checkbox_typ]['time']){
            document.getElementById(`input_${checkbox_typ}_changed_since`).value= `New calculation since review/import`
        }
    }
    import_calculator_index('reviewed_coding')
    import_calculator_index('reviewed_SME')
    import_calculator_index('ready_import')
    import_calculator_index('imported')

}

function edit_calculator() {
    confirmBeforeNavigate = 1
    document.getElementById('button_edit_calculator').disabled = true;
    document.getElementById('button_calculate').disabled = false;
    document.getElementById('button_save_calculator').disabled = true
    document.getElementById('button_download_TXT').disabled = true;
    document.getElementById('button_download_XML').disabled = true;

    disable_input(false)

    let versionOption = document.createElement('option')
    versionOption.setAttribute('selected', 'true')
    let neueVersion = parseInt(document.getElementById('select_version').value) + 1
    versionOption.value = neueVersion
    versionOption.appendChild(document.createTextNode(`Version ${neueVersion}`))
    document.getElementById('select_version').appendChild(versionOption)

}


function addInputRow() {
    let row_input = document.createElement('tr')
    let modifierSub_nbr_new = modifierSub_nbr + 1
    row_input.setAttribute('id', `tr_input_${modifierSub_nbr_new}`)
    for (let i = 0; i < modifier_nbr; i++) {
        let column_input = document.createElement('td')

        let input_input = document.createElement('input')
        input_input.setAttribute('id', `input${i + 1}_${modifierSub_nbr_new}`);
        input_input.setAttribute('class', `input_modifier input_readonly`);
        input_input.setAttribute('name', `input${i + 1}_${modifierSub_nbr_new}`);
        input_input.setAttribute('form', `form_saveMongoDB`);
        column_input.appendChild(input_input)

        let br_tag = document.createElement('br');
        column_input.appendChild(br_tag)


        let input_SNOMED = document.createElement('input')
        input_SNOMED.setAttribute('id', `inputSNOMED${i + 1}_${modifierSub_nbr_new}`);
        input_SNOMED.setAttribute('class', `input_SNOMED input_readonly`);
        input_SNOMED.setAttribute('name', `inputSNOMED${i + 1}_${modifierSub_nbr_new}`);
        input_SNOMED.setAttribute('form', `form_saveMongoDB`);
        column_input.appendChild(input_SNOMED)

        let br_tag2 = document.createElement('br');
        column_input.appendChild(br_tag2)


        let input_ICD = document.createElement('input')
        input_ICD.setAttribute('id', `inputICD${i + 1}_${modifierSub_nbr_new}`);
        input_ICD.setAttribute('class', `input_ICD input_readonly`);
        input_ICD.setAttribute('name', `inputICD${i + 1}_${modifierSub_nbr_new}`);
        input_ICD.setAttribute('form', `form_saveMongoDB`);
        column_input.appendChild(input_ICD)

        $(function () {
            let id_variable = `inputICD${i + 1}_${modifierSub_nbr_new}`
            $("#" + id_variable).autocomplete({
                minLength: 2,
                source: function (request, response) {
                    var results = $.ui.autocomplete.filter(array_ICD10, request.term);
                    response(results.slice(0, autocomplete_items))
                },
                change: function (event, ui) { if (!ui.item) { $(`#inputICD${i + 1}_${modifierSub_nbr_new}`).val(""); } }
            });
        });

        if (document.getElementById(`radio_input_${i + 1}`).checked == true) {
            input_input.disabled = true
            input_ICD.disabled = true
            input_SNOMED.disabled = true
        }


        row_input.appendChild(column_input)
    }
    document.getElementById('table_input').appendChild(row_input)
    modifierSub_nbr_change('++', 1)
}

function addInputColumn(params_addColumn, id_insert_column) {
    let modifier_nbr_new = modifier_nbr + 1



    // Create Modifier ID
    let column_input_modifier_id = document.createElement('td')
    column_input_modifier_id.setAttribute('class', 'td_modifier_id')
    column_input_modifier_id.setAttribute('id', `td_input_modifier_id_${modifier_nbr_new}`);

    let span_modifier_id = document.createElement('span')
    span_modifier_id.setAttribute('id', `span_modifier_id_${modifier_nbr_new}`)
    span_modifier_id.appendChild(document.createTextNode(`Modifier Id: X`))


    let input_modifier_id = document.createElement('input')
    input_modifier_id.setAttribute('type', 'hidden')
    input_modifier_id.setAttribute('id', `input_modifier_id_${modifier_nbr_new}`)
    input_modifier_id.setAttribute('name', `input_modifier_id_${modifier_nbr_new}`)
    input_modifier_id.setAttribute('form', `form_saveMongoDB`);


    let insert_column_image = document.createElement('img')
    insert_column_image.src = "img/add.png"
    insert_column_image.setAttribute("class", "img_button")
    insert_column_image.setAttribute("id", `img_button_insert_column${modifier_nbr_new}`)

    column_input_modifier_id.appendChild(insert_column_image)
    column_input_modifier_id.appendChild(span_modifier_id)
    column_input_modifier_id.appendChild(input_modifier_id)

    document.getElementById('tr_input_modifier_id').appendChild(column_input_modifier_id)
    document.getElementById(`img_button_insert_column${modifier_nbr_new}`).addEventListener('click', () => { addInputColumn('', modifier_nbr_new) })



    // Create Modifier Title
    let column_input_title = document.createElement('td')
    let input_title = document.createElement('input')
    column_input_title.setAttribute('id', `td_input_modifier_title_${modifier_nbr_new}`);
    input_title.setAttribute('id', `input_modifier_title_${modifier_nbr_new}`);
    input_title.setAttribute('name', `input_modifier_title_${modifier_nbr_new}`);
    input_title.setAttribute('value', `Modifier ${modifier_nbr_new}`)
    input_title.setAttribute('class', 'input_title input_readonly')
    input_title.setAttribute('form', `form_saveMongoDB`);

    column_input_title.appendChild(input_title)

    document.getElementById('tr_input_title').appendChild(column_input_title)



    //Create Select
    let column_input_select = document.createElement('td')
    let input_select = document.createElement('select');
    input_select.setAttribute('id', `select_input_${modifier_nbr_new}`)
    input_select.setAttribute('class', `input_select input_disabled`)
    input_select.setAttribute('form', `form_saveMongoDB`);
    input_select.setAttribute('name', `select_input_${modifier_nbr_new}`)
    input_select.innerHTML = `<option value="0" selected>space</option><option value="1">,</option><option value="2">;</option>`
    column_input_select.appendChild(input_select)
    document.getElementById('tr_input_separator').appendChild(column_input_select)

    // Create radio
    let input_radio = document.createElement('input');
    input_radio.setAttribute('type', 'radio')
    input_radio.setAttribute('name', `radio_input`)
    input_radio.setAttribute('class', 'radio_input')
    input_radio.setAttribute('value', modifier_nbr_new)
    input_radio.setAttribute('id', `radio_input_${modifier_nbr_new}`)
    input_radio.setAttribute('form', `form_saveMongoDB`);

    let column_input_radio = document.createElement('td')
    column_input_radio.appendChild(input_radio);
    column_input_radio.appendChild(document.createTextNode("Main"))
    document.getElementById('tr_input_radio').appendChild(column_input_radio)
    document.getElementById(`radio_input_${modifier_nbr_new}`).dataset.id = modifier_nbr_new

    // Checkbox Not Required
    let input_checkbox = document.createElement('input');
    input_checkbox.setAttribute('type', 'checkbox')
    input_checkbox.setAttribute('value', true)
    input_checkbox.setAttribute('id', `checkbox_input_${modifier_nbr_new}`)
    input_checkbox.setAttribute('class', `input_checkbox`)
    input_checkbox.setAttribute('form', `form_saveMongoDB`);
    input_checkbox.setAttribute('name', `checkbox_input_${modifier_nbr_new}`)
    let column_input_checkbox = document.createElement('td')
    column_input_checkbox.appendChild(input_checkbox);
    column_input_checkbox.appendChild(document.createTextNode("Not Required"))
    document.getElementById('tr_input_checkbox').appendChild(column_input_checkbox)
    document.getElementById(`checkbox_input_${modifier_nbr_new}`).checked = true

    //Checkbox Multiple
    let input_multiple_checkbox = document.createElement('input');
    input_multiple_checkbox.setAttribute('type', 'checkbox')
    input_multiple_checkbox.setAttribute('id', `checkbox_multiple_input_${modifier_nbr_new}`)
    input_multiple_checkbox.setAttribute('class', `input_checkbox`)
    input_multiple_checkbox.setAttribute('value', true)
    input_multiple_checkbox.setAttribute('name', `checkbox_multiple_input_${modifier_nbr_new}`)
    input_multiple_checkbox.setAttribute('form', `form_saveMongoDB`);
    let column_input_multiple_checkbox = document.createElement('td')
    column_input_multiple_checkbox.appendChild(input_multiple_checkbox);
    column_input_multiple_checkbox.appendChild(document.createTextNode("Multiple"))
    document.getElementById('tr_input_multiple_checkbox').appendChild(column_input_multiple_checkbox)

    document.getElementById(`checkbox_multiple_input_${modifier_nbr_new}`).addEventListener('change', (event) => {
        if (document.getElementById(`checkbox_multiple_input_${modifier_nbr_new}`).checked == true) {
            document.getElementById(`checkbox_input_${modifier_nbr_new}`).disabled = true
        } else {
            document.getElementById(`checkbox_input_${modifier_nbr_new}`).disabled = false
        }
    })

    // Create Input
    for (let i = 0; i < modifierSub_nbr; i++) {

        let column_input = document.createElement('td')
        let input_input = document.createElement('input')
        input_input.setAttribute('id', `input${modifier_nbr_new}_${i + 1}`);
        input_input.setAttribute('class', `input_modifier input_readonly`);
        input_input.setAttribute('name', `input${modifier_nbr_new}_${i + 1}`);
        input_input.setAttribute('form', `form_saveMongoDB`);
        column_input.appendChild(input_input)

        let br_tag = document.createElement('br');
        column_input.appendChild(br_tag)


        let input_SNOMED = document.createElement('input')
        input_SNOMED.setAttribute('id', `inputSNOMED${modifier_nbr_new}_${i + 1}`);
        input_SNOMED.setAttribute('class', `input_SNOMED input_readonly`);
        input_SNOMED.setAttribute('name', `inputSNOMED${modifier_nbr_new}_${i + 1}`);
        input_SNOMED.setAttribute('form', `form_saveMongoDB`);
        column_input.appendChild(input_SNOMED)

        let br_tag2 = document.createElement('br');
        column_input.appendChild(br_tag2)

        let input_ICD = document.createElement('input')
        input_ICD.setAttribute('id', `inputICD${modifier_nbr_new}_${i + 1}`);
        input_ICD.setAttribute('class', `input_ICD input_readonly`);
        input_ICD.setAttribute('name', `inputICD${modifier_nbr_new}_${i + 1}`);
        input_ICD.setAttribute('form', `form_saveMongoDB`);
        column_input.appendChild(input_ICD)
        document.getElementById(`tr_input_${i + 1}`).appendChild(column_input)


        $(function () {
            let id_variable = `inputICD${modifier_nbr_new}_${i + 1}`
            $("#" + id_variable).autocomplete({
                minLength: 2,
                source: function (request, response) {
                    var results = $.ui.autocomplete.filter(array_ICD10, request.term);
                    response(results.slice(0, autocomplete_items))
                },
                change: function (event, ui) { if (!ui.item) { $(`#inputICD${modifier_nbr_new}_${i + 1}`).val(""); } }
            });
        });
    }

    document.getElementById(`radio_input_${modifier_nbr_new}`).addEventListener('change', function (event) { click_radio_input(event) })

    //Import Params
    if (params_addColumn != null) {
        if (params_addColumn[`checkbox_input_${modifier_nbr_new}`] == "true") {
            document.getElementById(`checkbox_input_${modifier_nbr_new}`).checked = true
        } else {
            document.getElementById(`checkbox_input_${modifier_nbr_new}`).checked = false
        }
        if (params_addColumn[`checkbox_multiple_input_${modifier_nbr_new}`] == "true") {
            document.getElementById(`checkbox_multiple_input_${modifier_nbr_new}`).checked = true
        } else {
            document.getElementById(`checkbox_multiple_input_${modifier_nbr_new}`).checked = false
        }
    }

    for (let i = 1; i <= modifier_nbr; i++) {
        if (document.getElementById(`checkbox_multiple_input_${i}`).checked == true) {
            document.getElementById(`checkbox_input_${i}`).disabled = true
        } else {
            document.getElementById(`checkbox_input_${i}`).disabled = false
        }
    }


    // Displace Infos for Insert Columns
    if (id_insert_column) {
        for (let k = modifier_nbr_new; k > id_insert_column; k--) {
            for (let g = 1; g <= modifierSub_nbr; g++) {
                document.getElementById(`input${k}_${g}`).value = document.getElementById(`input${k - 1}_${g}`).value
                document.getElementById(`inputSNOMED${k}_${g}`).value = document.getElementById(`inputSNOMED${k - 1}_${g}`).value
                document.getElementById(`inputICD${k}_${g}`).value = document.getElementById(`inputICD${k - 1}_${g}`).value
            }
        }

        for (let g = 1; g <= modifierSub_nbr; g++) {
            document.getElementById(`input${id_insert_column}_${g}`).value = ""
            document.getElementById(`inputSNOMED${id_insert_column}_${g}`).value = ""
            document.getElementById(`inputICD${id_insert_column}_${g}`).value = ""
        }
    }


    // Modifier_nbr Increment
    modifier_nbr_change('++', 1)
}

//  *****************************  Function Calculator  *****************************

function click_radio_input(event) {
    radio_input_id = event.srcElement.dataset.id
    if (array_hiden_ID != "") {
        document.getElementById(`checkbox_input_${array_hiden_ID}`).disabled = false
        document.getElementById(`checkbox_multiple_input_${array_hiden_ID}`).disabled = false
        document.getElementById(`checkbox_input_${array_hiden_ID}`).checked = true
        for (let i = 2; i <= modifierSub_nbr; i++) {
            document.getElementById(`input${array_hiden_ID}_${i}`).disabled = false;
            document.getElementById(`inputSNOMED${array_hiden_ID}_${i}`).disabled = false;
            document.getElementById(`inputICD${array_hiden_ID}_${i}`).disabled = false;
        }
    }
    if (radio_input_id != "0") {
        for (let i = 2; i <= modifierSub_nbr; i++) {
            document.getElementById(`input${radio_input_id}_${i}`).disabled = true;
            document.getElementById(`input${radio_input_id}_${i}`).value = ""
            document.getElementById(`inputSNOMED${radio_input_id}_${i}`).disabled = true;
            document.getElementById(`inputSNOMED${radio_input_id}_${i}`).value = ""
            document.getElementById(`inputICD${radio_input_id}_${i}`).disabled = true;
            document.getElementById(`inputICD${radio_input_id}_${i}`).value = ""
            array_hiden_ID = radio_input_id
        }
        document.getElementById(`checkbox_input_${radio_input_id}`).disabled = true
        document.getElementById(`checkbox_multiple_input_${radio_input_id}`).disabled = true
        document.getElementById(`checkbox_input_${radio_input_id}`).checked = false
        document.getElementById(`checkbox_multiple_input_${radio_input_id}`).checked = false
        document.getElementById(`input_modifier_title_${radio_input_id}`).value = calculated_diag_trim(document.getElementById(`input${radio_input_id}_1`).value)


    }
}

function click_on_checkbox(checkbox_typ){
    document.getElementById(`checkbox_${checkbox_typ}_changed`).value = "true"
    document.getElementById(`input_${checkbox_typ}_last`).value= `Last: ${getDateActual()}`
}      



function click_calculate() {
    let array_inputs_value = [];
    let array_SNOMED_value = [];
    let array_ICD_value = [];
    let array_modifier_isMain = [];
    let array_inputs_itemNbr = [];
    let array_inputs_modifierNbr = [];
    let array_calculator = [];
    let array_main = []
    for (let i = 1; i <= modifier_nbr; i++) {
        let array_inputs_oneModifier = [];
        let array_inputs_SNOMED_oneModifier = [];
        let array_inputs_ICD_oneModifier = [];
        let item_nbr = 0
        let modifierSub_iterate = 1
        if (document.getElementById(`checkbox_input_${i}`).checked == true && document.getElementById(`radio_input_${i}`).checked == false) {
            modifierSub_iterate = 0
        }

        if (document.getElementById(`checkbox_multiple_input_${i}`).checked == true && document.getElementById(`radio_input_${i}`).checked == false) {

            for (let k = 1; k <= modifierSub_nbr; k++) {
                let input_value = ['', document.getElementById(`input${i}_${k}`).value]
                let SNOMED_value = ['', document.getElementById(`inputSNOMED${i}_${k}`).value]
                let ICD_value = ['', document.getElementById(`inputICD${i}_${k}`).value.split('::')[0]]

                if (document.getElementById(`input${i}_${k}`).value != '') {
                    array_inputs_oneModifier.push('')
                    array_inputs_SNOMED_oneModifier.push('')
                    array_inputs_ICD_oneModifier.push('')
                    array_inputs_itemNbr.push(2)
                    array_inputs_value.push(input_value);
                    array_inputs_modifierNbr.push(i - 1) //-1 because of array
                    array_SNOMED_value.push(SNOMED_value);
                    array_ICD_value.push(ICD_value);
                    if (document.getElementById(`radio_input_${i}`).checked == false) { array_modifier_isMain.push('0') } else { array_modifier_isMain.push('1') }
                }
            }


        } else {
            for (let k = modifierSub_iterate; k <= modifierSub_nbr; k++) {
                if (k == 0) {
                    item_nbr++
                    array_inputs_oneModifier.push('')
                    array_inputs_SNOMED_oneModifier.push('')
                    array_inputs_ICD_oneModifier.push('')

                } else {
                    let input_value = document.getElementById(`input${i}_${k}`).value
                    let SNOMED_value = document.getElementById(`inputSNOMED${i}_${k}`).value
                    let ICD_value = document.getElementById(`inputICD${i}_${k}`).value.split('::')[0]
                    let modifier_value = document.getElementById(`input${i}_${k}`).value

                    if (input_value != '') {
                        item_nbr++
                        array_inputs_oneModifier.push(input_value)
                        array_inputs_SNOMED_oneModifier.push(SNOMED_value)
                        array_inputs_ICD_oneModifier.push(ICD_value)

                    }
                }
            }
            array_inputs_itemNbr.push(item_nbr)
            array_inputs_value.push(array_inputs_oneModifier);
            array_inputs_modifierNbr.push(i - 1) //-1 because of array
            array_SNOMED_value.push(array_inputs_SNOMED_oneModifier);
            array_ICD_value.push(array_inputs_ICD_oneModifier);
            if (document.getElementById(`radio_input_${i}`).checked == false) { array_modifier_isMain.push('0') } else { array_modifier_isMain.push('1') }

        }
    }

    // Creation du array_Calculator
    array_calculator.unshift(1)
    for (let i = modifier_nbr; i > 1; i--) {
        array_calculator.unshift(array_calculator[0] * array_inputs_itemNbr[i - 1])
    }

    calculating_calculator_output(array_inputs_value, array_SNOMED_value, array_ICD_value, array_inputs_modifierNbr, array_modifier_isMain, array_inputs_itemNbr);
}


function calculating_calculator_output(array_inputs_value, array_SNOMED_value, array_ICD_value, array_inputs_modifierNbr, array_modifier_isMain, array_inputs_itemNbr) {
    output_array = []
    array_calculator_inputs_modifierNbr = array_inputs_modifierNbr.length  //give the number of array (modifier_nbr + multiple)
    document.getElementById('table_output_calculator').innerHTML = "";

    var array_iterate = []
    var itteration_id = array_calculator_inputs_modifierNbr - 1
    for (let i = 0; i < array_calculator_inputs_modifierNbr; i++) { array_iterate.push('0') }


    // Creation of General Diagnostic 
    let calculated_SNOMED = []
    let calculated_ICD = []
    let calculated_modifier = []
    let main_id = array_modifier_isMain.indexOf('1')
    calculated_diag_main = calculated_diag_trim(array_inputs_value[main_id][0])
    if (array_SNOMED_value[main_id][0] != "") { calculated_SNOMED.push(array_SNOMED_value[main_id][0]) }
    if (array_ICD_value[main_id][0] != "") { calculated_ICD.push(array_ICD_value[main_id][0]) }

    output_array.push({ 'diagnostic_name': calculated_diag_main, 'SNOMED_array': calculated_SNOMED, 'ICD_array': calculated_ICD, 'modifier_array': calculated_modifier, 'typ': 'main' })

    // Creation of Items
    let array_item0 = array_inputs_itemNbr[0]
    array_inputs_itemNbr[0]++
    while (array_iterate[0] < array_item0) {
        let calculated_diag = ""
        let calculated_SNOMED = []
        let calculated_ICD = []
        let calculated_modifier = []
        for (let i0 = 0; i0 < array_calculator_inputs_modifierNbr; i0++) {
            let input_value_loop = `${array_inputs_value[i0][array_iterate[i0]]}`
            let SNOMED_value_loop = `${array_SNOMED_value[i0][array_iterate[i0]]}`
            let ICD_value_loop = `${array_ICD_value[i0][array_iterate[i0]]}`
            let input_modifier_loop = `${array_inputs_value[i0][array_iterate[i0]]}`

            calculated_diag = calculated_diag + input_value_loop
            if (input_value_loop != "") { calculated_diag = calculated_diag + " " }
            if (SNOMED_value_loop != "") { calculated_SNOMED.push(SNOMED_value_loop) }
            if (ICD_value_loop != "") { calculated_ICD.push(ICD_value_loop) }
            if (array_modifier_isMain[i0] == 0 && input_modifier_loop != "") { calculated_modifier.push(input_modifier_loop) }
        }

        //Creating Output Array
        calculated_diag = calculated_diag_trim(calculated_diag)
        if (calculated_diag != calculated_diag_main) {
            output_array.push({ 'diagnostic_name': calculated_diag, 'SNOMED_array': calculated_SNOMED, 'ICD_array': calculated_ICD, 'modifier_array': calculated_modifier, 'typ': 'specific' })
        }


        // Array Calculation
        if (array_iterate[itteration_id] < (array_inputs_itemNbr[itteration_id] - 1)) {
            array_iterate[itteration_id]++
        } else {
            if (array_iterate[0] < (array_inputs_itemNbr[0] - 1)) {
                for (let test_id = 0, id_increment = 1; test_id <= array_calculator_inputs_modifierNbr; id_increment++) {
                    array_iterate[array_calculator_inputs_modifierNbr - id_increment] = 0
                    if (array_iterate[itteration_id - id_increment] < (array_inputs_itemNbr[itteration_id - id_increment] - 1)) {
                        array_iterate[itteration_id - id_increment]++
                        test_id = array_calculator_inputs_modifierNbr + 1
                    }
                    test_id++
                }
            }
        }

    }

    document.getElementById('button_edit_calculator').disabled = false
    document.getElementById('button_calculate').disabled = true
    document.getElementById('button_save_calculator').disabled = false
    console.log(output_array)
    disable_input(true)
    printing_calculator_output(output_array, 'calculate')
}

function calculated_diag_trim(calculated_diag_f) {
    calculated_diag_f = calculated_diag_f.replace(/\s+/g, ' ').trim()
    calculated_diag_f = calculated_diag_f.charAt(0).toUpperCase() + calculated_diag_f.slice(1)
    return calculated_diag_f;
}

function printing_calculator_output(output_array_f, printFrom) {
    medsp_id_iterate_nbr = 0
    output_array_f.forEach((element) => {
        medsp_id_iterate_nbr++

        let row_output_calculator = document.createElement('tr')
        let row_output_medspId_column = document.createElement('td')
        let row_output_calculator_column = document.createElement('td')
        let row_output_calculator_SNOMED_column = document.createElement('td')
        let row_output_calculator_ICD_column = document.createElement('td')
        let row_output_calculator_typ = document.createElement('td')




        if (printFrom == "calculate") {
            row_output_medspId_column.appendChild(document.createTextNode('medsp_term_X'));
            row_output_calculator_column.appendChild(document.createTextNode(element['diagnostic_name']));
            row_output_calculator_SNOMED_column.appendChild(document.createTextNode(JSON.stringify(element['SNOMED_array'])));
            row_output_calculator_ICD_column.appendChild(document.createTextNode(JSON.stringify(element['ICD_array'])));
            row_output_calculator_typ.appendChild(document.createTextNode(element['typ']));
        } else {
            row_output_medspId_column.appendChild(document.createTextNode(`medsp_term_${element['medsp_id']}`));
            row_output_calculator_column.appendChild(document.createTextNode(element['diagnostic_name']));
            row_output_calculator_SNOMED_column.appendChild(document.createTextNode(JSON.stringify(element['SNOMED_array'])));
            row_output_calculator_ICD_column.appendChild(document.createTextNode(JSON.stringify(element['ICD_array'])));
            row_output_calculator_typ.appendChild(document.createTextNode(element['typ']));
        }


        row_output_calculator.appendChild(row_output_medspId_column)
        row_output_calculator.appendChild(row_output_calculator_column)
        row_output_calculator.appendChild(row_output_calculator_SNOMED_column)
        row_output_calculator.appendChild(row_output_calculator_ICD_column)
        row_output_calculator.appendChild(row_output_calculator_typ)

        document.getElementById('table_output_calculator').appendChild(row_output_calculator);
    })

    // update hidden input for Database save
    console.log(output_array)
    document.getElementById('input_hidden_array_output').value = JSON.stringify(output_array)

    //update total count
    document.getElementById('total_count').style.display = "block"
    document.getElementById('total_count').innerHTML = `Total Count: ${medsp_id_iterate_nbr}`;

}

