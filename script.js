/* ==========================================
   1. MOCÃO CELESTE: EXERCÍCIO DE RESPIRAÇÃO
   ========================================== */
let breathingInterval;
let isBreathing = false;

function toggleBreathing() {
    const circle = document.getElementById('breathing-circle');
    const text = document.getElementById('breathing-text');
    const btn = document.getElementById('btn-breath');

    if (!isBreathing) {
        isBreathing = true;
        btn.innerText = "Parar Respiração";
        runBreathingCycle();
        breathingInterval = setInterval(runBreathingCycle, 8000); // Ciclo completo de 8 segundos
    } else {
        isBreathing = false;
        clearInterval(breathingInterval);
        btn.innerText = "Iniciar Respiração";
        text.innerText = "Clique em Iniciar";
        circle.classList.remove('grow');
    }
}

function runBreathingCycle() {
    const circle = document.getElementById('breathing-circle');
    const text = document.getElementById('breathing-text');

    // Inspire (4 segundos)
    text.innerText = "Inspire...";
    circle.classList.add('grow');

    // Expire (4 segundos)
    setTimeout(() => {
        if(isBreathing) {
            text.innerText = "Expire...";
            circle.classList.remove('grow');
        }
    }, 4000);
}

/* ==========================================
   2. JOGO STARDEW VALLEY: MEMÓRIA DA FAZENDA
   ========================================== */
const items = ['🍎', '🍓', '🌽', '🌻', '🥕', '🍇'];
let cardsData = [...items, ...items]; // Duplica para criar os pares
let flippedCards = [];
let matchedPairs = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function initMemoryGame() {
    const board = document.getElementById('memory-board');
    board.innerHTML = '';
    flippedCards = [];
    matchedPairs = 0;
    
    const shuffledItems = shuffle([...cardsData]);

    shuffledItems.forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = item;
        card.dataset.id = index;
        card.innerText = '❓'; // Ícone escondido
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.innerText = this.dataset.value;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === items.length) {
            setTimeout(() => alert('Parabéns! Você colheu todas as plantinhas no seu tempo! 🌾✨'), 300);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerText = '❓';
            card2.innerText = '❓';
            flippedCards = [];
        }, 1000);
    }
}

// Inicia o jogo de memória assim que carregar a página
window.onload = () => {
    initMemoryGame();
};
