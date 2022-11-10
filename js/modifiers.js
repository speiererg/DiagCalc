function loading_page_modifiers() {
find_modifiers()
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
                let link = document.createElement('li')
                link.setAttribute('class', 'home_link')
                link.setAttribute('id', `modifier_link_id_${element['modifier_id']}`)
                let text_name = document.createTextNode(`Id ${element['modifier_id']}: ${element['modifier_name']} (DiagCalc: ${element['calculator_name']}[Version:${element['calculator_version']}])`)
                let params_link = `calculator_id=${element['calculator_id']}&version=${element['calculator_version']}`
                link.appendChild(text_name)
                document.getElementById('modifier_typ_ul').appendChild(link)
                document.getElementById(`modifier_link_id_${element['modifier_id']}`).addEventListener('click', function () { changePage(`calculator`, params_link, '') })
            }

        }
    };
    xmlhttp.open("POST", "mongodb/find_modifiers.php", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
}
