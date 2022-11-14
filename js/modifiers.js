function loading_page_modifiers() {
    find_modifiers()
    document.getElementById('button_download_modifier_XML').addEventListener('click', function (event) { download_modifier_XML() })
    document.getElementById('button_download_sub_modifier_XML').addEventListener('click', function (event) { download_sub_modifier_XML() })
    document.getElementById('button_download_modifier_TXT').addEventListener('click', function (event) { download_modifier_TXT() })


}

function find_modifiers() {
    var xmlhttp = new XMLHttpRequest();
    let params = '';
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let results_JSON = JSON.parse(this.responseText);
            console.log(results_JSON)
            document.getElementById('modifier_typ_ul').innerHTML = ""
            for (let i = 0; i < Object.keys(results_JSON).length; i++) {
                let element = results_JSON[i]
                let link = document.createElement('div')
                link.setAttribute('class', 'item_flex_modifier')
                link.setAttribute('id', `modifier_link_id_${element['modifier_id']}`)
                let params_link = `calculator_id=${element['calculator_id']}&version=${element['calculator_version']}`
                let text_span = document.createElement('span')
                text_span.appendChild(document.createTextNode(`${element['modifier_name']}`))
                text_span.style.fontWeight="bold"
                link.appendChild(text_span)
                link.appendChild(document.createElement('br'))
                link.appendChild(DOM_create_span_style(`id: ${element['modifier_id']}, DiagCalc: ${element['calculator_name']}(Version:${element['calculator_version']})`,'','italic',''))
                modifier_array_toDownload.push([parseInt(element['modifier_id']), element['modifier_name']])
                //Create Sub                
                element['modifier_array'].forEach((element) => {
                    if (element) {
                        let sub_li = document.createElement('span')
                        sub_li.appendChild(document.createTextNode(element))
                        link.appendChild(DOM_create_span_style(element,'','italic'))
                        sub_modifier_array_toDownload.push([element])
                    }
                })
                document.getElementById('modifier_typ_ul').appendChild(link)
                document.getElementById(`modifier_link_id_${element['modifier_id']}`).addEventListener('click', function () { changePage(`calculator`, params_link, '') })
            }
            modifier_array_toDownload.sort((a, b) => a[0] - b[0]);
            console.log(modifier_array_toDownload)
        }
    };
    xmlhttp.open("POST", "mongodb/find_modifiers.php", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
}


/* ******************* Download ************************************/

async function download_modifier_XML() {
    if (modifier_array_toDownload) {
        await creating_modifier_XML(modifier_array_toDownload)
        document.getElementById('button_download_modifier_XML_submit').click()

    } else {
        alert('Error, no file to download, please contact the administrator')
    }
}


async function creating_modifier_XML(output_array_f) {
    let XML_modifier_output = XML_modifier_beginn

    output_array_f.forEach((element) => {
        XML_modifier_output = XML_modifier_output + create_modifier_XML_row(element[0], element[1])
    })

    // finalize XML
    XML_modifier_output = XML_modifier_output + XML_modifier_end
    document.getElementById('input_hidden_modifier_XML').value = XML_modifier_output
    return XML_modifier_output
}

function create_modifier_XML_row(modifier_id, modifier_name) {
    return XML_temp = `            
    <Row>
    <Cell><Data ss:Type="String">${modifier_id}</Data></Cell>
    <Cell><Data ss:Type="String">${modifier_name}</Data></Cell>
    <Cell><Data ss:Type="String">${modifier_id}</Data></Cell>
    <Cell><Data ss:Type="String"></Data></Cell>
    <Cell/>
    <Cell ss:StyleID="s24"/>
   </Row>`
}

async function download_modifier_TXT() {
    if (modifier_array_toDownload) {
        await creating_modifier_TXT(modifier_array_toDownload)
        document.getElementById('button_download_modifier_TXT_submit').click()
    } else {
        alert('Error, no file to download, please contact the administrator')
    }
}

async function creating_modifier_TXT(output_array_f) {
    let TXT_modifier_output = TXT_modifier_beginn
    output_array_f.forEach((element) => {
        TXT_modifier_output = TXT_modifier_output + create_modifier_flatfile_row(element[0], element[1])
    })
    document.getElementById('input_hidden_modifier_TXT').value = TXT_modifier_output
    return TXT_modifier_output
}

function create_modifier_flatfile_row(modifier_id, modifier_name) {
    return TXT_temp = `1,${modifier_id}\n2,${modifier_name}\n`
}

//*** Submodifier ***//
async function download_sub_modifier_XML() {
    if (modifier_array_toDownload) {
        await creating_sub_modifier_XML(modifier_array_toDownload)
        document.getElementById('button_download_sub_modifier_XML_submit').click()

    } else {
        alert('Error, no file to download, please contact the administrator')
    }
}


async function creating_sub_modifier_XML(output_array_f) {
    let XML_sub_modifier_output = XML_sub_modifier_beginn

    output_array_f.forEach((element) => {
        XML_sub_modifier_output = XML_sub_modifier_output + create_sub_modifier_XML_row(element[0], element[1])

    })

    // finalize XML
    XML_sub_modifier_output = XML_sub_modifier_output + XML_sub_modifier_end
    document.getElementById('input_hidden_sub_modifier_XML').value = XML_sub_modifier_output
    return XML_sub_modifier_output
}

function create_sub_modifier_XML_row(sub_modifier_id, sub_modifier_name) {
    return XML_temp = `            
        <ss:Row>
        <ss:Cell>
            <ss:Data ss:Type="String">${sub_modifier_id}</ss:Data>
        </ss:Cell>
        <ss:Cell>
        <ss:Data ss:Type="String">${sub_modifier_name}</ss:Data>
        </ss:Cell>
        </ss:Row>`
}


