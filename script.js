const cards = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is 2 + 2?", answer: "4" },
  { question: "Who wrote 'Hamlet'?", answer: "William Shakespeare" },
  { question: "Chemical symbol for water?", answer: "H₂O" },
  { question: "Speed of light?", answer: "299,792,458 m/s" }
];

let currentCardIndex = 0;
let flipped = false;
let total = 0;
let correct = 0;
let wrong = 0;

const cardFront = document.getElementById("card-front");
const cardBack = document.getElementById("card-back");
const flashcard = document.getElementById("flashcard");

const totalSpan = document.getElementById("total");
const correctSpan = document.getElementById("correct");
const wrongSpan = document.getElementById("wrong");

window.onload = () => {
  loadCard();
};

function loadCard() {
  flipped = false;
  const card = cards[currentCardIndex];
  cardFront.textContent = card.question;
  cardBack.textContent = card.answer;
  document.querySelector(".card-inner").classList.remove("flipped");
  document.getElementById("feedback").textContent = "";
  document.getElementById("feedback").className = "feedback";

  // Enable buttons
  document.querySelectorAll(".buttons button").forEach(btn => {
    if (btn.textContent === "Correct" || btn.textContent === "Wrong") {
      btn.disabled = false;
      btn.style.opacity = 1;
      btn.style.cursor = "pointer";
    }
  });
}

function flipCard() {
  flipped = true;
  document.querySelector(".card-inner").classList.toggle("flipped");
}

function markAnswer(isCorrect) {
  if (!flipped) {
    alert("Please flip the card to check the answer first.");
    return;
  }

  total++;
  if (isCorrect) {
    correct++;
    showFeedback("Correct!", true);
  } else {
    wrong++;
    showFeedback("Wrong!", false);
  }

  updateStats();

  // Disable marking buttons
  document.querySelectorAll(".buttons button").forEach(btn => {
    if (btn.textContent === "Correct" || btn.textContent === "Wrong") {
      btn.disabled = true;
      btn.style.opacity = 0.6;
      btn.style.cursor = "not-allowed";
    }
  });
}

function showFeedback(message, isCorrect) {
  const feedbackDiv = document.getElementById("feedback");
  feedbackDiv.textContent = message;
  feedbackDiv.className = "feedback " + (isCorrect ? "correct" : "wrong");
}

function updateStats() {
  totalSpan.textContent = total;
  correctSpan.textContent = correct;
  wrongSpan.textContent = wrong;
}

function nextCard() {
  currentCardIndex = (currentCardIndex + 1) % cards.length;
  loadCard();
}
