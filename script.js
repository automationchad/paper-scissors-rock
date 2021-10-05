// Define starting scores

const computerScoreSpan = document.querySelector("[data-computer-score]");
const tieScoreSpan = document.querySelector("[data-tie-score]");
const yourScoreSpan = document.querySelector("[data-your-score]");

// Link Button Clicks with user choice & compute winner

const selectionButtons = document.querySelectorAll("[data-selection]");

console.log(yourScoreSpan.textContent);
const SELECTIONS = [
  {
    name: "rock",
    icon: "/rock.png",
    beats: "scissors",
  },
  {
    name: "paper",
    icon: "/paper.png",
    beats: "rock",
  },
  {
    name: "scissors",
    icon: "/scissors.png",
    beats: "paper",
  },
];

// Computer Choice Function

function randomSelection() {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
  return SELECTIONS[randomIndex];
}

selectionButtons.forEach((selectionButton) => {
  selectionButton.addEventListener("click", (e) => {
    const selectionName = selectionButton.dataset.selection;
    const selection = SELECTIONS.find(
      (selection) => selection.name === selectionName
    );
    makeSelection(selection);
    document.querySelector(".your-big-icon").src = selection.icon;
    document.querySelector(".round-number").textContent =
      Number(document.querySelector(".round-number").textContent) + 1;
  });
});

function makeSelection(selection) {
  const computerChoice = randomSelection();
  document.querySelector(".computer-big-icon").src = computerChoice.icon;
  const yourWinner = isWinner(selection, computerChoice);
  const computerWinner = isWinner(computerChoice, selection);

  if (yourWinner) {
    incrementScore(yourScoreSpan);
    displayMessage("😄 YOU WIN!");
  } else if (computerWinner) {
    incrementScore(computerScoreSpan);
    displayMessage("😭 YOU LOSE");
  } else {
    incrementScore(tieScoreSpan);
    displayMessage("TIE");
  }
}

function isWinner(selection, opponentChoice) {
  return selection.beats === opponentChoice.name;
}

function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}

function displayMessage(message) {
  document.querySelector(".message").textContent = message;
}
