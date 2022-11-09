/*           ************************** Downloading/Creating XML+TXT ************************      */



async function download_XML() {
    console.log('download XML')
    if (output_array) {
        await creating_XML(output_array)
        console.log(document.getElementById('button_download_XML_submit'))
        document.getElementById('button_download_XML_submit').click()

    } else {
        alert('Please calculate the DiagCalc and save it once again before exporting')
    }
}

async function download_TXT() {
    if (output_array) {
        await creating_TXT(output_array)
        document.getElementById('button_download_TXT_submit').click()
    } else {
        alert('Please calculate the DiagCalc and save it once again before exporting')
    }
}


async function creating_XML(output_array_f) {
    console.log(output_array_f)
    let XML_output = XML_beginn

    //append main Diagnostic
    let allowed_modifier_4040 = ""
    let resolved_term_4043 = ""
    let resolved_term_name_4043dot = ""
    let modifier_values_4044 = ""


    main_Diagnostic = output_array_f.shift();
    output_array_f.forEach((element) => {
        for(let l=0, modifier_length=element['modifier_array'].length;i<modifier_length;i++)
        {
            modifier_values_4044 = modifier_values_4044 + element['modifier_array'][l] 
            if (l != modifier_length -1){modifier_values_4044 = modifier_values_4044 + Code_ModifierSeparator}
        }
        modifier_values_4044 = modifier_values_4044 + Code_Return
        resolved_term_4043 = resolved_term_4043 + `medsp_id_${element['medsp_id']}` + Code_Return
        resolved_term_name_4043dot = resolved_term_name_4043dot + element['diagnostic_name'] + Code_Return
        modifier_values_4044 = modifier_values_4044
        console.log(element['modifier_array'])
    })
    XML_output = XML_output + createXMLRow(`medsp_id_${main_Diagnostic['medsp_id']}`, 'MedSP', main_Diagnostic['diagnostic_name'], 'Created by MedSP', JSON.stringify(main_Diagnostic['ICD_array']), resolved_term_4043, resolved_term_name_4043dot, modifier_values_4044)


    // append Specific Diagnostic
    output_array_f.forEach((element) => {
        XML_output = XML_output + createXMLRow(`medsp_id_${element['medsp_id']}`, 'MedSP', element['diagnostic_name'], 'Created by MedSP', JSON.stringify(element['ICD_array']), '', '', '')
    })

    document.getElementById('input_hidden_XML_output').value = XML_output

    // finalize XML
    XML_output = XML_output + XML_End
    document.getElementById('input_XML').value = XML_output
    return XML_output
}

async function creating_TXT(output_array_f) {
    let TXT_output = TXT_beginn

    output_array_f.forEach((element) => {
        TXT_output = TXT_output + createFlatFileRow(`MedSP_Id_X`, 'MedSP', element[0], 'Created by MedSP', JSON.stringify(element[2]))
    })

    document.getElementById('input_hidden_TXT_output').value = TXT_output

    // finalize TXT
    document.getElementById('input_TXT').value = TXT_output
    return TXT_output

}

function createFlatFileRow(ID_Term, DiagnosisVendor, DiagnosisDescription, ContactComment, ICD) {
    return TXT_temp = `1,${ID_Term}\n2,${DiagnosisVendor}\n3,${DiagnosisDescription}\n35,${ID_Term}\n4000,ICD-10-GM\n4005,${ICD}\n`
}

function createXMLRow(ID_Term, DiagnosisVendor, DiagnosisDescription, ContactComment, ICD, resolved_term_4043_f, resolved_term_name_4043dot_f, modifier_values_4044_f) {
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
            <ss:Data ss:Type="String">${resolved_term_4043_f}</ss:Data>
        </ss:Cell>
        <ss:Cell>
            <ss:Data ss:Type="String">${resolved_term_name_4043dot_f}</ss:Data>
        </ss:Cell>
        <ss:Cell>
            <ss:Data ss:Type="String">${modifier_values_4044_f}</ss:Data>
        </ss:Cell>
        <ss:Cell></ss:Cell>
        <ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
        </ss:Row>`
}


