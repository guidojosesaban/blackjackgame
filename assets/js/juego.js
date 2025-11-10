let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let cartasJugador = [];
let cartasComputadora = [];

let puntosJugador = 0;
let puntosComputadora = 0;

let saldo = 1000;
let apuestaActual = 0;
let cartaOcultaComputadora = null;
let imgCartaOcultaDOM = null;

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const puntosHTML = document.querySelectorAll('small');

const saldoDisplay = document.querySelector('#saldo-actual-valor');
const saldoModalApuesta = document.querySelector('#saldo-modal-apuesta');

const modalApuesta = document.querySelector('#modal-apuesta');
const inputApuesta = document.querySelector('#input-apuesta');
const btnApostar = document.querySelector('#btnApostar');
const errorApuesta = document.querySelector('#error-apuesta');

const modalResultado = document.querySelector('#modal-resultado');
const modalTitulo = document.querySelector('#modal-titulo');
const modalMensaje = document.querySelector('#modal-mensaje');
const btnCerrarModal = document.querySelector('#btnCerrarModal');
const btnNuevaPartidaModal = document.querySelector('#btnNuevaPartidaModal');

const inicializarJuego = () => {
    actualizarSaldoDisplay();
    crearDeck();
    btnPedir.disabled = true;
    btnDetener.disabled = true;
};

const crearDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }
    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }
    deck = _.shuffle(deck); 
};

const pedirCarta = () => {
    if (deck.length === 0) {
        crearDeck();
        alert('Se acabaron las cartas. Barajando de nuevo.');
    }
    return deck.pop();
};

const valorCartaSimple = (carta) => {
    const valor = carta.slice(0, -1);
    return isNaN(valor) ? (valor === 'A' ? 11 : 10) : parseInt(valor);
};

const calcularPuntos = (cartas) => {
    let total = 0;
    let ases = 0;

    for (let carta of cartas) {
        const valor = valorCartaSimple(carta);
        if (valor === 11) {
            ases++;
        }
        total += valor;
    }

    while (total > 21 && ases > 0) {
        total -= 10;
        ases--;
    }
    return total;
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const actualizarSaldoDisplay = () => {
    saldoDisplay.innerText = `$${saldo}`;
    saldoModalApuesta.innerText = `$${saldo}`;
};

const crearImgCarta = (carta, divContenedor) => {
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divContenedor.append(imgCarta);
};

const crearCartaOculta = () => {
    const divOculta = document.createElement('div');
    divOculta.classList.add('carta-oculta');
    divCartasComputadora.append(divOculta);
    return divOculta;
};

const mostrarModalResultado = (titulo, mensaje) => {
    modalTitulo.innerText = titulo;
    modalMensaje.innerText = mensaje;
    modalResultado.classList.add('mostrar');
};

const toggleModalApuesta = (mostrar = true) => {
    if (mostrar) {
        inputApuesta.value = '';
        errorApuesta.innerText = '';
        actualizarSaldoDisplay();
        modalApuesta.classList.add('mostrar');
        inputApuesta.focus();
    } else {
        modalApuesta.classList.remove('mostrar');
    }
};

const accionPedirCarta = () => {
    const carta = pedirCarta();
    cartasJugador.push(carta);
    puntosJugador = calcularPuntos(cartasJugador);
    
    puntosHTML[0].innerText = puntosJugador;
    crearImgCarta(carta, divCartasJugador);

    if (puntosJugador > 21) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora();
    } else if (puntosJugador === 21) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora();
    }
};

const accionDetener = () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora();
};

const turnoComputadora = async () => {
    imgCartaOcultaDOM.remove();
    crearImgCarta(cartaOcultaComputadora, divCartasComputadora);
    
    puntosComputadora = calcularPuntos(cartasComputadora);
    puntosHTML[1].innerText = puntosComputadora;
    
    await sleep(800);

    while ((puntosComputadora < 17) && (puntosJugador <= 21)) {
        await sleep(600);

        const carta = pedirCarta();
        cartasComputadora.push(carta);
        puntosComputadora = calcularPuntos(cartasComputadora);
        
        puntosHTML[1].innerText = puntosComputadora;
        crearImgCarta(carta, divCartasComputadora);
    }

    determinarGanador();
};

const determinarGanador = () => {
    setTimeout(() => {
        let titulo = '';
        let mensaje = '';

        if (puntosJugador > 21) {
            titulo = '¡Perdiste! 😫';
            mensaje = `Te pasaste de 21. Pierdes tu apuesta de $${apuestaActual}.`;
        } else if (puntosComputadora > 21) {
            titulo = '¡Ganaste! 🎉';
            mensaje = `La computadora se pasó de 21. ¡Ganas $${apuestaActual * 2}!`;
            saldo += (apuestaActual * 2);
        } else if (puntosComputadora === puntosJugador) {
            titulo = '¡Empate! (Push) 🤝';
            mensaje = `Ambos tienen ${puntosJugador}. Se te devuelve tu apuesta de $${apuestaActual}.`;
            saldo += apuestaActual;
        } else if (puntosComputadora > puntosJugador) {
            titulo = '¡Perdiste! 😥';
            mensaje = `La computadora gana con ${puntosComputadora}. Pierdes tu apuesta de $${apuestaActual}.`;
        } else {
            titulo = '¡Ganaste! 🏆';
            mensaje = `¡Felicitaciones! Ganas con ${puntosJugador} contra ${puntosComputadora}. ¡Recibes $${apuestaActual * 2}!`;
            saldo += (apuestaActual * 2);
        }

        actualizarSaldoDisplay();
        mostrarModalResultado(titulo, mensaje);
        btnPedir.disabled = true;
        btnDetener.disabled = true;

    }, 800);
};

const iniciarNuevaPartida = () => {
    const apuestaInput = parseInt(inputApuesta.value);

    if (isNaN(apuestaInput) || apuestaInput <= 0 || apuestaInput > saldo) {
        errorApuesta.innerText = 'Monto no válido. Introduce un valor correcto.';
        return;
    }
    
    apuestaActual = apuestaInput;
    saldo -= apuestaActual;
    actualizarSaldoDisplay();
    toggleModalApuesta(false);
    
    if (deck.length < 15) {
        crearDeck();
    } 

    cartasJugador = [];
    cartasComputadora = [];
    puntosJugador = 0;
    puntosComputadora = 0;
    cartaOcultaComputadora = null;
    imgCartaOcultaDOM = null;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;
    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';
    modalResultado.classList.remove('mostrar');

    btnPedir.disabled = false;
    btnDetener.disabled = false;

    accionPedirCarta();
    setTimeout(accionPedirCarta, 500);

    setTimeout(() => {
        const carta1 = pedirCarta();
        cartasComputadora.push(carta1);
        puntosHTML[1].innerText = valorCartaSimple(carta1); 
        crearImgCarta(carta1, divCartasComputadora);

        cartaOcultaComputadora = pedirCarta();
        cartasComputadora.push(cartaOcultaComputadora);
        imgCartaOcultaDOM = crearCartaOculta(); 
        
        if (puntosJugador === 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;

            setTimeout(() => {
                const puntosCompTotal = calcularPuntos(cartasComputadora);
                
                if (puntosCompTotal === 21) {
                    imgCartaOcultaDOM.remove(); 
                    crearImgCarta(cartaOcultaComputadora, divCartasComputadora); 
                    puntosHTML[1].innerText = puntosCompTotal; 
                    
                    setTimeout(determinarGanador, 500);

                } else {
                    saldo += (apuestaActual * 2); 
                    actualizarSaldoDisplay();
                    mostrarModalResultado('¡BLACKJACK! ♠️', `¡Ganaste con 21 de inicio! ¡Recibes $${apuestaActual * 2}!`);
                }

            }, 800); 

        } 
    }, 1000);
};


btnPedir.addEventListener('click', accionPedirCarta);

btnDetener.addEventListener('click', accionDetener);

btnNuevo.addEventListener('click', () => {
    if (saldo <= 0) {
        alert("¡Te has quedado sin saldo! Recargando a $1000.");
        saldo = 1000;
    }
    toggleModalApuesta(true);
});

btnApostar.addEventListener('click', iniciarNuevaPartida);
inputApuesta.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        iniciarNuevaPartida();
    }
});


btnCerrarModal.addEventListener('click', () => modalResultado.classList.remove('mostrar'));

btnNuevaPartidaModal.addEventListener('click', () => {
    modalResultado.classList.remove('mostrar');
    
    if (saldo <= 0) {
        alert("¡Te has quedado sin saldo! Recargando a $1000.");
        saldo = 1000;
    }
    toggleModalApuesta(true);
});

inicializarJuego();