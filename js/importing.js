function loading_page_importing() {
    find_importing_mongoDB('ready_import')
    document.getElementById('button_download_diagCalc_ready_import_XML').addEventListener('click', function () { download_importing_calc_XML() })
    ready_import_id_array = []
    var XML_output=""
}

function find_importing_mongoDB(request) {
    var xmlhttp = new XMLHttpRequest();
    let params = `request=${request}`;
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let results_JSON = JSON.parse(this.responseText);
            document.getElementById('importing_diagnostic_ul').innerHTML = ""

            for (let i = 0; i < Object.keys(results_JSON).length; i++) {
                ready_import_id_array.push(results_JSON[i]['calculator_id'])
                let link = document.createElement('li')
                link.setAttribute('class', 'home_link')
                link.setAttribute('id', `home_link_id${results_JSON[i]['calculator_id']}`)
                let text_name = document.createTextNode(`${results_JSON[i]['mainName']} (Id:${results_JSON[i]['calculator_id']} Vers.${results_JSON[i]['lastVersion']})`)
                let params_link = `calculator_id=${results_JSON[i]['calculator_id']}&version=${results_JSON[i]['lastVersion']}`
                link.appendChild(text_name)
                document.getElementById('importing_diagnostic_ul').appendChild(link)
                document.getElementById(`home_link_id${results_JSON[i]['calculator_id']}`).addEventListener('click', function () { changePage(`calculator`, params_link, '') })
            }


        }
    };
    xmlhttp.open("POST", "mongodb/find_home.php", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
}


// *********************** DOWNLOAD ***********************************/

async function download_importing_calc_XML() {
        await get_array_download_diag_calc_ready(ready_import_id_array)
}


async function get_array_download_diag_calc_ready(id_array) {
    var xmlhttp = new XMLHttpRequest();
    let params = `calculator_id_array=${id_array}`;
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let results_JSON = JSON.parse(this.responseText);
            let array_output_array = []
            results_JSON.forEach((element) => {
                array_output_array.push(element['output_array'])
            })
            creating_diag_calc_ready_XML(array_output_array)
        }
    };
    xmlhttp.open("POST", "mongodb/find_calculator_output_array.php", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
    console.log()
}

async function creating_diag_calc_ready_XML(array_output_array_f) {
    var XML_output = XML_calculator_beginn

 


    async function create_one_calc_XML(output_array_f) {
        //append main Diagnostic
        let allowed_modifier_4040 = ""
        let resolved_term_4043 = ""
        let resolved_term_name_4043dot = ""
        let modifier_values_4044 = ""


        main_Diagnostic = output_array_f.shift();

        async function create_array_main_diagnosis(output_array_f) {
            output_array_f.forEach((element) => {
                for (let l = 0, modifier_length = element['modifier_array'].length; l < modifier_length; l++) {
                    modifier_values_4044 = modifier_values_4044 + element['modifier_array'][l]
                    if (l != modifier_length - 1) { modifier_values_4044 = modifier_values_4044 + Code_ModifierSeparator }

                }
                modifier_values_4044 = modifier_values_4044 + Code_Return
                resolved_term_4043 = resolved_term_4043 + `medsp_id_${element['medsp_id']}` + Code_Return
                resolved_term_name_4043dot = resolved_term_name_4043dot + element['diagnostic_name'] + Code_Return
            })
            /*for (let i = 1; i <= modifier_nbr; i++) {
                let modifier_name = document.getElementById(`input_modifier_title_${i}`).value
                if (document.getElementById(`radio_input_${i}`).checked == false) {
                    allowed_modifier_4040 = allowed_modifier_4040 + modifier_name + Code_Return
                }
            }
            */
        }

        async function create_rest_XML() {
            await (create_array_main_diagnosis(output_array_f))
            XML_output = XML_output + createXMLRow(`medsp_id_${main_Diagnostic['medsp_id']}`, 'MedSP', main_Diagnostic['diagnostic_name'], 'Created by MedSP', JSON.stringify(main_Diagnostic['ICD_array']), allowed_modifier_4040, resolved_term_4043, resolved_term_name_4043dot, modifier_values_4044)
            // append Specific Diagnostic
            output_array_f.forEach((element) => {
                XML_output = XML_output + createXMLRow(`medsp_id_${element['medsp_id']}`, 'MedSP', element['diagnostic_name'], 'Created by MedSP', JSON.stringify(element['ICD_array']), '', '', '', '')
            })

            // finalize XML
            return XML_output
        }
        await create_rest_XML()
    }

    async function general_XML_creation(){
        array_output_array_f.forEach((element) => {
            await create_one_calc_XML(element)
        })   
    }

    await general_XML_creation()
    XML_output = XML_output + XML_calculator_end
    document.getElementById('input_hidden_diag_calc_XML').value = XML_output
    console.log(XML_output)
    document.getElementById('button_download__diagCalc_ready_import_XML_submit').click()

}