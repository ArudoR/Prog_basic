const sectionSeleccionarAtaque = document.getElementById('seleccionar__ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascota = document.getElementById('boton__mascota')
const botonFuego = document.getElementById('boton__fuego')
const botonAgua = document.getElementById('boton__agua')
const botonTierra = document.getElementById('boton__tierra')
const botonReiniciar = document.getElementById('boton__reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar__mascota')
const spanMascotaJugador = document.getElementById('mascota__jugador')

const spanMascotaEnemigo =  document.getElementById('mascota__enemigo')

const spanVidasJugador = document.getElementById('vidas_Jugador')
const spanVidasEnemigo = document.getElementById('vidas_Enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')

let mokepones = []
let ataqueJugador;
let ataqueEnemigo;
let opcionDeMokepones
let inputHipodogue
let inputCapipepo
let inputRatigueya

let vidasJugador = 3;
let vidasEnemigo = 3;

class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon('Hipodogue', './assets/hipodogue_img.png', 5)
let capipepo = new Mokepon('Capipepo', './assets/capipepo_img.png', 5)
let ratigueya = new Mokepon('Ratigueya', './assets/ratigueya_img.png', 5)

hipodoge.ataques.push(
    {nombre: '🌊', id: 'boton__agua'},
    {nombre: '🌊', id: 'boton__agua'},
    {nombre: '🌊', id: 'boton__agua'},
    {nombre: '🔥', id: 'boton__fuego'},
    {nombre: '🍃', id: 'boton__tierra'},
)

capipepo.ataques.push(
    {nombre: '🍃', id: 'boton__tierra'},
    {nombre: '🍃', id: 'boton__tierra'},
    {nombre: '🍃', id: 'boton__tierra'},
    {nombre: '🌊', id: 'boton__agua'},
    {nombre: '🔥', id: 'boton__fuego'},
)

ratigueya.ataques.push(
    {nombre: '🔥', id: 'boton__fuego'},
    {nombre: '🔥', id: 'boton__fuego'},
    {nombre: '🔥', id: 'boton__fuego'},
    {nombre: '🌊', id: 'boton__agua'},
    {nombre: '🍃', id: 'boton__tierra'},
)

mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = 'none';
    mokepones.forEach((Mokepon)=>{
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${Mokepon.nombre}>
        <label class="tarjeta_de_mokepon" for=${Mokepon.nombre}>
            <p>${Mokepon.nombre}</p>
            <img src=${Mokepon.foto} alt=${Mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodogue = document.getElementById('Hipodogue')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
    })
    sectionReiniciar.style.display = 'none';
    botonMascota.addEventListener('click', seleccionarMascotaJugador);
    botonFuego.addEventListener('click', ataqueFuego);
    botonAgua.addEventListener('click', ataqueAgua);
    botonTierra.addEventListener('click', ataqueTierra);
    botonReiniciar.addEventListener('click', reiniciarJuego);
}

function seleccionarMascotaJugador(){
    sectionSeleccionarMascota.style.display = 'none';
    sectionSeleccionarAtaque.style.display = 'flex';
    if(inputHipodogue.checked){
        spanMascotaJugador.innerHTML = 'Hipodogue';
    }else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = 'Capipepo';
    }else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = 'Ratigueya';
    }else {
        alert('Ninguna mascota fue seleccionada.');
        reiniciarJuego();
    }

    seleccionarMascotaEnemigo();
}

function seleccionarMascotaEnemigo(){
    let mascotaAleatoria = aleatorio(1,3);
    if (mascotaAleatoria == 1){
        spanMascotaEnemigo.innerHTML = 'Hipodogue';
    }else if(mascotaAleatoria == 2){
        spanMascotaEnemigo.innerHTML = 'Capipepo';
    }else{
        spanMascotaEnemigo.innerHTML = 'Ratigueya';
    }

}

function ataqueFuego(){
    ataqueJugador = 'FUEGO';
    ataqueAleatorioEnemigo();
}

function ataqueAgua(){
    ataqueJugador = 'AGUA';
    ataqueAleatorioEnemigo();
}

function ataqueTierra(){
    ataqueJugador = 'TIERRA';
    ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(1, 3);

    if(ataqueAleatorio == 1){
        ataqueEnemigo = 'FUEGO';
    }else if(ataqueAleatorio == 2){
        ataqueEnemigo = 'AGUA';
    }else{
        ataqueEnemigo = 'TIERRA';
    }

    combate();
}

function combate(){
    
    //COMBATE
    if(ataqueEnemigo == ataqueJugador){
        crearMensaje('¡¡EMPATE!!');
    }else if((ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') || (ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') || (ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA')){
        crearMensaje('¡¡GANASTE!!');
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    }else{
        crearMensaje('¡¡PERDISTE!!');
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
    }

    //Revisar las vidas.
    revisarVidas();
}

function revisarVidas(){
    if(vidasEnemigo == 0){
        crearMensajeFinal("¡¡Felicitaciones Ganaste :D !!");
    }else if(vidasJugador == 0){
        crearMensajeFinal("Lo siento, perdiste :C");
    }
}

function crearMensaje(resultado){
    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal){
    sectionMensajes.innerHTML = resultadoFinal;
    botonFuego.disabled = true;
    botonAgua.disabled = true;
    botonTierra.disabled = true;
    sectionReiniciar.style.display = 'block';
}

function reiniciarJuego(){
    location.reload();
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) +min);
}

window.addEventListener('load', iniciarJuego);