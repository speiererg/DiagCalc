
// ***************************** App Parameters *****************************
const autocomplete_items = 50



// ***************************** Load Variable  *****************************

var modifier_nbr = 1
var modifierSub_nbr = 1
var confirmBeforeNavigate = 0
var array_inputs_value = [];
var array_inputs_itemNbr = [];
var array_calculator = [];
var array_hiden_ID = "";

var output_array = []

var Code_Return = "&#10;"
var Code_ModifierSeparator = "&#1;"

var array_ICD10 = []

// ***************************** Loading HOME  *****************************
function loadingIndex() {
    changePage('index')


    setTimeout(loadXML_ICD, 1500)

    $(document).keypress(
        function (event) {
            if (event.which == '13') {
                event.preventDefault();
            }
        });
}

function addEventListener() {
    document.getElementById('navPageHome').addEventListener('click', function () { changePage('home') })
    document.getElementById('navPageCalculator').addEventListener('click', function () { changePage('calculator', '', 'newCalculator') })
    //document.getElementById('navPageTest').addEventListener('click', function () { testMongoDB() })
    //document.getElementById('navPageDelete').addEventListener('click', function () { deleteAllMongoDB() })

}


//  *****************************   Change Page  *****************************
function changePage(page, paramsPHP, paramsJS) {
    actualPage = page
    if (confirmBeforeNavigate == 1) {
        if (confirm("Sie haben Daten die noch nicht gespeichert sind, wenn sie okay clicken werden sie diese Daten verlieren")) {
            changePageExecute(page, paramsPHP, paramsJS)
            confirmBeforeNavigate = 0
        }
    } else {
        changePageExecute(page, paramsPHP, paramsJS)
    }
}

function changePageExecute(page, paramsPHP, paramsJS) {
    if (window.location.search) {                                        //test if GET Parameters are passed
        let GET_object = transformToAssocArray(window.location.search)
        window.history.replaceState({}, document.title, "/" + "index.php");
        if (Object.keys(GET_object)[0] == 'calculator') {
            page = 'calculator'
            paramsPHP = `calculator_id=${Object.values(GET_object)[0]}&version=${Object.values(GET_object)[1]}`
        }
    }

    if (paramsPHP) { } else { paramsPHP = '' }
    let targetpage
    if (page == "index") { targetpage = 'home' } else { targetpage = page }
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("mainpage").innerHTML = ""
            document.getElementById("mainpage").innerHTML = this.responseText
            if (page == "calculator") {
                modifier_nbr = 1
                modifierSub_nbr = 1
                output_array = []
                loading_page_calculator(paramsJS)

                $(function () {
                    $("#inputICD1_1").autocomplete({
                        minLength: 2,
                        source: function (request, response) {
                            var results = $.ui.autocomplete.filter(array_ICD10, request.term);
                            response(results.slice(0, autocomplete_items))
                        },
                        change: function (event, ui) { if (!ui.item) { $(`#inputICD1_1`).val(""); } }
                    });
                });

                // if New Calculator
                if (paramsJS == "newCalculator") {
                    console.log('new Calculator')
                    document.getElementById('input_hidden_new_calculator').value = 1
                    document.getElementById('button_calculate').disabled = false
                    document.getElementById('button_edit_calculator').disabled = true
                    document.getElementById('button_download_XML').disabled = true
                    document.getElementById('button_download_TXT').disabled = true
                    confirmBeforeNavigate = 1


                } else { document.getElementById('input_hidden_new_calculator').value = 0 }
            }
            if (page == "index") {
                document.getElementById('home_tr').setAttribute('height', window.innerHeight - 200)
                addEventListener()
                find_home_mongoDB()
            }
            if (page == "home") {
                find_home_mongoDB()
                document.getElementById('home_tr').setAttribute('height', window.innerHeight - 200)

            }
        }
    }
    xhttp.open("POST", `mainContent/${targetpage}.php`);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(paramsPHP);

}
// *****************************   Tools   *****************************
function modifier_nbr_change(change, number) {
    if (change == "++") {
        modifier_nbr = modifier_nbr + number
    } else if (change == "--") {
        modifier_nbr = modifier_nbr - number
    }
    document.getElementById('input_hidden_modifier_nbr').value = modifier_nbr
}

function modifierSub_nbr_change(change, number) {
    if (change == "++") {
        modifierSub_nbr = modifierSub_nbr + number
    } else if (change == "--") {
        modifierSub_nbr = modifierSub_nbr - number
    }
    document.getElementById('input_hidden_modifierSub_nbr').value = modifierSub_nbr
}

function disable_input(toDo) {
    let DOM_readonly = document.getElementsByClassName('input_readonly')
    Array.prototype.forEach.call(DOM_readonly, (element) => { element.readOnly = toDo })
    let DOM_disabled = document.getElementsByClassName('input_disabled')
    Array.prototype.forEach.call(DOM_disabled, (element) => { element.disabled = toDo })
    let DOM_checkbox = document.getElementsByClassName('input_checkbox')
    let DOM_radio = document.getElementsByClassName('radio_input')


    let img_button_class = document.getElementsByClassName('img_button')

    if (toDo == true) {
        Array.prototype.forEach.call(img_button_class, (element) => { element.style.display = "none" })
        Array.prototype.forEach.call(DOM_checkbox, (element) => { element.style.pointerEvents = "none" })
        Array.prototype.forEach.call(DOM_radio, (element) => { element.style.pointerEvents = "none" })

    } else if (toDo == false) {
        Array.prototype.forEach.call(img_button_class, (element) => { element.style.display = "inline" })
        Array.prototype.forEach.call(DOM_checkbox, (element) => { element.style.pointerEvents = "auto" })
        Array.prototype.forEach.call(DOM_radio, (element) => { element.style.pointerEvents = "auto" })

    }

}

function loadXML_ICD() {
    const oXHR = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    function reportStatus() {
        if (oXHR.readyState == 4) {
            showTheList(this.responseXML);      // Now show the data.
        }
    }
    oXHR.onreadystatechange = reportStatus;
    oXHR.open("GET", "XML/ICD.xml", true);
    // true = asynchronous request (desirable), false = synchronous request.
    oXHR.send();

    function showTheList(xml) {
        let XML_list = xml.getElementsByTagName('diag');
        for (let i = 0; i < XML_list.length; i++) {
            array_ICD10.push(`${XML_list[i].getElementsByTagName('name')[0].innerHTML}:: ${XML_list[i].getElementsByTagName('desc')[0].innerHTML}`)
        }
    }
}

function transformToAssocArray(prmstr) {
    var params = {};
    var prmarr = prmstr.substring(1).split("&");
    for (var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}
// *****************************   MongoDB Tools   *****************************

function find_home_mongoDB(id, version) {
    var xmlhttp = new XMLHttpRequest();
    let params = 'item=active&value=yes';
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let results_JSON = JSON.parse(this.responseText);
            document.getElementById('home_td1').innerHTML = ""

            for (let i = 0; i < Object.keys(results_JSON).length; i++) {
                let link = document.createElement('li')
                link.setAttribute('class', 'home_link')
                link.setAttribute('id', `home_link_id${results_JSON[i]['calculator_id']}`)
                let text_name = document.createTextNode(`${results_JSON[i]['mainName']} (Vers.${results_JSON[i]['lastVersion']})`)
                let params_link = `calculator_id=${results_JSON[i]['calculator_id']}&version=${results_JSON[i]['lastVersion']}`
                link.appendChild(text_name)
                document.getElementById('home_td1').appendChild(link)
                document.getElementById(`home_link_id${results_JSON[i]['calculator_id']}`).addEventListener('click', function () { changePage(`calculator`, params_link, '') })
            }

        }
    };
    xmlhttp.open("POST", "mongodb/find_home.php", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
}


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

function testMongoDB() {
    var xmlhttp = new XMLHttpRequest();
    let params = `id=1&version=1`
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText)
            let results_findOne = JSON.parse(this.responseText);
            console.log(results_findOne)
        }
    };
    xmlhttp.open("POST", "mongodb/test.php", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);

}

function deleteAllMongoDB() {
    var xmlhttp = new XMLHttpRequest();
    let params = `id=1&version=1`
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
        }
    };
    xmlhttp.open("POST", "mongodb/delete_all.php", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
}

//************************ Loading Page Calculator *****************************


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
    document.getElementById(`radio_input_0`).addEventListener('change', function (event) { click_radio_input(event) })
    document.getElementById(`checkbox_multiple_input_1`).addEventListener('change', (event) => {
        if (document.getElementById(`checkbox_multiple_input_1`).checked == true) {
            document.getElementById(`checkbox_input_1`).disabled = true
        } else {
            document.getElementById(`checkbox_input_1`).disabled = false
        }
    })

    id_POST = document.getElementById('input_hidden_POST_id').value
    version_POST = document.getElementById('input_hidden_POST_version').value
    if (paramsJS != "newCalculator") { findOne_Calculator_mongoDB(id_POST, version_POST) }
    document.getElementById(`radio_input_1`).dataset.id = 1
}

function importing_calculator(results_findOne) {
    console.log(results_findOne['modifiers'][0])
    document.getElementById('input_maindiagnose').value = results_findOne['mainName']
    document.getElementById('input_calculator_id').value = results_findOne['calculator_id']
    document.getElementById('input_EDG_id').value = results_findOne['EDG_id']
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

    //desactivate edit if not last version
    if (results_findOne['version'] != results_findOne['lastVersion']) {
        console.log('test')
        document.getElementById('button_edit_calculator').disabled = true
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

    //Update inputs
    /*
    let inputs_Submodifier = Object.entries(results_findOne['inputs'])
    let inputs_SNOMED = Object.entries(results_findOne['SNOMED'])
    let inputs_ICD = Object.entries(results_findOne['ICD'])
*/
    let modifiers_array = results_findOne['modifiers']
    console.log(modifiers_array)
    console.log(modifiers_array[0])
    console.log(modifiers_array[0]['modifier_array'])

    for (i = 1; i <= results_findOne['modifier_nbr']; i++) {
        for (k = 1; k <= results_findOne['modifierSub_nbr']; k++) {
            document.getElementById(`input${i}_${k}`).value = modifiers_array[i - 1]['modifier_array'][k - 1]
            document.getElementById(`inputSNOMED${i}_${k}`).value = modifiers_array[i - 1]['SNOMED_array'][k - 1]
            document.getElementById(`inputICD${i}_${k}`).value = modifiers_array[i - 1]['ICD_array'][k - 1]
        }
    }

    if (results_findOne['parameters'][`radio_input`] != null) { document.getElementById(`radio_input_${results_findOne['parameters'][`radio_input`]}`).click() }

    disable_input(true)

    printing_calculator_output(output_array)
}

function edit_calculator() {
    confirmBeforeNavigate = 1
    console.log('test edit')
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
    /* //disable button from selected radio
    for (let i = 1; i < modifier_nbr; i++) {
        if (document.getElementById(`radio_input_${i}`).checked == true) { document.getElementById(`radio_input_0`).click(); document.getElementById(`radio_input_${i}`).click(); }
        if (document.getElementById(`checkbox_multiple_input_${i}`).checked == true) {
            document.getElementById(`checkbox_input_${i}`).disabled = true
        } else {
            document.getElementById(`checkbox_input_${i}`).disabled = false
        }
    }
    */
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


    // Create Modifier Title
    let column_input_title = document.createElement('td')
    let insert_column_image = document.createElement('img')
    insert_column_image.src = "img/add.png"
    insert_column_image.setAttribute("class", "img_button")
    insert_column_image.setAttribute("id", `img_button_insert_column${modifier_nbr_new}`)
    let input_title_span = document.createElement('span')
    input_title_span.appendChild(document.createTextNode(`Modifier ${modifier_nbr_new}`))
    input_title_span.setAttribute('class', 'input_title input_readonly')
    column_input_title.appendChild(insert_column_image)
    column_input_title.appendChild(input_title_span)

    document.getElementById('tr_input_title').appendChild(column_input_title)
    document.getElementById(`img_button_insert_column${modifier_nbr_new}`).addEventListener('click', () => { addInputColumn('', modifier_nbr_new) })



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
            document.getElementById(`checkbox_input_${radio_input_id}`).disabled = true
            document.getElementById(`checkbox_multiple_input_${radio_input_id}`).disabled = true
            document.getElementById(`checkbox_input_${radio_input_id}`).checked = false
            document.getElementById(`checkbox_multiple_input_${radio_input_id}`).checked = false
            array_hiden_ID = radio_input_id
        }
    }
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
    console.log(array_inputs_value, array_SNOMED_value, array_ICD_value, array_inputs_modifierNbr, array_modifier_isMain, array_inputs_itemNbr)
    output_array = []
    array_calculator_inputs_modifierNbr = array_inputs_modifierNbr.length  //give the number of array (modifier_nbr + multiple)
    document.getElementById('table_output_calculator').innerHTML = "";

    var array_iterate = []
    var itteration_id = array_calculator_inputs_modifierNbr - 1
    for (let i = 0; i < array_calculator_inputs_modifierNbr; i++) { array_iterate.push('0') }


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
        calculated_diag = calculated_diag.replace(/\s+/g, ' ').trim()
        calculated_diag = calculated_diag.charAt(0).toUpperCase() + calculated_diag.slice(1)
        output_array.push([calculated_diag, calculated_SNOMED, calculated_ICD, calculated_modifier])
        console.log([calculated_diag, calculated_SNOMED, calculated_ICD, calculated_modifier])


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
    disable_input(true)
    console.log(output_array)
    printing_calculator_output(output_array)
}

function creating_XML(output_array_f) {
    let XML_output = XML_beginn

    output_array_f.forEach((element) => {
        XML_output = XML_output + createXML(`MedSp_Id_${EDG_id_iterate}`, 'MedSP', element[0], 'Created by MedSP', JSON.stringify(element[2]))
    })

    document.getElementById('input_hidden_XML_output').value = XML_output

    // finalize XML
    XML_output = XML_output + XML_End
    document.getElementById('input_XML').value = XML_output
    return XML_output
}

function creating_TXT(output_array_f) {
    let TXT_output = TXT_beginn

    output_array_f.forEach((element) => {
        TXT_output = TXT_output + createFlatFile(`MedSP_Id_${EDG_id_iterate}`, 'MedSP', element[0], 'Created by MedSP', JSON.stringify(element[2]))
    })

    document.getElementById('input_hidden_TXT_output').value = TXT_output

    // finalize TXT
    document.getElementById('input_TXT').value = TXT_output
    return TXT_output

}

function printing_calculator_output(output_array_f) {
    var EDG_id_iterate = document.getElementById('input_EDG_id').value
    var EDG_id_iterate_nbr = 0

    output_array_f.forEach((element) => {

        EDG_id_iterate++
        EDG_id_iterate_nbr++

        let row_output_calculator = document.createElement('tr')
        let row_output_EDGId_column = document.createElement('td')
        let row_output_calculator_column = document.createElement('td')
        let row_output_calculator_SNOMED_column = document.createElement('td')
        let row_output_calculator_ICD_column = document.createElement('td')

        row_output_EDGId_column.appendChild(document.createTextNode(`MedSP_TERM_${EDG_id_iterate}`));
        row_output_calculator_column.appendChild(document.createTextNode(element[0]));
        row_output_calculator_SNOMED_column.appendChild(document.createTextNode(JSON.stringify(element[1])));
        row_output_calculator_ICD_column.appendChild(document.createTextNode(JSON.stringify(element[2])));

        row_output_calculator.appendChild(row_output_EDGId_column)
        row_output_calculator.appendChild(row_output_calculator_column)
        row_output_calculator.appendChild(row_output_calculator_SNOMED_column)
        row_output_calculator.appendChild(row_output_calculator_ICD_column)
        document.getElementById('table_output_calculator').appendChild(row_output_calculator);
    })

    // update hidden input for Database save
    document.getElementById('input_hidden_array_output').value = JSON.stringify(output_array)

    //update total count
    document.getElementById('total_count').style.display = "block"
    document.getElementById('total_count').innerHTML = `Total Count: ${EDG_id_iterate_nbr}`;

}


function createFlatFile(ID_Term, DiagnosisVendor, DiagnosisDescription, ContactComment, ICD) {
    return TXT_temp = `1,${ID_Term}\n2,${DiagnosisVendor}\n3,${DiagnosisDescription}\n35,${ID_Term}\n4000,ICD-10-GM\n4005,${ICD}\n`
}

function createXML(ID_Term, DiagnosisVendor, DiagnosisDescription, ContactComment, ICD) {
    return XML_temp = `            
    <ss:Row>
    <ss:Cell>
        <ss:Data ss:Type="String">${ID_Term}</ss:Data>
    </ss:Cell>
    <ss:Cell>
        <ss:Data ss:Type="String">${DiagnosisVendor}</ss:Data>
    </ss:Cell>
    <ss:Cell>
        <ss:Data ss:Type="String">${DiagnosisDescription}</ss:Data>
    </ss:Cell>
    <ss:Cell>
        <ss:Data ss:Type="String">${ContactComment}</ss:Data>
    </ss:Cell>
    <ss:Cell></ss:Cell>
    <ss:Cell></ss:Cell>
    <ss:Cell>
        <ss:Data ss:Type="String">Herzinsuff</ss:Data>
    </ss:Cell>
    <ss:Cell></ss:Cell>
    <ss:Cell>
        <ss:Data ss:Type="String">BEGRIFF</ss:Data>
    </ss:Cell>
    <ss:Cell>
        <ss:Data ss:Type="String">ICD-10-GM</ss:Data>
    </ss:Cell>
    <ss:Cell></ss:Cell>
    <ss:Cell></ss:Cell>
    <ss:Cell></ss:Cell>
    <ss:Cell>
        <ss:Data ss:Type="String">Nein</ss:Data>
    </ss:Cell>
    <ss:Cell></ss:Cell>
    <ss:Cell></ss:Cell>
    <ss:Cell></ss:Cell>
    <ss:Cell></ss:Cell>
    <ss:Cell></ss:Cell>
    <ss:Cell>
        <ss:Data ss:Type="String">ICD-10-GM</ss:Data>
    </ss:Cell>
    <ss:Cell>
        <ss:Data ss:Type="String">01.01.2018</ss:Data>
    </ss:Cell>
    <ss:Cell></ss:Cell>
    <ss:Cell>
        <ss:Data ss:Type="String">Term : Code</ss:Data>
    </ss:Cell>
    <ss:Cell>
        <ss:Data ss:Type="String">${ICD}</ss:Data>
    </ss:Cell>
    <ss:Cell>
        <ss:Data ss:Type="String">NYHA&#10;Akute Dekompensation</ss:Data>
    </ss:Cell>
    <ss:Cell>
        <ss:Data ss:Type="String">190035&#10;190040&#10;190046&#10;190057&#10;190090</ss:Data>
    </ss:Cell>
    <ss:Cell>
        <ss:Data ss:Type="String">Herzinsuffizienz NYHA I&#10;Herzinsuffizienz NYHA II&#10;Herzinsuffizienz NYHA III&#10;Herzinsuffizienz NYHA IV&#10;Dekompensierte Herzinsuffizienz</ss:Data>
    </ss:Cell>
    <ss:Cell>
        <ss:Data ss:Type="String">NYHA I&#10;NYHA II&#10;NYHA III&#10;NYHA IV&#10;NYHA I&#1;Linkfsführende</ss:Data>
    </ss:Cell>
    <ss:Cell></ss:Cell>
    <ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
    </ss:Row>`
}


loadingIndex()