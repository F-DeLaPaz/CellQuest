document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cellForm");
  const bonusForm = document.getElementById("bonusForm");
  const resultsSection = document.getElementById("results");
  const feedbackList = document.getElementById("feedbackList");
  const scoreSummary = document.getElementById("scoreSummary");
  const totalPointsDisplay = document.getElementById("totalPoints");
  const sidebarScoreDisplay = document.getElementById("sidebarScore");
  const bonusFeedback = document.getElementById("bonusFeedback");

  let score = parseInt(localStorage.getItem("bioforgeScore")) || 0;
  sidebarScoreDisplay.textContent = score;
  totalPointsDisplay.textContent = score;

  let submitted = false;
  let bonusSubmitted = false;

  const correctCells = ["mast", "goblet"];
  const tooltips = {
    mast: "Mast Cells release histamines to initiate allergic responses.",
    goblet: "Goblet Cells secrete mucus to trap allergens and protect eye surfaces.",
    osteocyte: "Osteocytes maintain bone — irrelevant for eye defense.",
    neuron: "Neurons transmit signals — not involved in mucosal protection."
  };

  const transportSystems = {
    mast: "dispatched to conjunctiva via lymphatic vessels",
    goblet: "deployed to mucosal surfaces of the eye",
    osteocyte: "flagged for apoptosis",
    neuron: "flagged for apoptosis"
  };

  const overridePerCell = {
    mast: "Mast Cells missing — deployed to trigger histamine release and initiate immune response.",
    goblet: "Goblet Cells missing — deployed to secrete mucus and trap allergens on the eye surface."
  };

  const bonusCorrect = "allergic_conjunctivitis";

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (submitted) return;
    submitted = true;

    const selected = Array.from(form.elements["cell"]).filter(c => c.checked).map(c => c.value);
    let correctCount = 0;
    let deployedCells = [];
    feedbackList.innerHTML = "";

    selected.forEach(cell => {
      const li = document.createElement("li");
      li.textContent = `${cell.charAt(0).toUpperCase() + cell.slice(1)}: ${tooltips[cell]}`;
      if (correctCells.includes(cell)) {
        li.style.color = "green";
        correctCount++;
        deployedCells.push(cell);
      } else {
        li.style.color = "red";
      }
      feedbackList.appendChild(li);
    });

    let overrideText = "";
    const missedCells = correctCells.filter(c => !selected.includes(c));
    if (missedCells.length > 0) {
      overrideText = "<p><strong>🧠 COO-Key Override:</strong><br>";
      missedCells.forEach(cell => {
        overrideText += `💡 ${overridePerCell[cell]}<br>`;
      });
      overrideText += "</p>";
    }

    const scienceSummary = deployedCells.map(c =>
      `💡 BioForge generated hundreds of ${c}s via mitosis and ${transportSystems[c]}.`
    ).join("<br>");

    score += correctCount;
    localStorage.setItem("bioforgeScore", score);
    sidebarScoreDisplay.textContent = score;
    totalPointsDisplay.textContent = score;

    scoreSummary.innerHTML = `
      <p>✅ You selected ${correctCount} correct responder(s).</p>
      ${scienceSummary}
      ${overrideText}
      <p><strong>Total Score:</strong> ${score}</p>
    `;
    resultsSection.style.display = "block";
  });

  bonusForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (bonusSubmitted) return;
    bonusSubmitted = true;

    const selected = bonusForm.elements["diagnosis"].value;
    if (selected === bonusCorrect) {
      bonusFeedback.innerHTML = "🎉 Correct! Allergic Conjunctivitis identified. +2 bonus points.";
      bonusFeedback.style.color = "green";
      score += 2;
    } else {
      bonusFeedback.innerHTML = "❌ Incorrect diagnosis. No bonus added.";
      bonusFeedback.style.color = "red";
    }

    localStorage.setItem("bioforgeScore", score);
    sidebarScoreDisplay.textContent = score;
    totalPointsDisplay.textContent = score;
  });
});
