let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

function iniciarJuego(){
    let sectionSeleccionarAtaque = document.getElementById('seleccionar__ataque');
    sectionSeleccionarAtaque.style.display = 'none';

    let sectionReiniciar = document.getElementById('reiniciar');
    sectionReiniciar.style.display = 'none';

    let botonMascota = document.getElementById('boton__mascota');
    botonMascota.addEventListener('click', seleccionarMascotaJugador);

    let botonFuego = document.getElementById('boton__fuego');
    botonFuego.addEventListener('click', ataqueFuego);
    let botonAgua = document.getElementById('boton__agua');
    botonAgua.addEventListener('click', ataqueAgua);
    let botonTierra = document.getElementById('boton__tierra');
    botonTierra.addEventListener('click', ataqueTierra);

    let botonReiniciar = document.getElementById('boton__reiniciar');
    botonReiniciar.addEventListener('click', reiniciarJuego);
}

function seleccionarMascotaJugador(){
    let sectionSeleccionarMascota = document.getElementById('seleccionar__mascota');
    sectionSeleccionarMascota.style.display = 'none';

    let sectionSeleccionarAtaque = document.getElementById('seleccionar__ataque');
    sectionSeleccionarAtaque.style.display = 'flex';

    let inputHipodogue = document.getElementById('hipodoge');
    let inputCapipepo = document.getElementById('capipepo');
    let inputRatigueya = document.getElementById('ratigueya');
    let spanMascotaJugador = document.getElementById('mascota__jugador');

    let botonMascota = document.getElementById('boton__mascota');
    botonMascota.disabled = true;

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
    let spanMascotaEnemigo =  document.getElementById('mascota__enemigo');

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
    let spanVidasJugador = document.getElementById('vidas_Jugador');
    let spanVidasEnemigo = document.getElementById('vidas_Enemigo');

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
    let sectionMensajes = document.getElementById('resultado');
    let ataquesDelJugador = document.getElementById('ataques-del-jugador');
    let ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');

    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal){
    let sectionMensajes = document.getElementById('resultado');
    
    // let parrafo = document.createElement('p');
    sectionMensajes.innerHTML = resultadoFinal;

    

    let botonFuego = document.getElementById('boton__fuego');
    botonFuego.disabled = true;
    let botonAgua = document.getElementById('boton__agua');
    botonAgua.disabled = true;
    let botonTierra = document.getElementById('boton__tierra');
    botonTierra.disabled = true;

    let sectionReiniciar = document.getElementById('reiniciar');
    sectionReiniciar.style.display = 'block';
}

function reiniciarJuego(){
    location.reload();
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) +min);
}

window.addEventListener('load', iniciarJuego);