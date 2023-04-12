const sectionSeleccionarAtaque = document.getElementById('seleccionar__ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascota = document.getElementById('boton__mascota')

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
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodogue
let inputCapipepo
let inputRatigueya
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0

let vidasJugador = 3;
let vidasEnemigo = 3;

let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, x = 10, y = 10){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x = x
        this.y = y
        this.ancho = 60
        this.alto = 60
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon('Hipodogue', './assets/hipodogue_img.png', 5, './assets/hipodogue.png')
let capipepo = new Mokepon('Capipepo', './assets/capipepo_img.png', 5, './assets/capipepo.png')
let ratigueya = new Mokepon('Ratigueya', './assets/ratigueya_img.png', 5, './assets/ratigueya.png')

let hipodogeEnemigo = new Mokepon('Hipodogue', './assets/hipodogue_img.png', 5, './assets/hipodogue.png', 80, 120)
let capipepoEnemigo = new Mokepon('Capipepo', './assets/capipepo_img.png', 5, './assets/capipepo.png', 150, 95)
let ratigueyaEnemigo = new Mokepon('Ratigueya', './assets/ratigueya_img.png', 5, './assets/ratigueya.png', 200, 190)

hipodoge.ataques.push(
    {nombre: '🌊', id: 'boton__agua'},
    {nombre: '🌊', id: 'boton__agua'},
    {nombre: '🌊', id: 'boton__agua'},
    {nombre: '🔥', id: 'boton__fuego'},
    {nombre: '🍃', id: 'boton__tierra'},
)

hipodogeEnemigo.ataques.push(
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

capipepoEnemigo.ataques.push(
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

ratigueyaEnemigo.ataques.push(
    {nombre: '🔥', id: 'boton__fuego'},
    {nombre: '🔥', id: 'boton__fuego'},
    {nombre: '🔥', id: 'boton__fuego'},
    {nombre: '🌊', id: 'boton__agua'},
    {nombre: '🍃', id: 'boton__tierra'},
)

mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = 'none';
    sectionVerMapa.style.display = 'none'

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
    botonReiniciar.addEventListener('click', reiniciarJuego);
}

function seleccionarMascotaJugador(){
    sectionSeleccionarMascota.style.display = 'none';

    if(inputHipodogue.checked){
        spanMascotaJugador.innerHTML = inputHipodogue.id
        mascotaJugador = inputHipodogue.id
    }else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    }else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    }else {
        alert('Ninguna mascota fue seleccionada.');
        reiniciarJuego();
    }

    extraerAtaques(mascotaJugador);
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function extraerAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++){
        if(mascotaJugador === mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) =>{
        ataquesMokepon = `
        <button id=${ataque.id} class="boton_de_ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById('boton__fuego')
    botonAgua = document.getElementById('boton__agua')
    botonTierra = document.getElementById('boton__tierra')
    botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque(){
    botones.forEach((boton)=>{
        boton.addEventListener('click',(e)=>{
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#f9ebc4'
                boton.disabled = true
            } else if(e.target.textContent === '🌊'){
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#f9ebc4'
                boton.disabled = true
            } else{
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#f9ebc4'
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })

}

function seleccionarMascotaEnemigo(enemigo){
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo(){
    console.log('Ataques enemigo: ', ataquesMokeponEnemigo);
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length -1);

    if(ataqueAleatorio == 0 || ataqueAleatorio == 1){
        ataqueEnemigo.push('FUEGO')
    }else if(ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push('AGUA')
    }else{
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea(){
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
    for (let i = 0; i < ataqueJugador.length; i++) {
        if(ataqueJugador[i] === ataqueEnemigo[i]){
            indexAmbosOponentes(i, i)
            crearMensaje('¡¡EMPATE!!')
        }else if((ataqueJugador[i] === 'FUEGO' && ataqueEnemigo[i] === 'TIERRA') || (ataqueJugador[i] === 'AGUA' && ataqueEnemigo[i] === 'FUEGO') || (ataqueJugador[i] === 'TIERRA' && ataqueEnemigo[i] === 'AGUA')){
            indexAmbosOponentes(i, i)
            crearMensaje('¡¡GANASTE!!')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else{
            indexAmbosOponentes(i, i)
            crearMensaje('¡¡PERDISTE!!')
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }

    //Revisar las vidas.
    revisarVictorias();
}

function revisarVictorias(){
    if(victoriasJugador === victoriasEnemigo){
        crearMensajeFinal("Esto fue un empate!!!")
    }else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("¡FELICITACIONES! Ganaste :D")
    }else{
        crearMensajeFinal("Lo siento, PERDISTE :C")
    }
}

function crearMensaje(resultado){
    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal){
    sectionMensajes.innerHTML = resultadoFinal;  
    sectionReiniciar.style.display = 'block';
}

function reiniciarJuego(){
    location.reload();
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) +min);
}

function pintarCanvas(){
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y =  mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY

    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()
    hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()

    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
        revisarColision(hipodogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
    }
}

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5 
}

function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento(){ 
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break;
        case 'ArrowDown':
            moverAbajo()
            break;
        case 'ArrowLeft':
            moverIzquierda()
            break;
        case 'ArrowRight':
            moverDerecha()
            break;
        default:
            break;
    }
}

function iniciarMapa(){
    mapa.width = 450
    mapa.height = 350
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    console.log(mascotaJugadorObjeto, mascotaJugador);
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++){
        if(mascotaJugador === mokepones[i].nombre){
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ){
        return;
    }

    detenerMovimiento()
    clearInterval(intervalo)
    console.log('Se detecto una colision');
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego);