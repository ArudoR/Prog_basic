const sectionSeleccionarAtaque = document.getElementById('seleccionar__ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascota = document.getElementById('boton__mascota')
const botonFuego = document.getElementById('boton__fuego')
const botonAgua = document.getElementById('boton__agua')
const botonTierra = document.getElementById('boton__tierra')
const botonReiniciar = document.getElementById('boton__reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar__mascota')
const inputHipodogue = document.getElementById('hipodoge')
const inputCapipepo = document.getElementById('capipepo')
const inputRatigueya = document.getElementById('ratigueya')
const spanMascotaJugador = document.getElementById('mascota__jugador')

const spanMascotaEnemigo =  document.getElementById('mascota__enemigo')

const spanVidasJugador = document.getElementById('vidas_Jugador')
const spanVidasEnemigo = document.getElementById('vidas_Enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')


let mokepones = []
let ataqueJugador;
let ataqueEnemigo;
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

let hipodoge = new Mokepon('Hipodogue', './assets/DALL·E 2023-03-09 10.49.13 - hipodoge great creature of a 3d videogame fight with a sword its a combination of a hipopotamus and shiba inu meme in rusia train station.png', 5)

let capipepo = new Mokepon('Capipepo', './assets/DALL·E 2023-03-17 11.42.03 - I am looking for an image of a pokemon-like creature that is similar to a capybara that controls electrical powers and is located inside a subway stat.png', 5)

let ratigueya = new Mokepon('Ratigueya', './assets/DALL·E 2023-03-17 11.47.37 - a digital art image of a rather large and imposing tiger-like pokemon-like creature with angry facial features that are rodent-like.png', 5)

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


function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = 'none';
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