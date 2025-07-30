const emojis = ['😺', '🐶', '🦊', '🐻', '🐼', '🐸', '🐵', '🐯'];
let gameArray;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
const totalPairs = emojis.length;

const board = document.getElementById('gameBoard');
const resetBtn = document.getElementById('resetBtn');
const messageBox = document.getElementById('message'); // 🔄 added

function startGame() {
  messageBox.textContent = ""; // 🔄 clear win message on reset
  board.innerHTML = "";
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  matchedPairs = 0;

  gameArray = [...emojis, ...emojis];
  gameArray.sort(() => 0.5 - Math.random());

  gameArray.forEach(emoji => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="inner">
        <div class="front">${emoji}</div>
        <div class="back">❓</div>
      </div>
    `;

    card.addEventListener('click', () => {
      if (lockBoard || card.classList.contains('flipped')) return;

      card.classList.add('flipped');

      if (!firstCard) {
        firstCard = card;
        return;
      }

      secondCard = card;
      lockBoard = true;

      const isMatch =
        firstCard.querySelector('.front').textContent ===
        secondCard.querySelector('.front').textContent;

      if (isMatch) {
        matchedPairs++;
        resetTurn();

        if (matchedPairs === totalPairs) {
          setTimeout(() => {
            // 🔄 Replace popup with inline message
            messageBox.textContent = "🎉 You Win! All pairs matched.";
          }, 300);
        }

      } else {
        setTimeout(() => {
          firstCard.classList.remove('flipped');
          secondCard.classList.remove('flipped');
          resetTurn();
        }, 800);
      }
    });

    board.appendChild(card);
  });
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

resetBtn.addEventListener('click', startGame);
startGame();
