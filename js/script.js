const quotes = [
  "Split happens! Let's mitose and roll.",
  "Stay calm and cytoplasm on.",
  "No time to waste cellf-defense mode: engaged!",
  "Mitosis: it's division with precision!",
  "Don't just stand there generate something!",
  "These orders aren't going to dispatch themselves.",
  "Clone today, heal tomorrow.",
  "Welcome to BioForge where replication meets dedication!",
  "I'm not bossy, I’m cytoskeletal.",
  "Cell ya later, infection!"
];
const quoteBubble = document.getElementById("cookie-quote");
document.getElementById("cookie-quote-btn").addEventListener("click", () => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteBubble.textContent = quote;
  quoteBubble.style.visibility = "visible";
  quoteBubble.style.opacity = "1";
  setTimeout(() => {
    quoteBubble.style.opacity = "0";
    quoteBubble.style.visibility = "hidden";
  }, 5000);
});
