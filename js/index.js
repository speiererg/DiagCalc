var modifier_nbr = 3
var modifierTyp_nbr = 4
var array_inputs = [];

// Loading 
function loadingIndex(){
    document_addeventlistener()
console.log('test')
}

function document_addeventlistener(){
    document.getElementById('button_calculate').addEventListener('click',click_calculate)
}

function click_calculate(){
for (let i=1;i<=modifier_nbr;i++){
    let array_inputs_oneModifier = [];
for (let k=1;k<=modifierTyp_nbr;k++){
    let input_value = document.getElementById(`input${i}_${k}`).value
    if (document.getElementById(`input${i}_${k}`).value!=''){
        array_inputs_oneModifier.push(input_value)

    }
}
    array_inputs.push(array_inputs_oneModifier);

}
console.log(array_inputs)

}














loadingIndex()


