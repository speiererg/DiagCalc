var modifier_nbr = 3
var modifierSub_nbr = 4
var array_inputs_value = [];
var array_inputs_itemNbr = [];
var array_calculator = [];
var array_hiden_ID = "";

// Loading 
function loadingIndex() {
    document_addeventlistener()
}

function document_addeventlistener() {
    document.getElementById('button_calculate').addEventListener('click', click_calculate)
    document.getElementById('img_button_add_row').addEventListener('click', addInputRow)
    document.getElementById('img_button_add_column').addEventListener('click', addInputColumn)


    for (let i = 0; i <= modifier_nbr; i++) {
        document.getElementById(`radio_input_${i}`).addEventListener('click', function () { click_radio_input(i) })
    }
}

function click_radio_input(radio_input_id) {
    console.log(radio_input_id)
    if (array_hiden_ID != "") {
        document.getElementById(`checkbox_input_${array_hiden_ID}`).disabled = false
        document.getElementById(`checkbox_input_${array_hiden_ID}`).checked = true
        for (let i = 2; i <= modifierSub_nbr; i++) { document.getElementById(`input${array_hiden_ID}_${i}`).style.display = "block" }
    }
    if (radio_input_id != "0") {
        for (let i = 2; i <= modifierSub_nbr; i++) {
            document.getElementById(`input${radio_input_id}_${i}`).style.display = "none";
            document.getElementById(`input${radio_input_id}_${i}`).value = ""
            document.getElementById(`checkbox_input_${radio_input_id}`).disabled = true
            document.getElementById(`checkbox_input_${radio_input_id}`).checked = false
            array_hiden_ID = radio_input_id
        }
    }
}

function click_calculate() {
    array_inputs_value = [];
    array_inputs_itemNbr = [];
    array_calculator = [];
    for (let i = 1; i <= modifier_nbr; i++) {
        let array_inputs_oneModifier = [];
        let item_nbr = 0
        let modifierSub_iterate = 1
        console.log(`checkbox_input_${i}`)
        if (document.getElementById(`checkbox_input_${i}`).checked == true && document.getElementById(`radio_input_${i}`).checked == false) {
            modifierSub_iterate = 0
        }
        for (let k = modifierSub_iterate; k <= modifierSub_nbr; k++) {
            if (k == 0) {
                item_nbr++
                array_inputs_oneModifier.push('')
            } else {
                let input_value = document.getElementById(`input${i}_${k}`).value
                if (input_value != '') {
                    item_nbr++
                    array_inputs_oneModifier.push(input_value)

                }

            }
        }
        array_inputs_itemNbr.push(item_nbr)
        array_inputs_value.push(array_inputs_oneModifier);
    }

    // Creation du array_Calculator
    array_calculator.unshift(1)
    for (let i = modifier_nbr; i > 1; i--) {
        array_calculator.unshift(array_calculator[0] * array_inputs_itemNbr[i - 1])
    }
    create_calculator_output();
}


function create_calculator_output() {
    document.getElementById('table_output_calculator').innerHTML = "";

    var array_iterate = []
    var itteration_id = modifier_nbr - 1
    for (let i = 0; i < modifier_nbr; i++) { array_iterate.push('0') }

    // Send XML
    console.log('send XML')
    XML_output = XML_Beginn

    // Creation of Items
    let array_item0 = array_inputs_itemNbr[0]
    array_inputs_itemNbr[0]++
    while (array_iterate[0] < array_item0) {
        var calculated_diag = ""
        for (let i0 = 0; i0 < modifier_nbr; i0++) {
            calculated_diag = calculated_diag + `${array_inputs_value[i0][array_iterate[i0]]} `
        }
        calculated_diag = calculated_diag.replace(/\s+/g, ' ').trim()
        let row_output_calculator = document.createElement('tr')
        let row_output_calculator_Column = document.createElement('td')
        row_output_calculator_Column.appendChild(document.createTextNode(calculated_diag));
        row_output_calculator.appendChild(row_output_calculator_Column)
        document.getElementById('table_output_calculator').appendChild(row_output_calculator);


        // Append to XML
        console.log(calculated_diag)
        XML_output = XML_output + createXML('ID_TERM_1234', 'MedSP', calculated_diag, 'Created by MedSP')


        // Array Calculation
        if (array_iterate[itteration_id] < (array_inputs_itemNbr[itteration_id] - 1)) {
            array_iterate[itteration_id]++
        } else {
            if (array_iterate[0] < (array_inputs_itemNbr[0] - 1)) {
                for (let test_id = 0, id_increment = 1; test_id <= modifier_nbr; id_increment++) {
                    array_iterate[modifier_nbr - id_increment] = 0
                    if (array_iterate[itteration_id - id_increment] < (array_inputs_itemNbr[itteration_id - id_increment] - 1)) {
                        array_iterate[itteration_id - id_increment]++
                        test_id = modifier_nbr + 1
                    }
                    test_id++
                }
            }
        }

    }

    // finalize XML

    XML_output = XML_output + XML_End
    document.getElementById('input_XML').value = XML_output
}

function addInputRow() {
    let row_input = document.createElement('tr')
    row_input.setAttribute('id', `tr_input_${modifierSub_nbr + 1}`)
    for (let i = 0; i < modifier_nbr; i++) {
        let column_input = document.createElement('td')
        let input_input = document.createElement('input')
        input_input.setAttribute('id', `input${i + 1}_${modifierSub_nbr + 1}`);
        input_input.setAttribute('class', `input_modifier`);
        if (document.getElementById(`radio_input_${i + 1}`).checked == true) { input_input.setAttribute("style", "display:none") }
        column_input.appendChild(input_input)

        row_input.appendChild(column_input)
    }
    document.getElementById('table_input').appendChild(row_input)
    modifierSub_nbr++
}

function addInputColumn() {
    console.log('add column')
    let input_radio = document.createElement('input');
    input_radio.setAttribute('type', 'radio')
    input_radio.setAttribute('name', 'radio_input')
    input_radio.setAttribute('class', 'radio_input')
    input_radio.setAttribute('value', `${modifier_nbr + 1}`)
    input_radio.setAttribute('id', `radio_input_${modifier_nbr + 1}`)
    let column_input_radio = document.createElement('td')
    column_input_radio.appendChild(input_radio);
    column_input_radio.appendChild(document.createTextNode("Main"))
    document.getElementById('tr_input_radio').appendChild(column_input_radio)

    // Create Modifier Title
    let column_input_title = document.createElement('td')
    column_input_title.appendChild(document.createTextNode(`Modifier ${modifier_nbr + 1}`))
    document.getElementById('tr_input_title').appendChild(column_input_title)


    //Create Select
    let column_input_select = document.createElement('td')
    let input_select = document.createElement('select');
    input_select.setAttribute('id', `select_input_${modifier_nbr + 1}`)
    input_select.setAttribute('class', `input_select`)
    input_select.innerHTML = "<?php include 'include/select_input.php' ?>"
    column_input_select.appendChild(input_select)
    document.getElementById('tr_input_separator').appendChild(column_input_select)

    // Checkbox Not Required
    let input_checkbox = document.createElement('input');
    input_checkbox.setAttribute('type', 'checkbox')
    input_checkbox.setAttribute('checked', 'true')
    input_checkbox.setAttribute('id', `checkbox_input_${modifier_nbr + 1}`)
    input_checkbox.setAttribute('class', `input_checkbox`)
    let column_input_checkbox = document.createElement('td')
    column_input_checkbox.appendChild(input_checkbox);
    column_input_checkbox.appendChild(document.createTextNode("Not Required"))
    document.getElementById('tr_input_checkbox').appendChild(column_input_checkbox)

    //Checkbox Multiple
    let input_multiple_checkbox = document.createElement('input');
    input_multiple_checkbox.setAttribute('type', 'checkbox')
    input_multiple_checkbox.setAttribute('checked', 'false')
    input_multiple_checkbox.setAttribute('id', `checkbox_multiple_input_${modifier_nbr + 1}`)
    input_multiple_checkbox.setAttribute('class', `input_checkbox`)
    let column_input_multiple_checkbox = document.createElement('td')
    column_input_multiple_checkbox.appendChild(input_multiple_checkbox);
    column_input_multiple_checkbox.appendChild(document.createTextNode("Multiple"))
    document.getElementById('tr_input_multiple_checkbox').appendChild(column_input_multiple_checkbox)


    console.log(modifierSub_nbr)
    for (let i = 0; i < modifierSub_nbr; i++) {
        let column_input = document.createElement('td')
        let input_input = document.createElement('input')
        input_input.setAttribute('id', `input${modifier_nbr + 1}_${i + 1}`);
        input_input.setAttribute('class', `input_modifier`);
        column_input.appendChild(input_input)
        document.getElementById(`tr_input_${i + 1}`).appendChild(column_input)
    }
    modifier_nbr++
    document.getElementById(`radio_input_${modifier_nbr}`).addEventListener('click', function () { click_radio_input(modifier_nbr) })

}



function createXML(ID_Term, DiagnosisVendor, DiagnosisDescription, ContactComment) {
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
        <ss:Data ss:Type="String">I50.01</ss:Data>
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





var XML_Beginn = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:x2="http://schemas.microsoft.com/office/excel/2003/xml" xmlns:dt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:s="uuid:BDC6E3F0-6DA3-11d1-A2A3-00AA00C14882" xmlns:z="#RowsetSchema" xmlns:udc="http://schemas.microsoft.com/data/udc" xmlns:udcs="http://schemas.microsoft.com/data/udc/soap" xmlns:udcxf="http://schemas.microsoft.com/data/udc/xmfile" xmlns:c="urn:schemas-microsoft-com:office:component:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">
    <OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office">
        <DownloadComponents />
    </OfficeDocumentSettings>
    <ss:Styles>
        <ss:Style ss:ID="BrdrLftWrp">
            <ss:Alignment ss:Vertical="Top" ss:WrapText="1" />
            <ss:Borders>
                <ss:Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" />
            </ss:Borders>
            <ss:NumberFormat ss:Format="@" />
        </ss:Style>
        <ss:Style ss:ID="BrdrLftWrpAlt">
            <ss:Alignment ss:Vertical="Top" ss:WrapText="1" />
            <ss:Borders>
                <ss:Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" />
            </ss:Borders>
            <ss:Interior ss:Color="#B2B2B2" ss:Pattern="Solid" />
            <ss:NumberFormat ss:Format="@" />
        </ss:Style>
        <ss:Style ss:ID="BrdrRtWrp">
            <ss:Alignment ss:Vertical="Top" ss:WrapText="1" />
            <ss:Borders>
                <ss:Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" />
            </ss:Borders>
            <ss:NumberFormat ss:Format="@" />
        </ss:Style>
        <ss:Style ss:ID="BrdrRtWrpAlt">
            <ss:Alignment ss:Vertical="Top" ss:WrapText="1" />
            <ss:Borders>
                <ss:Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" />
            </ss:Borders>
            <ss:Interior ss:Color="#B2B2B2" ss:Pattern="Solid" />
            <ss:NumberFormat ss:Format="@" />
        </ss:Style>
        <ss:Style ss:ID="DataAlternate">
            <ss:Alignment ss:Vertical="Top" />
            <ss:Interior ss:Color="#B2B2B2" ss:Pattern="Solid" />
            <ss:NumberFormat ss:Format="@" />
            <ss:Protection ss:Protected="0" />
        </ss:Style>
        <ss:Style ss:ID="DataBasic">
            <ss:Alignment ss:Vertical="Top" />
            <ss:NumberFormat ss:Format="@" />
            <ss:Protection ss:Protected="0" />
        </ss:Style>
        <ss:Style ss:ID="DataTxtWrap">
            <ss:Alignment ss:Vertical="Top" ss:WrapText="1" />
            <ss:NumberFormat ss:Format="@" />
            <ss:Protection ss:Protected="0" />
        </ss:Style>
        <ss:Style ss:ID="DefColTop">
            <ss:Alignment ss:Vertical="Top" />
            <ss:NumberFormat ss:Format="@" />
        </ss:Style>
        <ss:Style ss:ID="Default">
            <ss:Alignment ss:Vertical="Bottom" />
            <ss:Font ss:Size="8" />
            <ss:NumberFormat ss:Format="@" />
        </ss:Style>
        <ss:Style ss:ID="FirstRowBrd">
            <ss:Alignment ss:Vertical="Top" />
            <ss:Borders>
                <ss:Border ss:Position="Top" ss:Color="#000000" ss:LineStyle="Continuous" ss:Weight="2" />
            </ss:Borders>
            <ss:NumberFormat ss:Format="@" />
        </ss:Style>
        <ss:Style ss:ID="HdrBluBack">
            <ss:Alignment ss:Horizontal="Center" />
            <ss:Font ss:Size="8" />
            <ss:Interior ss:Color="#BDD7EE" ss:Pattern="Solid" />
        </ss:Style>
        <ss:Style ss:ID="HdrCatHlpRow">
            <ss:Font ss:Color="#999999" />
            <ss:Interior ss:Color="#999999" ss:Pattern="Solid" />
            <ss:Protection ss:Protected="0" />
        </ss:Style>
        <ss:Style ss:ID="HdrItmRow">
            <ss:Alignment ss:Vertical="Top" ss:WrapText="1" />
            <ss:Font ss:Size="10" />
            <ss:Interior ss:Color="#CC99FF" ss:Pattern="Solid" />
        </ss:Style>
        <ss:Style ss:ID="HdrReqRow">
            <ss:Alignment ss:Horizontal="Center" ss:Vertical="Center" />
            <ss:Font ss:Bold="1" ss:Color="#9A000E" />
            <ss:Interior ss:Color="#BDD7EE" ss:Pattern="Solid" />
            <ss:NumberFormat ss:Format="@" />
        </ss:Style>
        <ss:Style ss:ID="HdrReqRowNot">
            <ss:Alignment ss:Horizontal="Center" ss:Vertical="Center" />
            <ss:Font ss:Color="#9A000E" />
            <ss:Interior ss:Color="#BDD7EE" ss:Pattern="Solid" />
            <ss:NumberFormat ss:Format="@" />
        </ss:Style>
        <ss:Style ss:ID="InfoStyle">
            <ss:Alignment ss:Horizontal="Left" />
            <ss:Font ss:FontName="Courier New" ss:Size="12" x:Family="Modern" />
        </ss:Style>
        <ss:Style ss:ID="SolidBlack">
            <ss:Interior ss:Color="#000000" ss:Pattern="Solid" />
            <ss:NumberFormat ss:Format="@" />
            <ss:Protection ss:Protected="1" />
        </ss:Style>
        <ss:Style ss:ID="TransData">
            <ss:Alignment ss:Vertical="Top" ss:WrapText="1" />
            <ss:NumberFormat ss:Format="@" />
            <ss:Protection ss:Protected="0" />
        </ss:Style>
        <ss:Style ss:ID="TransDataAlt">
            <ss:Alignment ss:Vertical="Top" ss:WrapText="1" />
            <ss:Interior ss:Color="#B2B2B2" ss:Pattern="Solid" />
            <ss:NumberFormat ss:Format="@" />
            <ss:Protection ss:Protected="0" />
        </ss:Style>
        <ss:Style ss:ID="TrnsltnInfo">
            <ss:Alignment ss:Vertical="Top" ss:WrapText="1" />
            <ss:Interior ss:Pattern="Gray0625" ss:PatternColor="#000000" />
            <ss:NumberFormat ss:Format="@" />
        </ss:Style>
        <ss:Style ss:ID="TrnsltnInfoAlt">
            <ss:Alignment ss:Vertical="Top" ss:WrapText="1" />
            <ss:Interior ss:Color="#B2B2B2" ss:Pattern="Gray0625" ss:PatternColor="#000000" />
            <ss:NumberFormat ss:Format="@" />
        </ss:Style>
        <ss:Style ss:ID="UnusedSR">
            <ss:Alignment ss:Vertical="Top" />
            <ss:Interior ss:Pattern="Gray0625" ss:PatternColor="#000000" />
            <ss:NumberFormat ss:Format="@" />
        </ss:Style>
        <ss:Style ss:ID="UnusedSRAlt">
            <ss:Alignment ss:Vertical="Top" />
            <ss:Interior ss:Color="#B2B2B2" ss:Pattern="Gray0625" ss:PatternColor="#000000" />
            <ss:NumberFormat ss:Format="@" />
        </ss:Style>
    </ss:Styles>
    <Worksheet ss:Name="EDG export" ss:Protected="0">
        <ss:Table ss:ExpandedColumnCount="30" ss:FullColumns="1" ss:FullRows="1">
            <ss:Column ss:Index="1" ss:StyleID="DataTxtWrap" />
            <ss:Column ss:Index="2" ss:StyleID="DataTxtWrap" />
            <ss:Column ss:Index="3" ss:StyleID="DefColTop" />
            <ss:Column ss:Index="4" ss:StyleID="DefColTop" />
            <ss:Column ss:Index="5" ss:StyleID="DataTxtWrap" />
            <ss:Column ss:Index="6" ss:StyleID="DataTxtWrap" />
            <ss:Column ss:Index="7" ss:StyleID="DataTxtWrap" />
            <ss:Column ss:Index="8" ss:StyleID="DefColTop" />
            <ss:Column ss:Index="9" ss:StyleID="DefColTop" />
            <ss:Column ss:Index="10" ss:StyleID="DefColTop" />
            <ss:Column ss:Index="11" ss:StyleID="DataTxtWrap" />
            <ss:Column ss:Index="12" ss:StyleID="DefColTop" />
            <ss:Column ss:Index="13" ss:StyleID="DefColTop" />
            <ss:Column ss:Index="14" ss:StyleID="DefColTop" />
            <ss:Column ss:Index="15" ss:StyleID="DataTxtWrap" />
            <ss:Column ss:Index="16" ss:StyleID="DataTxtWrap" />
            <ss:Column ss:Index="17" ss:StyleID="DataTxtWrap" />
            <ss:Column ss:Index="18" ss:StyleID="DataTxtWrap" />
            <ss:Column ss:Index="19" ss:StyleID="DefColTop" />
            <ss:Column ss:Index="20" ss:StyleID="DataTxtWrap" />
            <ss:Column ss:Index="21" ss:StyleID="DataTxtWrap" />
            <ss:Column ss:Index="22" ss:StyleID="DataTxtWrap" />
            <ss:Column ss:Index="23" ss:StyleID="DataTxtWrap" />
            <ss:Column ss:Index="24" ss:StyleID="DataTxtWrap" />
            <ss:Column ss:Index="25" ss:StyleID="DataTxtWrap" />
            <ss:Column ss:Index="26" ss:StyleID="DataTxtWrap" />
            <ss:Column ss:Index="27" ss:StyleID="DataTxtWrap" />
            <ss:Column ss:Index="28" ss:StyleID="DataTxtWrap" />
            <ss:Column ss:Index="29" ss:StyleID="DefColTop" />
            <ss:Column ss:Index="30" />
            <ss:Row>
                <ss:Cell ss:StyleID="HdrBluBack">
                    <ss:Data ss:Type="String">1</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>#HEADER_ROW&#10;#RM_DELIMITER:&#1;&#10;#RM_HIDE_COUNTS&#10;S,,R,3300,N,,,,,,Y,,,,3300;2,,N,,,,,,,,,,,90,,,,,,,,0;;,,,N</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrBluBack">
                    <ss:Data ss:Type="String">2</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>#REL:3300&#10;C,7500;LSD,R,3300,N,,,,,,Y,,,,3300;1,,N,,,,,,,,,,,,,,,,,,,,,,N</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrBluBack">
                    <ss:Data ss:Type="String">3</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>S,,S,,N,X,Y,,,,Y,,,,,,,,,,,,,,,,,200,,,,,,,,,,,,1</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrBluBack">
                    <ss:Data ss:Type="String">35</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>S,,S,,R,N,N,N,,N,,,,,,,N,,0,,,,,,,,,1200,,,,,,,,0;;</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrBluBack">
                    <ss:Data ss:Type="String">46</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>#REL:46&#10;D,,R,46,N,N,N,N,,N,,,,,,,N,,1</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrBluBack">
                    <ss:Data ss:Type="String">47</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>#REL:46&#10;D,,R,46,N,N,N,N,,N,,,,,,,N,,1</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrBluBack">
                    <ss:Data ss:Type="String">50</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>#REL:50&#10;S,,R,50,N,N,N,N,,Y,Y,,,,,,N,,0,,,,,,,,,200,,,,Y,,,,0;;,,,Y,1</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrBluBack">
                    <ss:Data ss:Type="String">95</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>C,95,S,,N,N,N,N,,Y,Y,,,,95;1,,N,,1</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrBluBack">
                    <ss:Data ss:Type="String">96</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>C,96,S,,N,N,N,N,,Y,Y,N,,,95;2,,N,,1,,,,,,,,,,,</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrBluBack">
                    <ss:Data ss:Type="String">97</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>C,95,S,,N,,,,,,,,,,95;6,,N,,1,,,,,,,,,,,,,,,,,,,,N</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrBluBack">
                    <ss:Data ss:Type="String">100</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>S,,M,,N,N,N,N,,N,,,,,,,N,,0,,,,,,,,,254,,,,,,,,0;;</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrBluBack">
                    <ss:Data ss:Type="String">160</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>C,101;ECT,S,,N,N,N,N,,N,,,,,10;2,,N,,1</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrBluBack">
                    <ss:Data ss:Type="String">170</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>C,170,S,,N,,,,,Y,,,,,10;3,,N,,,,,,,,,,,,,,,,,,,,,,N</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrBluBack">
                    <ss:Data ss:Type="String">207</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>C,9999,S,,N,N,N,N,,N,,,,,,,N,,1</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrBluBack">
                    <ss:Data ss:Type="String">251</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>#REL:250&#10;N,,R,250,N,N,N,N,,N,,,,,250;1;1,,N,,1,,N,,,,,,,,,,,,,,,0;;</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrBluBack">
                    <ss:Data ss:Type="String">252</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>#REL:250&#10;N,,R,250,N,N,N,N,,N,,,,,250;2;1,,N,,1,,N,,,,,,,,,,,,,,,0;;</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrBluBack">
                    <ss:Data ss:Type="String">253</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>C,130;EPT,M,,N,N,N,N,,N,,,,,250;3;1,,N,,1,,N</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrBluBack">
                    <ss:Data ss:Type="String">500</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>C,500,M,,N,,,,,Y,,,,,500;1,,N,,,,,,,,,,,,,,,,,,,,,,N</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrBluBack">
                    <ss:Data ss:Type="String">2002</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>S,,S,,N,N,N,N,,Y,Y,,,,95;3,,N,,0,,,,,,,,,20,,,,,,,,0;;,,,Y,1</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrBluBack">
                    <ss:Data ss:Type="String">4000</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>#REL:4000&#10;C,95,R,4000,N,N,,N,,N,Y,,,,4000;1;1,,N,,1,,N</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrBluBack">
                    <ss:Data ss:Type="String">4002</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>#REL:4000&#10;D,,R,4000,N,N,N,N,,N,,,,,4000;3;1,,N,,1,,N</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrBluBack">
                    <ss:Data ss:Type="String">4003</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>#REL:4000&#10;D,,R,4000,N,N,N,N,,N,,,,,4000;4;1,,N,,1,,N</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrBluBack">
                    <ss:Data ss:Type="String">4004</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>#REL:4000&#10;C,4004,R,4000,N,,,,,,,,,,4000;5;1,,N</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrBluBack">
                    <ss:Data ss:Type="String">4005</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>#REL:4000&#10;#RM_COL&#10;S,,R,4000,N,,,,,,Y,,,,0RM,,N,,0,,,,,,,,,254,,,,,,,,,,,Y</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrBluBack">
                    <ss:Data ss:Type="String">4040</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>#REL:4040&#10;C,7729;ECT,R,4040,N,,,,,Y,,,,,4040;1,,N,,0,,,,,,,,,,,,,,,,,,,,N</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrBluBack">
                    <ss:Data ss:Type="String">4043</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>#REL:4043&#10;N,,R,4043,N,,,,,,,,,E;EDG,4040;2,,N,,1,,Y,,,,,,,,,,,,,,,0;;,,,N</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrBluBack">
                    <ss:Data ss:Type="String">.4043</ss:Data>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrBluBack">
                    <ss:Data ss:Type="String">4044</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>#REL:4043&#10;#RM_COL&#10;C,7730;ECT,R,4043,N,,,,,,,,,,0RM,,N,,0,,Y,,,,,,,,,,,,,,,,,,N</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrBluBack">
                    <ss:Data ss:Type="String">7010</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>S,,S,,B,N,N,N,,N,,,C,,,,N,,0,,,,,,,,,254,,,,,,,,0;;</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="SolidBlack">
                    <ss:Data ss:Type="String"></ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>#LAST_COL</ss:Data>
                    </ss:Comment>
                </ss:Cell>
            </ss:Row>
            <ss:Row>
                <ss:Cell ss:StyleID="HdrReqRow">
                    <ss:Data ss:Type="String">Required</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>#IGNORE_ROW&#10;#REQUIRED_ROW</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrReqRowNot"></ss:Cell>
                <ss:Cell ss:StyleID="HdrReqRow">
                    <ss:Data ss:Type="String">Required</ss:Data>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrReqRowNot"></ss:Cell>
                <ss:Cell ss:StyleID="HdrReqRowNot"></ss:Cell>
                <ss:Cell ss:StyleID="HdrReqRowNot"></ss:Cell>
                <ss:Cell ss:StyleID="HdrReqRowNot"></ss:Cell>
                <ss:Cell ss:StyleID="HdrReqRowNot"></ss:Cell>
                <ss:Cell ss:StyleID="HdrReqRow">
                    <ss:Data ss:Type="String">Required</ss:Data>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrReqRowNot"></ss:Cell>
                <ss:Cell ss:StyleID="HdrReqRowNot"></ss:Cell>
                <ss:Cell ss:StyleID="HdrReqRowNot"></ss:Cell>
                <ss:Cell ss:StyleID="HdrReqRowNot"></ss:Cell>
                <ss:Cell ss:StyleID="HdrReqRowNot"></ss:Cell>
                <ss:Cell ss:StyleID="HdrReqRowNot"></ss:Cell>
                <ss:Cell ss:StyleID="HdrReqRowNot"></ss:Cell>
                <ss:Cell ss:StyleID="HdrReqRowNot"></ss:Cell>
                <ss:Cell ss:StyleID="HdrReqRowNot"></ss:Cell>
                <ss:Cell ss:StyleID="HdrReqRowNot"></ss:Cell>
                <ss:Cell ss:StyleID="HdrReqRowNot"></ss:Cell>
                <ss:Cell ss:StyleID="HdrReqRowNot"></ss:Cell>
                <ss:Cell ss:StyleID="HdrReqRowNot"></ss:Cell>
                <ss:Cell ss:StyleID="HdrReqRowNot"></ss:Cell>
                <ss:Cell ss:StyleID="HdrReqRowNot"></ss:Cell>
                <ss:Cell ss:StyleID="HdrReqRow">
                    <ss:Data ss:Type="String">Required</ss:Data>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrReqRow">
                    <ss:Data ss:Type="String">Required</ss:Data>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrReqRowNot"></ss:Cell>
                <ss:Cell ss:StyleID="HdrReqRowNot"></ss:Cell>
                <ss:Cell ss:StyleID="HdrReqRowNot"></ss:Cell>
                <ss:Cell ss:StyleID="SolidBlack">
                    <ss:Data ss:Type="String"></ss:Data>
                </ss:Cell>
            </ss:Row>
            <ss:Row ss:Height="8">
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">Not a category item</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>#IGNORE_ROW&#10;#CAT_ROW</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">1=Benutzerdef (Benutzerdef)&#10;2=Intelligente medizinische Objekte (IMO)&#10;3=Staatlicher Gesundheitsdienst (SGD)&#10;4=Gesundheitssprache (GSP)&#10;5=National Library of Medicine/IHTSDO (NLM / IHTSDO)&#10;6=Zahnmedizinisches Diagnosesystem (ZDS)&#10;7=DHD (DHD)&#10;8=THL National Code Service (THL)&#10;9=ID Berlin (ID Berlin)&#10;10=EarlyTracks (ET)&#10;11=eHealth-Direktion (Direktion)&#10;12=Epic Erstellte Diagnose (Epic Diag.)</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Click cell for category list.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">Not a category item</ss:Data>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">Not a category item</ss:Data>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">Not a category item</ss:Data>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">Not a category item</ss:Data>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">Not a category item</ss:Data>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">1=ICD-9-CM (ICD-9-CM)&#10;2=ICD-10-CM (ICD-10-CM)&#10;3=ICD-10-CA (ICD-10-CA)&#10;4=ICD-10-UK (ICD-10-UK)&#10;5=DBC (DBC)&#10;6=ICD-10 Dutch (ICD-10 Dutch)&#10;7=ICD-10-AM (ICD-10-AM)&#10;8=A&amp;E Diagnoses (A&amp;E Diagnos)&#10;9=SKS (SKS)&#10;10=ICD-10-THL (ICD-10-THL)&#10;11=ICPC-2 (ICPC-2)&#10;12=ICD-O-3 (ICD-O-3)&#10;13=ICD-10-GM (ICD-10-GM)&#10;14=ICD-9-CM Supplemental (ICD-9-CM Sup)&#10;15=ICD-10-BE (ICD-10-BE)&#10;16=ICD-10-NO (ICD-10-NO)&#10;1001=Custom (Custom)</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Click cell for category list.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">1=BEGRIFF (BEGRIFF)&#10;2=CODE (CODE)&#10;3=CODE UND TERM (BEIDES)</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Click cell for category list.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">1=ICD-9-CM (ICD-9-CM)&#10;2=ICD-10-CM (ICD-10-CM)&#10;3=ICD-10-CA (ICD-10-CA)&#10;4=ICD-10-UK (ICD-10-UK)&#10;5=DBC (DBC)&#10;6=ICD-10 Dutch (ICD-10 Dutch)&#10;7=ICD-10-AM (ICD-10-AM)&#10;8=A&amp;E Diagnoses (A&amp;E Diagnos)&#10;9=SKS (SKS)&#10;10=ICD-10-THL (ICD-10-THL)&#10;11=ICPC-2 (ICPC-2)&#10;12=ICD-O-3 (ICD-O-3)&#10;13=ICD-10-GM (ICD-10-GM)&#10;14=ICD-9-CM Supplemental (ICD-9-CM Sup)&#10;15=ICD-10-BE (ICD-10-BE)&#10;16=ICD-10-NO (ICD-10-NO)&#10;1001=Custom (Custom)</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Click cell for category list.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">Not a category item</ss:Data>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">0=Nein (N)&#10;1=Ja (J)</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Click cell for category list.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">0=Seite unbekannt (U)&#10;1=Links (L)&#10;2=Rechts (R)&#10;3=Beidseitig (B)&#10;4=Nie (N)&#10;5=Möglich (M)&#10;6=Immer (I)&#10;7=Noch nicht bestimmt (NNB)</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Click cell for category list.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">1=Ja (J)&#10;2=Nein (N)</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Click cell for category list.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">Not a category item</ss:Data>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">Not a category item</ss:Data>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">1=Weiblich (W)&#10;2=Männlich (M)&#10;3=Unbekannt (U)&#10;950=Nicht-binär (NB)&#10;951=X (X)&#10;999=Sonstige (SONST.)</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Click cell for category list.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">1=Can add ATC (Add ATC)&#10;2=Can add endocrinological disorder (Add endo)&#10;3=Can add symptom (Add symptom)&#10;4=Requires external cause (Req ex cause)&#10;5=Requires accident (Req accident)&#10;6=Requires sports activity (Req sports)&#10;7=Symptom (Symptom)&#10;8=External cause (Ex cause)&#10;9=Accident type (Accident)&#10;10=Reason with symptom (Reas w symp)&#10;11=Symptom with reason (Symp w reas)&#10;12=External cause for complication (Ex cause cmp)&#10;13=Additional code (Addi code)&#10;14=Optional code (Opt code)</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Click cell for category list.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">Not a category item</ss:Data>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">1=ICD-9-CM (ICD-9-CM)&#10;2=ICD-10-CM (ICD-10-CM)&#10;3=ICD-10-CA (ICD-10-CA)&#10;4=ICD-10-UK (ICD-10-UK)&#10;5=DBC (DBC)&#10;6=ICD-10 Dutch (ICD-10 Dutch)&#10;7=ICD-10-AM (ICD-10-AM)&#10;8=A&amp;E Diagnoses (A&amp;E Diagnos)&#10;9=SKS (SKS)&#10;10=ICD-10-THL (ICD-10-THL)&#10;11=ICPC-2 (ICPC-2)&#10;12=ICD-O-3 (ICD-O-3)&#10;13=ICD-10-GM (ICD-10-GM)&#10;14=ICD-9-CM Supplemental (ICD-9-CM Sup)&#10;15=ICD-10-BE (ICD-10-BE)&#10;16=ICD-10-NO (ICD-10-NO)&#10;1001=Custom (Custom)</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Click cell for category list.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">Not a category item</ss:Data>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">Not a category item</ss:Data>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">0=Term : Code (Term)&#10;1=General Equivalence Map (GEM)&#10;2=CMS Reimbursement Map (CMS)&#10;3=Reference Code (Ref Code)&#10;4=Billing Map (Billing Map)</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Click cell for category list.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">Not a category item</ss:Data>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">Too many (over 100) categories to list</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Click cell for category list.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">Not a category item</ss:Data>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">Not a category item</ss:Data>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">Too many (over 100) categories to list</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Click cell for category list.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">Not a category item</ss:Data>
                </ss:Cell>
                <ss:Cell ss:StyleID="SolidBlack">
                    <ss:Data ss:Type="String"></ss:Data>
                </ss:Cell>
            </ss:Row>
            <ss:Row ss:Height="8">
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>#IGNORE_ROW&#10;#HELP_ROW</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">One part of a pair of items that holds the vendor-identifier pair. The &#10;item pair is used to store vendor specific identifiers for EDG records.</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Select cell to view item help text.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">No help text available.</ss:Data>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">Enter a comment for this contact.&#10;</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Select cell to view item help text.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">The dates on which this diagnosis is available for charge or order entry.&#10;In the Effective From and To columns, enter the beginning and end dates,&#10;respectively, of each period. A range includes the listed beginning and end&#10;dates. Date ranges cannot overlap. Only the first range can have an&#10;indeterminate (that is, blank) beginning date. Only the last range can have&#10;an indeterminate end date.&#10;&#10;If you enter a date in both the Effective From and Effective To columns,&#10;then this diagnosis is valid only on and between these dates. For example,&#10;if you enter 1/1/1999 in the Effective from field and 12/31/1999 in the&#10;Effective to field, the diagnosis is valid for all dates in 1999, neither&#10;before nor after. If both the Effective From and Effective To columns are&#10;blank, then this diagnosis is always valid.</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Select cell to view item help text.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">The last date on which this diagnosis is available for charge or order&#10;entry. If the effective date range of this diagnosis has an end, enter the&#10;last date of the effective range. If this diagnosis is valid on all dates&#10;posterior to the date in the Effective From field, then leave this field&#10;blank.&#10;&#10;If you enter a date in both the Effective From and Effective To columns,&#10;then this diagnosis is valid only on and between these dates. For example,&#10;if you enter 1/1/1999 in the Effective From field and 12/31/1999 in the&#10;Effective To field, the diagnosis is valid for all dates in 1999, neither&#10;before nor after. If both the Effective From and Effective To columns are&#10;blank, then this diagnosis is always valid.</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Select cell to view item help text.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">  You may enter several synonyms for this diagnosis.  Synonyms may be &#10;  used at any time when selecting a diagnosis.&#10;</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Select cell to view item help text.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">Enter the code set for the record&#39;s reference code. This applies only to &#10;records of types Code and Both. For example, enter ICD-10-CM for ICD-10-CM &#10;codes.&#10;&#10;When this field is left blank, this record might not be available in &#10;billing applications. Note that the system prevents you from creating &#10;multiple Code records that use the same reference code and code set pair.</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Select cell to view item help text.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String"> Defines the type of a record.  Records can be of type Term, Code, or Both&#10;Code And Term.&#10; This item is set by import and cannot be blank.</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Select cell to view item help text.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">  This item stores the source codeset for a Term or Both record. For now &#10;  it can either be set to ICD-9-CM, ICD-10-CM, or blank. This item is &#10;  intended for internal use during the IMO import and is not meant to be &#10;  set manually.&#10;&#10;  Functionally it is used to differentiate between active terms that were &#10;  introduced in ICD-9-CM versus ICD-10-CM. For example if a term is &#10;  introduced in ICD-10-CM then this item will be set to ICD-10-CM.  All &#10;  inactive terms should have this item set to blank.</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Select cell to view item help text.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">  Enter the full description of the diagnosis.&#10;</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Select cell to view item help text.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">  Enter &quot;Yes&quot; to have Diagnoses and Problems marked as chronic by default. &#10;  The default value is &quot;No&quot;.</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Select cell to view item help text.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">  It holds the laterality information for the diagnosis. It defaults to 0-&#10;  Side unknown if left blank.</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Select cell to view item help text.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">   This item can be used to mark a diagnosis as unavailable for clinical&#10;   use.  If this item is set to &quot;Yes&quot;, the diagnosis will not be available&#10;   for use in the EMR.  The diagnosis will remain available for billing&#10;   and other financial purposes.  </ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Select cell to view item help text.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">The inclusive starting age for an age range. When indicating an age&#10;of less than two years old, you may enter a decimal value in this field.&#10;This field must be less than or equal to the age in the To field. You&#10;cannot use this diagnosis for any patient whose age is in this range.&#10;&#10;If the EpicCare order validation programming point &quot;Waiver&#10;Required/Prof Billing Proc-Diag Limitations Check (3895)&quot; is in the active&#10;profile, EpicCare order entry checks the patient&#39;s age against this&#10;diagnosis restriction and warns the provider if the patient does not&#10;qualify for this diagnosis.&#10;&#10;You can use the Professsional Billing charge review rule &quot;Diagnosis Must Be&#10;Valid for the Patient&#39;s Age (104)&quot; to check this restriction in&#10;Professional Billing Charge Entry.&#10;&#10;You can use the Hospital Billing property &quot;Diagnosis Valid for Pat&#10;Age (658)&quot; to check this restriction in Hospital Billing Charge Entry.&#10;&#10;You can use the Charge Router rule &quot;Diagnosis Must Be Valid for the&#10;Patient&#39;s Age (106)&quot; to check this restriction in the Charge Router or UCL&#10;Charge Entry.&#10;&#10;You can use the Claim Edit rule &quot;Diagnosis is not Valid for Patient&#39;s&#10;Age/Sex (108)&quot; to check this restriction in claims processing.&#10;&#10;Enter an age for the beginning of this range. If you leave this field&#10;blank, it will be assumed to have the same value as the corresponding To&#10;field.</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Select cell to view item help text.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">The inclusive ending age for an age range. When indicating an age&#10;of less than two years old, you may enter a decimal value in this field.&#10;This field must be greater than or equal to the age in the From field. You&#10;cannot use this diagnosis for any patient whose age is in this range.&#10;&#10;If the EpicCare order validation programming point &quot;Waiver&#10;Required/Prof Billing Proc-Diag Limitations Check (3895)&quot; is in the active&#10;profile, EpicCare order entry checks the patient&#39;s age against this&#10;diagnosis restriction and warns the provider if the patient does not&#10;qualify for this diagnosis.&#10;&#10;You can use the Professsional Billing charge review rule &quot;Diagnosis Must Be&#10;Valid for the Patient&#39;s Age (104)&quot; to check this restriction in&#10;Professional Billing Charge Entry.&#10;&#10;You can use the Hospital Billing property &quot;Diagnosis Valid for Pat&#10;Age (658)&quot; to check this restriction in Hospital Billing Charge Entry.&#10;&#10;You can use the Charge Router rule &quot;Diagnosis Must Be Valid for the &#10;Patient&#39;s Age (106)&quot; to check this restriction in the Charge Router or UCL &#10;Charge Entry.&#10;&#10;You can use the Claim Edit rule &quot;Diagnosis is not Valid for Patient&#39;s&#10;Age/Sex (108)&quot; to check this restriction in claims processing.&#10;&#10;Enter an age for the end of this range. If you leave this field blank, it&#10;will be assumed that this diagnosis will be restricted to all ages equal to&#10;and greater than the corresponding From field.</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Select cell to view item help text.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">The restricted sexes to whom this diagnosis cannot be applied. You cannot&#10;use this diagnosis for any patient whose sex is one of the values in this&#10;field.&#10;&#10;If the EpicCare order validation programming point &quot;Waiver Required/Prof&#10;Billing Proc-Diag Limitations Check (3895)&quot; is in the active profile,&#10;EpicCare order entry checks the patient&#39;s sex against this diagnosis&#10;restriction and warns the provider if the patient does not qualify for this&#10;diagnosis.&#10;&#10;You can use the Professional Billing charge review rule &quot;Diagnosis Must Be&#10;Valid for the Patient&#39;s Sex (105)&quot; to check this restriction in&#10;Professional Charge Entry.&#10;&#10;You can use the Hospital Billing property &quot;Diagnosis Valid for Pat&#10;Sex (659)&quot; to check this restriction in Hospital Charge Entry.&#10;&#10;You can use the Charge Router rule &quot;Diagnosis Must Be Valid for the &#10;Patient&#39;s Sex (107)&quot; to check this restriction in the Charge Router or UCL &#10;Charge Entry.&#10;&#10;You can use the Claim Edit rule &quot;Diagnosis is not Valid for Patient&#39;s&#10;Age/Sex (108)&quot; to check this restriction in claims processing.&#10;&#10;If you leave this field blank, it will be assumed that this diagnoses is&#10;valid regardless of the patient&#39;s sex.&#10;</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Select cell to view item help text.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">Defines the additional properties of a diagnosis. This item is set by &#10;import.</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Select cell to view item help text.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">Specify the ICD Code of this record.  In most cases the ICD Code paired &#10;with the ICD code set will serve to uniquely identify the record.&#10;&#10;This item is required for all CODE/BOTH records.</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Select cell to view item help text.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String"> Enter the code set to map this record to. &#10;&#10; You cannot map a CODE-type record of one code set to code(s) in the same &#10;code set.&#10;&#10; This mapping information is used to determine to which reference code(s)&#10; this record maps to for a given code set, map type, and date range.</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Select cell to view item help text.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String"> Enter the date from which this mapping is effective.&#10;&#10; This mapping information is used to determine to which reference code&#10; this record maps for a given code set and date range.</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Select cell to view item help text.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String"> Enter the date to which this mapping is effective.&#10;&#10; This mapping information is used to determine to which reference code&#10; this record maps for a given code set and date range.</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Select cell to view item help text.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String"> Enter the map type of this mapping row. Leave this blank if the mapping &#10; is not specific to a special situation or context.&#10;&#10; The system supports multiple mapping options, and specific map types &#10; can be used in certain situations when necessary. The information is used&#10; to determine to which reference code this record maps.</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Select cell to view item help text.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String"> Enter the reference codes to which this record maps. This is a free-text &#10; item.&#10;&#10; This mapping information is used to determine to which reference codes&#10; this record maps for a given code set, map type, and date range.</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Select cell to view item help text.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">  Enter the allowed modifier types for this diagnosis record when &#10;  documenting a problem in the problem list.</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Select cell to view item help text.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">  Enter a diagnosis record that this problem can resolve to.</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Select cell to view item help text.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">Networked Record Name Column</ss:Data>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">  Enter one or more modifier values that in combination with this &#10;  diagnosis record can resolve to a more detailed diagnosis record.</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Select cell to view item help text.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrCatHlpRow">
                    <ss:Data ss:Type="String">There are various places where diagnoses are displayed in MyChart. Some of&#10;these include &#39;Current Health Issues&#39;, &#39;Past Medical History&#39; and &#39;Wallet&#10;Card&#39;. The diagnoses associated with patients&#39; encounters are also used in&#10;MyChart&#39;s Content Relevancy.&#10;&#10;You can specify a patient-friendly description for a diagnosis to be&#10;displayed in MyChart. If no text is specified here, then the diagnosis name&#10;is displayed in MyChart. If a diagnosis has been annotated, then the&#10;annotated description takes precedence over this field.&#10;</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>Select cell to view item help text.</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="SolidBlack">
                    <ss:Data ss:Type="String"></ss:Data>
                </ss:Cell>
            </ss:Row>
            <ss:Row>
                <ss:Cell ss:StyleID="HdrItmRow">
                    <ss:Data ss:Type="String">Vendor Specific ID</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>#IGNORE_ROW&#10;DX VENDOR SPECIFIC IDENTIFIER</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrItmRow">
                    <ss:Data ss:Type="String">Diagnosis Vendor</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>DIAGNOSIS VENDOR</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrItmRow">
                    <ss:Data ss:Type="String">Diagnosis Description</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>DIAGNOSIS DESCRIPTION</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrItmRow">
                    <ss:Data ss:Type="String">Contact Comment</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>CONTACT COMMENT</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrItmRow">
                    <ss:Data ss:Type="String">Effective Date from</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>EFFECTIVE DATE FROM</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrItmRow">
                    <ss:Data ss:Type="String">Effective Date to</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>EFFECTIVE DATE TO</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrItmRow">
                    <ss:Data ss:Type="String">Synonym</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>DIAGNOSIS SYNONYM</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrItmRow">
                    <ss:Data ss:Type="String">Code Set</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>CODE SET</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrItmRow">
                    <ss:Data ss:Type="String">Record Type</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>RECORD TYPE</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrItmRow">
                    <ss:Data ss:Type="String">Source Code Set</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>SOURCE CODESET</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrItmRow">
                    <ss:Data ss:Type="String">Diagnosis Long Description</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>DIAGNOSIS LONG DESCRIPTION</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrItmRow">
                    <ss:Data ss:Type="String">Chronic</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>DEFAULT CHRONIC FLAG</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrItmRow">
                    <ss:Data ss:Type="String">Laterality</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>LATERALITY</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrItmRow">
                    <ss:Data ss:Type="String">Clinically Inactive Flag</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>EPICCARE INACTIVE FLAG</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrItmRow">
                    <ss:Data ss:Type="String">Age Range from</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>RESTRICTION - AGE FROM</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrItmRow">
                    <ss:Data ss:Type="String">Age Range to</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>RESTRICTION - AGE TO</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrItmRow">
                    <ss:Data ss:Type="String">Restricted Sex</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>RESTRICTION - SEX</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrItmRow">
                    <ss:Data ss:Type="String">Diagnosis Code Type</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>ADDITIONAL DIAGNOSIS PROPERTIES</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrItmRow">
                    <ss:Data ss:Type="String">Reference Code</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>REFERENCE CODE</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrItmRow">
                    <ss:Data ss:Type="String">Mapped Code Set</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>MAPPED CODE SET</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrItmRow">
                    <ss:Data ss:Type="String">Mapping Effective from</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>MAPPED CODE EFFECTIVE FROM DATE</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrItmRow">
                    <ss:Data ss:Type="String">Mapping Effective to</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>MAPPED CODE EFFECTIVE TO DATE</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrItmRow">
                    <ss:Data ss:Type="String">Map Type</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>MAP TYPE</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrItmRow">
                    <ss:Data ss:Type="String">Mapped Codes</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>MAPPED CODES</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrItmRow">
                    <ss:Data ss:Type="String">Allowed Modifier Types: Problem List</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>ALLOWED MODIFIER TYPES: PROBLEM LIST</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrItmRow">
                    <ss:Data ss:Type="String">Resolved Term Id: Problem List</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>RESOLVED TERM ID: PROBLEM LIST</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrItmRow">
                    <ss:Data ss:Type="String">Resolved Term Id: Problem List RECORD NAME</ss:Data>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrItmRow">
                    <ss:Data ss:Type="String">Modifier Values: Problem List</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>MODIFIER VALUES: PROBLEM LIST</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="HdrItmRow">
                    <ss:Data ss:Type="String">Patient Friendly Text</ss:Data>
                    <ss:Comment ss:Author="Epic Export Utility">
                        <ss:Data>PATIENT FRIENDLY TEXT</ss:Data>
                    </ss:Comment>
                </ss:Cell>
                <ss:Cell ss:StyleID="SolidBlack">
                    <ss:Data ss:Type="String"></ss:Data>
                </ss:Cell>
            </ss:Row>`
var XML_End = `<ss:Row>
<ss:Cell ss:StyleID="SolidBlack">
    <ss:Comment ss:Author="Epic Export Utility">
        <ss:Data>#LAST_ROW</ss:Data>
    </ss:Comment>
</ss:Cell>
<ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
<ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
<ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
<ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
<ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
<ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
<ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
<ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
<ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
<ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
<ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
<ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
<ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
<ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
<ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
<ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
<ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
<ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
<ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
<ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
<ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
<ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
<ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
<ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
<ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
<ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
<ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
<ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
<ss:Cell ss:StyleID="SolidBlack"></ss:Cell>
</ss:Row>
</ss:Table>
<x:WorksheetOptions>
<x:Selected />
<x:FreezePanes />
<x:FrozenNoSplit />
<x:SplitHorizontal>5</x:SplitHorizontal>
<x:TopRowBottomPane>5</x:TopRowBottomPane>
<x:SplitVertical>1</x:SplitVertical>
<x:LeftColumnRightPane>1</x:LeftColumnRightPane>
<x:ActivePane>0</x:ActivePane>
<x:Panes>
<x:Pane>
    <x:Number>3</x:Number>
</x:Pane>
<x:Pane>
    <x:Number>2</x:Number>
</x:Pane>
<x:Pane>
    <x:Number>1</x:Number>
</x:Pane>
<x:Pane>
    <x:Number>0</x:Number>
</x:Pane>
</x:Panes>
<ProtectObjects>False</ProtectObjects>
<ProtectScenarios>False</ProtectScenarios>
</x:WorksheetOptions>
<x:AutoFilter x:Range="R5C1:R5C30"></x:AutoFilter>
</Worksheet>
<Worksheet ss:Name="info" ss:Protected="1">
<ss:Table ss:ExpandedColumnCount="1" ss:ExpandedRowCount="15" ss:FullColumns="1" ss:FullRows="1">
<ss:Row>
<ss:Cell ss:StyleID="InfoStyle">
    <ss:Data ss:Type="String">EDG Export Summary</ss:Data>
</ss:Cell>
</ss:Row>
<ss:Row>
<ss:Cell ss:StyleID="InfoStyle">
    <ss:Data ss:Type="String">Exported from.............isrv00097</ss:Data>
</ss:Cell>
</ss:Row>
<ss:Row>
<ss:Cell ss:StyleID="InfoStyle">
    <ss:Data ss:Type="String">Created by................SPEIERER, GUILLAUME</ss:Data>
</ss:Cell>
</ss:Row>
<ss:Row>
<ss:Cell ss:StyleID="InfoStyle">
    <ss:Data ss:Type="String">Time created..............11.10.2022 13:48 MESZ</ss:Data>
</ss:Cell>
</ss:Row>
<ss:Row>
<ss:Cell ss:StyleID="InfoStyle">
    <ss:Data ss:Type="String">Time to write file........00M .025762z</ss:Data>
</ss:Cell>
</ss:Row>
<ss:Row>
<ss:Cell ss:StyleID="InfoStyle">
    <ss:Data ss:Type="String">Output file path........../epic/transfer/out/diagnoseVersion2GSP.xml</ss:Data>
</ss:Cell>
</ss:Row>
<ss:Row>
<ss:Cell ss:StyleID="InfoStyle">
    <ss:Data ss:Type="String">Import specification......EDG,2001-EDG GSP CALCULATOR</ss:Data>
</ss:Cell>
</ss:Row>
<ss:Row>
<ss:Cell ss:StyleID="InfoStyle">
    <ss:Data ss:Type="String">Records exported..........1</ss:Data>
</ss:Cell>
</ss:Row>
<ss:Row>
<ss:Cell ss:StyleID="InfoStyle">
    <ss:Data ss:Type="String">Spreadsheet rows..........6</ss:Data>
</ss:Cell>
</ss:Row>
<ss:Row>
<ss:Cell ss:StyleID="InfoStyle">
    <ss:Data ss:Type="String">MR data in single row.....Yes</ss:Data>
</ss:Cell>
</ss:Row>
<ss:Row>
<ss:Cell ss:StyleID="InfoStyle">
    <ss:Data ss:Type="String">Explicit &lt;NULL&gt;...........No</ss:Data>
</ss:Cell>
</ss:Row>
<ss:Row>
<ss:Cell ss:StyleID="InfoStyle">
    <ss:Data ss:Type="String">Hide unused items.........No</ss:Data>
</ss:Cell>
</ss:Row>
<ss:Row>
<ss:Cell ss:StyleID="InfoStyle">
    <ss:Data ss:Type="String">Export category names.....Yes</ss:Data>
</ss:Cell>
</ss:Row>
<ss:Row>
<ss:Cell ss:StyleID="InfoStyle">
    <ss:Data ss:Type="String">Export INI names..........Yes</ss:Data>
</ss:Cell>
</ss:Row>
<ss:Row>
<ss:Cell ss:StyleID="InfoStyle">
    <ss:Data ss:Type="String">Protect sheet structure...No</ss:Data>
</ss:Cell>
</ss:Row>
</ss:Table>
<x:WorksheetOptions>
<ProtectObjects>True</ProtectObjects>
<ProtectScenarios>True</ProtectScenarios>
<EnableSelection>NoSelection</EnableSelection>
</x:WorksheetOptions>
</Worksheet>
</Workbook>`


