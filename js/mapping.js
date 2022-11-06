function loading_page_mapping(){
    document.getElementById('button_concept_search').addEventListener('click', function(event){mapping_search_onClick(event)})
}



function mapping_search_onClick(){
let input_concept = document.getElementById('input_concept_search')
find_allconcept_mongoDB(input_concept)
}

function find_allconcept_mongoDB(concept) {
    var xmlhttp = new XMLHttpRequest();
    let params = `concept=${concept}`;
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText)

            let results_JSON = JSON.parse(this.responseText);
           console.log(results_JSON)

        }
    };
    xmlhttp.open("POST", "mongodb/concept_search.php", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
}