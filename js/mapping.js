function loading_page_mapping() {
    document.getElementById('button_concept_SNOMED_search').addEventListener('click', function (event) { mapping_SNOMED_search_onClick(event) })
    document.getElementById('button_concept_SNOMED_remplace').addEventListener('click', function (event) { mapping_SNOMED_remplace_onClick(event) })

    document.getElementById('button_concept_diagnosis_search').addEventListener('click', function (event) { mapping_diagnosis_search_onClick(event) })

}

/* ********************************** SNOMED ***************************************/


function mapping_SNOMED_search_onClick() {
    let input_concept = document.getElementById('input_concept_SNOMED_search').value
    find_SNOMED_concept_mongoDB(input_concept)
}

function find_SNOMED_concept_mongoDB(concept) {
    var xmlhttp = new XMLHttpRequest();
    let params = `concept=${concept}`;
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText)
            let results_JSON = JSON.parse(this.responseText);
            document.getElementById('mapping_ul_SNOMED').innerHTML = ""

            results_JSON.forEach(element => {
                document.getElementById('mapping_ul_SNOMED').appendChild(mapping_create_li(
                    `Id ${element['calculator_id']}: ${element['mainName']}`,
                    `index.php?calculator=${element['calculator_id']}&version=${element['version']}`
                ))
            });
            if (this.responseText != "[]") {

                document.getElementById('input_concept_SNOMED_remplace').style.display = "inline"
                document.getElementById('button_concept_SNOMED_remplace').style.display = "inline"
            }
        }
    };
    xmlhttp.open("POST", "mongodb/concept_SNOMED_search.php", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
}

function mapping_SNOMED_remplace_onClick() {
    let input_concept = document.getElementById('input_concept_SNOMED_search').value
    let remplace_concept = document.getElementById('input_concept_SNOMED_remplace').value

    remplace_SNOMED_concept_mongoDB(input_concept, remplace_concept)
}

function remplace_SNOMED_concept_mongoDB(concept, remplace_concept) {

    var xmlhttp = new XMLHttpRequest();
    let params = `concept=${concept}&remplace=${remplace_concept}`;
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

        }
    };
    xmlhttp.open("POST", "mongodb/concept_SNOMED_remplace.php", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
}
/* ********************************** Diagnostic ***************************************/


function mapping_diagnosis_search_onClick() {
    let input_concept = document.getElementById('input_concept_diagnosis_search').value
    find_diagnosis_concept_mongoDB(input_concept)
}

function find_diagnosis_concept_mongoDB(concept) {
    var xmlhttp = new XMLHttpRequest();
    let params = `concept=${concept}`;
    console.log(params)
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText)

            let results_JSON = JSON.parse(this.responseText);
            console.log(results_JSON)
            results_JSON.forEach(element => {
                document.getElementById('mapping_ul_diagnosis').appendChild(mapping_create_li(
                    `Id ${element['calculator_id']}: ${element['mainName']}`,
                    `index.php?calculator=${element['calculator_id']}&version=${element['version']}`
                ))
            })

        }
    };
    xmlhttp.open("POST", "mongodb/concept_diagnosis_search.php", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
}


/* ************** Tools ******************** */

function mapping_create_li(name, URL) {
    let li = document.createElement('li')
    let ahref = document.createElement('a')
    ahref.setAttribute('href', URL)
    ahref.appendChild(document.createTextNode(name))
    li.appendChild(ahref)
    console.log(li)
    return li;
}