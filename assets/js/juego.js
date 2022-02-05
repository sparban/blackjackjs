
// C: clob, D:Diamond, H: heart, S:spades

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const cartasEspeciales = ['J', 'Q', 'K', 'A'];
let puntosJugador = 0;
let puntosComputadora = 0;

// Referencias de html

const btnPedir = document.querySelector('#btnPedir');
const btnbtnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
// Incluido el resultado del jugador y de la computadora.
const resultadoJugador = document.querySelectorAll('small'); 
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');


const crearDeck = () => {
    for(let i = 2; i <=10; i++){
        for (let tipo of tipos){
            deck.push(i + tipo);
        }
    }
    for (let especial of cartasEspeciales){
        for (let tipo of tipos){
            deck.push(especial + tipo);
        }
    }

    // Funcion para barajar 
    deck = _.shuffle(deck);

    return deck;
};

crearDeck();

console.log(deck);

// Funcion para tomar una carta.

const pedirCarta = () => {
    if (deck.length === 0){
        throw 'Ya no hay cartas en el maso';
    }
    const aleatorio = Math.floor(Math.random() * (deck.length - 0)) + 0;    // Numero aleatorio
    const carta = deck[aleatorio];
    // const carta = deck[aleatorio]
    deck.splice(aleatorio,1);   // Quito la carta seleccionada de la baraja
    return carta;
};


/* for (let i=0; i<=52; i++){
    pedirCarta();
    console.log(deck);
} */


// Funcion para obtener el nombre de la carta

/* const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length -1);
    let puntos = 0;

    if (isNaN(valor)){
        puntos = (valor === 'A') ? 11:10;
    }
    else{
        puntos = valor*1;
    }

    return puntos;
} */

const valorCarta2 = (carta) => {
    const valor = carta.substring(0, carta.length -1);
    return (isNaN (valor)) ? 
                    (valor === 'A') ? 11:10 
                    : valor*1;
}



// Eventos

btnPedir.addEventListener('click', ()=>{

    const carta = pedirCarta();
    const valor = valorCarta2(carta);
    puntosJugador = puntosJugador + valor;
    resultadoJugador[0].innerText = puntosJugador;

    // Adicionar imagen de la carta al DOM
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    //<img class = "carta" src="assets/cartas/2C.png" alt=""></img>
     
    // Evaluar el juego para determinar el ganador
    
    const mensaje = (puntosJugador > 21)  ? (btnPedir.disabled = true, 
                                            btnDetener.disabled = true, 
                                            console.log('Perdiste'),
                                            turnoComputadora(puntosJugador)):
                    (puntosJugador === 21)? (btnPedir.disabled = true, 
                                            btnDetener.disabled = true, 
                                            console.log('Great, you could win'),
                                            turnoComputadora(puntosJugador)):
                                            console.log('continue with more cards'); 
                                               
});

    // Logica del boton de detener.

    btnbtnDetener.addEventListener('click', ()=>{
        turnoComputadora(puntosJugador);
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    });

    // Turno computadora
const turnoComputadora = (puntosMinimos) => {

    do {
    const carta = pedirCarta();
    const valor = valorCarta2(carta);
    puntosComputadora = puntosComputadora + valor;
    // resultado de la computadora
    resultadoJugador[1].innerText = puntosComputadora;

    // Adicionar imagen de la carta al DOM
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    // Agregar carta al div de html
    divCartasComputadora.append(imgCarta);

    if (puntosMinimos > 21){
        break;
    }

    } while((puntosComputadora < puntosMinimos) && (puntosMinimos < 21));
}     

// Todo:borrar

