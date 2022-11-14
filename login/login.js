var rectangleLogin = document.getElementById("rectangleLogin")
windowsMax = window.innerWidth -100
windowsMaxHeight = window.innerHeight - 400

let xz=1
let yz=1

setInterval(() => {
    let x = Number(rectangleLogin.style.left.slice(0, -2))
    let y = Number(rectangleLogin.style.bottom.slice(0, -2))

        if (x > windowsMax|| x<100){xz=xz*-1}
        if (y > windowsMaxHeight|| y<100){yz=yz*-1}
    rectangleLogin.style.left = `${x+(xz*0.4)}px`
    rectangleLogin.style.bottom = `${y+(yz*0.4)}px`
}, 1);

document.getElementById('logo_spital_inselgruppe').addEventListener('click', function (event){event.target.setAttribute('class','logo_activated') })
document.getElementById('logo_spital_luzern').addEventListener('click', function (event){event.target.setAttribute('class','logo_activated') })