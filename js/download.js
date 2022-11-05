/*           ************************** Downloading/Creating XML+TXT ************************      */



function download_XML(){
    if(output_array){
        creating_XML(output_array)
    }else{
        alert('Please calculate the DiagCalc and save it once again before exporting')
    }
    }
    
    function download_TXT(){
        if(output_array){
            creating_TXT(output_array)
            document.getElementById('button_download_TXT_submit').addEventListener('')
        }else{
            alert('Please calculate the DiagCalc and save it once again before exporting')
        }
    }
    
    
    function creating_XML(output_array_f) {
        let XML_output = XML_beginn
    
        output_array_f.forEach((element) => {
            XML_output = XML_output + createXMLRow(`MedSp_Id_${EDG_id_iterate}`, 'MedSP', element[0], 'Created by MedSP', JSON.stringify(element[2]))
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
            TXT_output = TXT_output + createFlatFileRow(`MedSP_Id_${EDG_id_iterate}`, 'MedSP', element[0], 'Created by MedSP', JSON.stringify(element[2]))
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
    
    
