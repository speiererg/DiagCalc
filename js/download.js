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
main_Diagnostic = output_array_f.shift();
console.log(main_Diagnostic)
XML_output = XML_output + createXMLRow(`MedSp_Id_${main_Diagnostic['medsp_term']}`, 'MedSP', main_Diagnostic['diagnostic_name'], 'Created by MedSP', JSON.stringify(main_Diagnostic['ICD_array']))


    // append Specific Diagnostic
    output_array_f.forEach((element) => {
        XML_output = XML_output + createXMLRow(`MedSp_Id_${element['medsp_term']}`, 'MedSP', element['diagnostic_name'], 'Created by MedSP', JSON.stringify(element['ICD_array']))
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

function createXMLRow(ID_Term, DiagnosisVendor, DiagnosisDescription, ContactComment, ICD) {
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


