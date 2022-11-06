function loading_page_mapping() {
    document.getElementById('button_concept_SNOMED_search').addEventListener('click', function (event) { mapping_SNOMED_search_onClick(event) })
    document.getElementById('button_concept_diagnosis_search').addEventListener('click', function (event) { mapping_diagnosis_search_onClick(event) })

}



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
            results_JSON.forEach(element => {
                document.getElementById(mapping_ul_SNOMED).appendChild(mapping_create_li(`Id ${element['calculator_id']}: ${element['mainName']}`))
            });
        }
    };
    xmlhttp.open("POST", "mongodb/concept_SNOMED_search.php", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
}

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