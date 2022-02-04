
// C: clob, D:Diamond, H: heart, S:spades

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const cartasEspeciales = ['J', 'Q', 'K', 'A'];
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

const valor = valorCarta2(pedirCarta());

console.log(valor);
