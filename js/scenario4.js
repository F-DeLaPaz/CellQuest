
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

  const correctCells = ["cardiomyocyte", "fibroblast"];
  const tooltips = {
    cardiomyocyte: "Cardiomyocytes are specialized muscle cells that help restore heart function.",
    fibroblast: "Fibroblasts aid in tissue repair and help rebuild the heart’s structural integrity.",
    neuron: "Neurons do not repair heart tissue — they transmit signals.",
    platelet: "Platelets help with clotting, not long-term cardiac recovery."
  };

  const transportSystems = {
    cardiomyocyte: "delivered directly to damaged myocardium via coronary circulation",
    fibroblast: "migrated to scar tissue zones for extracellular matrix support",
    neuron: "flagged for apoptosis",
    platelet: "recycled — clotting not required here"
  };

  const overrideQuotes = [
    "Cardiac confusion? You picked wrong — I dropped in fibroblasts to stabilize the area.",
    "Sending neurons to a heart fix is wild — I rerouted fibroblasts to support tissue recovery.",
    "COO-Key override complete. Fibroblasts now en route. Let’s stick to functional fixes, yeah?",
    "I patched up your picks with fibroblasts — heart work takes heart cells, not impulses!"
  ];

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (submitted) return;
    submitted = true;

    const selected = Array.from(form.elements["cell"]).filter(c => c.checked).map(c => c.value);
    let correctCount = 0;
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
      }
    });

    const missedCells = correctCells.filter(c => !selected.includes(c));
    let overrideText = "";
    if (missedCells.includes("fibroblast")) {
      const randomQuote = overrideQuotes[Math.floor(Math.random() * overrideQuotes.length)];
      overrideText = `<p><strong>🧠 COO-Key Override:</strong> ${randomQuote}</p>`;
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
    if (selected === "myocarditis") {
      bonusFeedback.innerHTML = "🎉 Correct! Myocarditis identified. +2 bonus points.";
      bonusFeedback.style.color = "green";
      score += 2;
    } else {
      bonusFeedback.innerHTML = "❌ Incorrect diagnosis. No bonus added.";
      bonusFeedback.style.color = "red";
    }

    totalPointsDisplay.textContent = score;
  });
});
