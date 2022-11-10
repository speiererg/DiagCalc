function find_home_mongoDB(id, version) {
    var xmlhttp = new XMLHttpRequest();
    let params = 'item=active&value=yes';
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let results_JSON = JSON.parse(this.responseText);
            document.getElementById('modifier_typ_ul').innerHTML = ""

            for (let i = 0; i < Object.keys(results_JSON).length; i++) {
                let link = document.createElement('li')
                link.setAttribute('class', 'home_link')
               // link.setAttribute('id', `home_link_id${results_JSON[i]['calculator_id']}`)
                let text_name = document.createTextNode(`${results_JSON[i]['modifier_name']}`)
                //let params_link = `calculator_id=${results_JSON[i]['calculator_id']}&version=${results_JSON[i]['lastVersion']}`
                link.appendChild(text_name)
                document.getElementById('modifier_typ_ul').appendChild(link)
                //document.getElementById(`home_link_id${results_JSON[i]['calculator_id']}`).addEventListener('click', function () { changePage(`calculator`, params_link, '') })
            }

        }
    };
    xmlhttp.open("POST", "mongodb/find_modifiers.php", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
}
