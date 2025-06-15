document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cellForm");
  const bonusForm = document.getElementById("bonusForm");
  const resultsSection = document.getElementById("results");
  const feedbackList = document.getElementById("feedbackList");
  const scoreSummary = document.getElementById("scoreSummary");
  const bonusFeedback = document.getElementById("bonusFeedback");

  let submitted = false;
  let bonusSubmitted = false;

  const correctCells = ["phagocyte", "keratinocyte"];
  const tooltips = {
    phagocyte: "Phagocytes engulf and destroy pathogens and are essential in clearing fungal infections.",
    keratinocyte: "Keratinocytes restore the skin barrier and help protect against future infection.",
    erythrocyte: "Erythrocytes transport oxygen — not involved in fungal defense.",
    neuron: "Neurons transmit signals — irrelevant to skin infections."
  };

  const transportSystems = {
    phagocyte: "transported via lymphatic vessels",
    keratinocyte: "migrated locally through epithelial tissue",
    erythrocyte: "redirected to circulatory system — not needed",
    neuron: "flagged for apoptosis"
  };

  const overridePerCell = {
    phagocyte: "Phagocytes missing — deployed to engulf fungal invaders and clear pathogens.",
    keratinocyte: "Keratinocytes missing — sent to restore skin barrier and prevent further breakdown."
  };

  const bonusCorrect = "athletes_foot";

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

    scoreSummary.innerHTML = `
      <p>✅ You selected ${correctCount} correct responder(s).</p>
      ${scienceSummary}
      ${overrideText}
    `;
    resultsSection.style.display = "block";
  });

  bonusForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (bonusSubmitted) return;
    bonusSubmitted = true;

    const selected = bonusForm.elements["diagnosis"].value;
    if (selected === bonusCorrect) {
      bonusFeedback.innerHTML = "🎉 Correct! Athlete’s Foot identified.";
      bonusFeedback.style.color = "green";
    } else {
      bonusFeedback.innerHTML = "❌ Incorrect diagnosis.";
      bonusFeedback.style.color = "red";
    }
  });
});
