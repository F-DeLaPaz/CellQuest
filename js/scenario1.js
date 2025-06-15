document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cellForm");
  const bonusForm = document.getElementById("bonusForm");
  const resultsSection = document.getElementById("results");
  const feedbackList = document.getElementById("feedbackList");
  const scoreSummary = document.getElementById("scoreSummary");
  const totalPointsDisplay = document.getElementById("totalPoints");
  const bonusFeedback = document.getElementById("bonusFeedback");

  let score = 0;
  let submitted = false;
  let bonusSubmitted = false;

  const correctCells = ["phagocyte", "keratinocyte"];
  const tooltips = {
    phagocyte: "Phagocytes engulf and destroy pathogens and are essential in clearing fungal infections.",
    keratinocyte: "Keratinocytes restore the skin barrier and help protect against future infection.",
    erythrocyte: "Erythrocytes (red blood cells) transport oxygen — not involved in fungal defense.",
    neuron: "Neurons transmit signals — irrelevant to skin infections."
  };

  const transportSystems = {
    phagocyte: "transported via lymphatic vessels",
    keratinocyte: "migrated locally through epithelial tissue",
    erythrocyte: "redirected to circulatory system — not needed",
    neuron: "flagged for apoptosis"
  };

  const overrideQuotes = [
    "Nice start, rookie — but you forgot the patch crew! I sent keratinocytes in to rebuild the barrier.",
    "Neurons? For a fungal toe rash? That’s bold. I patched in keratinocytes — they'll fix the skin up right.",
    "Erythrocytes? We’re not short on oxygen. Recycled those and shipped in keratinocytes to patch the breach.",
    "Don’t sweat it — I’ve got your cytoplasm covered. Keratinocytes dispatched!"
  ];

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (submitted) return;
    submitted = true;

    const selected = Array.from(form.elements["cell"]).filter(c => c.checked).map(c => c.value);
    let correctCount = 0;
    let overrideTriggered = false;
    let deployedCells = [];

    selected.forEach(cell => {
      const li = document.createElement("li");
      li.textContent = `${cell.charAt(0).toUpperCase() + cell.slice(1)}: ${tooltips[cell]}`;
      if (correctCells.includes(cell)) {
        li.style.color = "green";
        correctCount++;
        deployedCells.push(cell);
      } else {
        li.style.color = "red";
        feedbackList.appendChild(li);
        overrideTriggered = true;
      }
      feedbackList.appendChild(li);
    });

    const missedCells = correctCells.filter(c => !selected.includes(c));
    let overrideText = "";
    if (missedCells.includes("keratinocyte")) {
      overrideTriggered = true;
      const randomQuote = overrideQuotes[Math.floor(Math.random() * overrideQuotes.length)];
      overrideText = `<p><strong>🛠️ COO-Key Override:</strong> ${randomQuote}</p>`;
    }

    const scienceSummary = deployedCells.map(c => {
      return `💡 BioForge generated hundreds of ${c}s via mitosis and ${transportSystems[c]}.`;
    }).join("<br>");

    score += correctCount;
    scoreSummary.innerHTML = `
      <p>✅ You selected ${correctCount} correct responder(s).</p>
      ${scienceSummary}
      ${overrideText}
      <p><strong>Total Score:</strong> ${score}</p>
    `;
    totalPointsDisplay.textContent = score;
    resultsSection.style.display = "block";
  });

  bonusForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (bonusSubmitted) return;
    bonusSubmitted = true;

    const selected = bonusForm.elements["diagnosis"].value;
    if (selected === "athletes_foot") {
      bonusFeedback.innerHTML = "🎉 Correct! Athlete’s Foot identified. +2 bonus points.";
      bonusFeedback.style.color = "green";
      score += 2;
    } else {
      bonusFeedback.innerHTML = "❌ Incorrect diagnosis. No bonus added.";
      bonusFeedback.style.color = "red";
    }

    totalPointsDisplay.textContent = score;
  });

  Object.entries(tooltips).forEach(([cell, tip]) => {
    const input = form.querySelector(`input[value="${cell}"]`);
    if (input) input.title = tip;
  });
});
