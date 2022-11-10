



// ***************************** Load Variable  *****************************

var modifier_nbr = 1
var modifierSub_nbr = 1
var confirmBeforeNavigate = 0
var array_inputs_value = [];
var array_inputs_itemNbr = [];
var array_calculator = [];
var array_hiden_ID = "";
var output_array = []
var array_ICD10 = []
var modifier_array_toDownload = []
var subModifier_array_toDownload = []
var reload = false

// ***************************** Loading HOME  *****************************
function loadingIndex() {
    changePage('index')


    setTimeout(loadXML_ICD, 1500)

    $(document).keypress(
        function (event) {
            if (event.which == '13') {
                event.preventDefault();
            }
        });
}

function addEventListenerByLoading() {
    document.getElementById('navPageHome').addEventListener('click', function () { changePage('home') })
    document.getElementById('navPageCalculator').addEventListener('click', function () { changePage('calculator', '', 'newCalculator') })
    document.getElementById('navPageTest').addEventListener('click', function () { testMongoDB() })
    document.getElementById('navPageDelete').addEventListener('click', function () { deleteAllMongoDB() })
    document.getElementById('navPageMappingUpdate').addEventListener('click', function () { changePage('mapping', '', '') })
    document.getElementById('navPageModifierManagment').addEventListener('click', function () { changePage('modifiers', '', '') })

}


//  *****************************   Change Page  *****************************
function changePage(page, paramsPHP, paramsJS) {
    actualPage = page
    if (confirmBeforeNavigate == 1) {
        if (confirm("Sie haben Daten die noch nicht gespeichert sind, wenn sie okay clicken werden sie diese Daten verlieren")) {
            changePageExecute(page, paramsPHP, paramsJS)
            confirmBeforeNavigate = 0
        }
    } else {
        changePageExecute(page, paramsPHP, paramsJS)
    }
}

function changePageExecute(page, paramsPHP, paramsJS) {
    console.log(window.location.search)
    if (window.location.search) {                                        //test if GET Parameters are passed
        let GET_object = transformToAssocArray(window.location.search)
        window.history.replaceState({}, document.title, "/" + "index.php");
        if (Object.keys(GET_object)[0] == 'calculator') {
            page = 'calculator'
            paramsPHP = `calculator_id=${Object.values(GET_object)[0]}&version=${Object.values(GET_object)[1]}`
            reload = true
        }
        if (Object.keys(GET_object)[0] == 'alert') {
            page = 'home'
            alert(`${toString(Object.values(GET_object)[0])}`)
            reload = true
        }
    }

    if (paramsPHP) { } else { paramsPHP = '' }
    let targetpage
    if (page == "index") { targetpage = 'home' } else { targetpage = page }
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("mainpage").innerHTML = ""
            document.getElementById("mainpage").innerHTML = this.responseText
            if (page == "calculator") {
                modifier_nbr = 1
                modifierSub_nbr = 1
                output_array = []
                loading_page_calculator(paramsJS)

                $(function () {
                    $("#inputICD1_1").autocomplete({
                        minLength: 2,
                        source: function (request, response) {
                            var results = $.ui.autocomplete.filter(array_ICD10, request.term);
                            response(results.slice(0, autocomplete_items))
                        },
                        change: function (event, ui) { if (!ui.item) { $(`#inputICD1_1`).val(""); } }
                    });
                });

                // if New Calculator
                if (paramsJS == "newCalculator") {
                    document.getElementById('input_hidden_new_calculator').value = 1
                    document.getElementById('button_calculate').disabled = false
                    document.getElementById('button_edit_calculator').disabled = true
                    document.getElementById('button_download_XML').disabled = true
                    document.getElementById('button_download_TXT').disabled = true
                    document.getElementById(`radio_input_1`).click()
                    confirmBeforeNavigate = 1


                } else { document.getElementById('input_hidden_new_calculator').value = 0 }

                if (reload == true) {
                    addEventListenerByLoading()
                    reload = false
                }
            }
            if (page == "index") {
                document.getElementById('home_tr').setAttribute('height', window.innerHeight - 200)
                addEventListenerByLoading()
                find_home_mongoDB()
            }
            if (page == "mapping") {
                loading_page_mapping()
            }
            if (page == "home") {
                find_home_mongoDB()
                document.getElementById('home_tr').setAttribute('height', window.innerHeight - 200)

            }
            if (page == "modifiers") {
                loading_page_modifiers()
            }
        }
    }
    xhttp.open("POST", `mainContent/${targetpage}.php`);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(paramsPHP);

}
// *****************************   Tools   *****************************
function modifier_nbr_change(change, number) {
    if (change == "++") {
        modifier_nbr = modifier_nbr + number
    } else if (change == "--") {
        modifier_nbr = modifier_nbr - number
    }
    document.getElementById('input_hidden_modifier_nbr').value = modifier_nbr
}

function modifierSub_nbr_change(change, number) {
    if (change == "++") {
        modifierSub_nbr = modifierSub_nbr + number
    } else if (change == "--") {
        modifierSub_nbr = modifierSub_nbr - number
    }
    document.getElementById('input_hidden_modifierSub_nbr').value = modifierSub_nbr
}

function disable_input(toDo) {
    let DOM_readonly = document.getElementsByClassName('input_readonly')
    Array.prototype.forEach.call(DOM_readonly, (element) => { element.readOnly = toDo })
    let DOM_disabled = document.getElementsByClassName('input_disabled')
    Array.prototype.forEach.call(DOM_disabled, (element) => { element.disabled = toDo })
    let DOM_checkbox = document.getElementsByClassName('input_checkbox')
    let DOM_radio = document.getElementsByClassName('radio_input')


    let img_button_class = document.getElementsByClassName('img_button')

    if (toDo == true) {
        Array.prototype.forEach.call(img_button_class, (element) => { element.style.display = "none" })
        Array.prototype.forEach.call(DOM_checkbox, (element) => { element.style.pointerEvents = "none" })
        Array.prototype.forEach.call(DOM_radio, (element) => { element.style.pointerEvents = "none" })

    } else if (toDo == false) {
        Array.prototype.forEach.call(img_button_class, (element) => { element.style.display = "inline" })
        Array.prototype.forEach.call(DOM_checkbox, (element) => { element.style.pointerEvents = "auto" })
        Array.prototype.forEach.call(DOM_radio, (element) => { element.style.pointerEvents = "auto" })

    }

}

function loadXML_ICD() {
    const oXHR = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    function reportStatus() {
        if (oXHR.readyState == 4) {
            showTheList(this.responseXML);      // Now show the data.
        }
    }
    oXHR.onreadystatechange = reportStatus;
    oXHR.open("GET", "XML/ICD.xml", true);
    // true = asynchronous request (desirable), false = synchronous request.
    oXHR.send();

    function showTheList(xml) {
        let XML_list = xml.getElementsByTagName('diag');
        for (let i = 0; i < XML_list.length; i++) {
            array_ICD10.push(`${XML_list[i].getElementsByTagName('name')[0].innerHTML}:: ${XML_list[i].getElementsByTagName('desc')[0].innerHTML}`)
        }
    }
}

function transformToAssocArray(prmstr) {
    var params = {};
    var prmarr = prmstr.substring(1).split("&");
    for (var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}
// *****************************   MongoDB Tools   *****************************

function find_home_mongoDB(id, version) {
    var xmlhttp = new XMLHttpRequest();
    let params = 'item=active&value=yes';
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let results_JSON = JSON.parse(this.responseText);
            document.getElementById('home_td1').innerHTML = ""

            for (let i = 0; i < Object.keys(results_JSON).length; i++) {
                let link = document.createElement('li')
                link.setAttribute('class', 'home_link')
                link.setAttribute('id', `home_link_id${results_JSON[i]['calculator_id']}`)
                let text_name = document.createTextNode(`${results_JSON[i]['mainName']} (Vers.${results_JSON[i]['lastVersion']})`)
                let params_link = `calculator_id=${results_JSON[i]['calculator_id']}&version=${results_JSON[i]['lastVersion']}`
                link.appendChild(text_name)
                document.getElementById('home_td1').appendChild(link)
                document.getElementById(`home_link_id${results_JSON[i]['calculator_id']}`).addEventListener('click', function () { changePage(`calculator`, params_link, '') })
            }

        }
    };
    xmlhttp.open("POST", "mongodb/find_home.php", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
}


function findOne_Calculator_mongoDB(id, version) {
    var xmlhttp = new XMLHttpRequest();
    let params = `id=${id}&version=${version}`
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let results_findOne = JSON.parse(this.responseText);
            console.log(results_findOne)
            importing_calculator(results_findOne)
        }
    };
    xmlhttp.open("POST", "mongodb/findOne_calculator.php", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
}

function testMongoDB() {
    var xmlhttp = new XMLHttpRequest();
    let params = `id=1&version=1`
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText)
            let results_findOne = JSON.parse(this.responseText);
            console.log(results_findOne)
        }
    };
    xmlhttp.open("POST", "mongodb/test.php", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);

}

function deleteAllMongoDB() {
    var xmlhttp = new XMLHttpRequest();
    let params = `id=1&version=1`
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
        }
    };
    xmlhttp.open("POST", "mongodb/delete_all.php", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
}

loadingIndex()
