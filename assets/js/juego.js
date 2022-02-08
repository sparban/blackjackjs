

//(()=>{
    
//    'use strict'
    // C: clob, D:Diamond, H: heart, S:spades

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          cartasEspeciales = ['J', 'Q', 'K', 'A'];
    // Puntos de los jugadores

    let puntosJugadores = [0,0];

    // Referencias de html

    const btnPedir = document.querySelector('#btnPedir'),
          btnbtnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');
    // Incluido el resultado del jugador y de la computadora.
    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          resultadoHTML = document.querySelectorAll('small');
/*           divCartasJugador = document.querySelector('#jugador-cartas'),
          divCartasComputadora = document.querySelector('#computadora-cartas'); */
    // Este juego inicializa el juego
    const iniciaizarJuego = (numJugadores = 1) => {
       deck = crearDeck();
       console.log(puntosJugadores);
    };

    const crearDeck = () => {
        deck = [];
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
        return _.shuffle(deck);
    };


    console.log(deck);

    // Funcion para tomar una carta.

    const pedirCarta = () => {
        if (deck.length === 0){
            throw 'Ya no hay cartas en el maso';
        }
        return deck.pop();  // tomar ultima carta del maso

/*         const aleatorio = Math.floor(Math.random() * (deck.length - 0)) + 0;    // Numero aleatorio
        const carta = deck[aleatorio];
        // const carta = deck[aleatorio]
        deck.splice(aleatorio,1);   // Quito la carta seleccionada de la baraja
        return carta; */
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

    // Essta funcion sirve para obtener el valor de la carta y poder sumarlas.
    const valorCarta2 = (carta) => {
        const valor = carta.substring(0, carta.length -1);
        return (isNaN (valor)) ? 
                        (valor === 'A') ? 11:10 
                        : valor*1;
    }

    // Turno 0 = primer jugador y el ultimo sera de la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta2(carta);
        resultadoHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }
    // Funcion para crear la carta en el DOM
    const crearCarta = (carta, turno) =>{
        // Adicionar imagen de la carta al DOM
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        // Agregar carta al div de html
        divCartasJugadores[turno].append(imgCarta);
    }

    // Funcion para determinar el ganador
    const determinarGanador = () => {

        const[puntosJugador, puntosComputadora] = puntosJugadores; 
        
        if (puntosJugador > 21){
            alert('You lose');
        }
        else if (puntosComputadora > 21){
            alert('You win');
        }
        else if (puntosJugador === puntosComputadora){
            alert('anybody win');
        }
        else if (puntosJugador > puntosComputadora )
        {
            alert('you win');
        }
        else{
            alert('You lose');
        }
    }


    // Turno computadora
    const turnoComputadora = (puntosMinimos) => {


        do {
            const carta = pedirCarta();
            const puntosComputadora = acumularPuntos(carta, puntosJugadores.length-1);
    
            // resultado de la computadora
            resultadoHTML[1].innerText = puntosComputadora;
            crearCarta(carta,  puntosJugadores.length-1);
            if (puntosMinimos > 21){
                break;
            }

        } while((puntosComputadora < puntosMinimos) && (puntosMinimos < 21));

        determinarGanador();
    }   

    // Eventos

    btnPedir.addEventListener('click', ()=>{

        const carta = pedirCarta();
        let puntosJugador = acumularPuntos(carta, 0);
        resultadoHTML[0].innerText = puntosJugador;
        crearCarta(carta, 0);
        // Adicionar imagen de la carta al DOM
/*         const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugador.append(imgCarta); */

        //<img class = "carta" src="assets/cartas/2C.png" alt=""></img>
        
        // Evaluar el juego para determinar el ganador
        
        const mensaje = (puntosJugador > 21)  ? (btnPedir.disabled = true, 
                                                btnDetener.disabled = true, 
                                                console.log('Perdiste'),
                                                alert('You lose')):
                        (puntosJugador === 21)? (btnPedir.disabled = true, 
                                                btnDetener.disabled = true, 
                                                console.log('Great, you could win'),
                                                turnoComputadora(puntosJugador)):
                                                console.log('continue with more cards'); 
                                                
    });

    // Logica del boton de detener.

    btnbtnDetener.addEventListener('click', ()=>{
        turnoComputadora(puntosJugadores[0]);
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        divCartasJugadores[0].remove;
        divCartasJugadoreslength.remove;
        //puntosJugador = 0;
        //puntosComputadora = 0;
        puntosJugadores = [0,0]
    });

    // Logica del boton de nuevo juego
    btnNuevo.addEventListener('click', ()=>{

        
        // limpiar consola
        console.clear();
        iniciaizarJuego();
        // reseteo el deck
        deck = [];
        deck = crearDeck();
        console.log(deck);
        // reseteo los puntos en pantalla
        resultadoHTML[0].innerText = 0;
        resultadoHTML[1].innerText = 0;
        // reseteo los puntos de la logica
        puntosJugadores=[0,0];
        // deshabilito botones
        btnPedir.disabled = false;
        btnbtnDetener.disabled = false;
        // limpio la pantalla de las cartas
        divCartasJugadores[0].innerHTML = '';
        divCartasJugadores.length.innerHTML = '';
    });
  

//})();

