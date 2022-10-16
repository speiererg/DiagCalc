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
array_inputs_oneModifier.push(document.getElementById(`input${i}_${k}`))
}
    array_inputs.push("Lemon");

}
console.log(array_inputs)

}














loadingIndex()


