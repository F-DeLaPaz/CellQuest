// COO-Key Quote + Audio Logic
const quotes = [
  { text: "Split happens! Let's mitose and roll.", audio: "audio/mitose.mp3" },
  { text: "Stay calm and cytoplasm on.", audio: "audio/cytoplasm.mp3" },
  { text: "No time to waste — cellf-defense mode engaged!", audio: "audio/celldefense.mp3" },
  { text: "I'm not bossy, I’m cytoskeletal.", audio: "audio/bossy.mp3" },
  { text: "Cell ya later, infection!", audio: "audio/cellyalater.mp3" }
];

const quoteBubble = document.getElementById("cookie-quote");
const audioPlayer = new Audio();

document.getElementById("cookie-quote-btn").addEventListener("click", () => {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  quoteBubble.textContent = random.text;
  quoteBubble.style.visibility = "visible";
  quoteBubble.style.opacity = "1";
  setTimeout(() => {
    quoteBubble.style.opacity = "0";
    quoteBubble.style.visibility = "hidden";
  }, 5000);
  audioPlayer.src = random.audio;
  audioPlayer.play();
});

// Cumulative Score Initialization Logic
document.addEventListener("DOMContentLoaded", function () {
  const sidebarScoreDisplay = document.getElementById("sidebarScore");
  if (sidebarScoreDisplay) {
    let currentScore = parseInt(localStorage.getItem("bioforgeScore")) || 0;
    sidebarScoreDisplay.textContent = currentScore;
  }
});
