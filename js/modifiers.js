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
            let modifier_array_toDownload = []
            let subModifier_array_toDownload = []
            for (let i = 0; i < Object.keys(results_JSON).length; i++) {
                let element = results_JSON[i]
                let link = document.createElement('li')
                link.setAttribute('class', 'home_link')
                link.setAttribute('id', `modifier_link_id_${element['modifier_id']}`)
                let text_name = document.createTextNode(`${element['modifier_name']} (id: ${element['modifier_id']}, DiagCalc: ${element['calculator_name']}[Version:${element['calculator_version']}])`)
                let params_link = `calculator_id=${element['calculator_id']}&version=${element['calculator_version']}`
                link.appendChild(text_name)
                modifier_array_toDownload.push([element['modifier_id'], element['modifier_name']])
                //Create Sub                
                let sub_ul = document.createElement('ul')
                element['modifier_array'].forEach((element) => {
                    let sub_li = document.createElement('li')
                    sub_li.appendChild(document.createTextNode(element))
                    sub_li.setAttribute('class', 'home_sublink')
                    sub_ul.appendChild(sub_li)
                    subModifier_array_toDownload.push([element])

                })
                link.appendChild(sub_ul)
                document.getElementById('modifier_typ_ul').appendChild(link)
                console.log(params_link)
                document.getElementById(`modifier_link_id_${element['modifier_id']}`).addEventListener('click', function () { changePage(`calculator`, params_link, '') })
            }
            modifier_array_toDownload.sort()
            console.log(modifier_array_toDownload)
            console.log(subModifier_array_toDownload)
        }
    };
    xmlhttp.open("POST", "mongodb/find_modifiers.php", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
}
