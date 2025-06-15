document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cellForm");
  const bonusForm = document.getElementById("bonusForm");
  const resultsSection = document.getElementById("results");
  const feedbackList = document.getElementById("feedbackList");
  const scoreSummary = document.getElementById("scoreSummary");
  const bonusFeedback = document.getElementById("bonusFeedback");

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

  const overridePerCell = {
    cardiomyocyte: "Cardiomyocytes missing — dispatched to restore contractile function and heartbeat strength.",
    fibroblast: "Fibroblasts missing — deployed to stabilize and rebuild extracellular matrix in cardiac tissue."
  };

  const bonusCorrect = "myocarditis";

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
      bonusFeedback.innerHTML = "🎉 Correct! Myocarditis identified.";
      bonusFeedback.style.color = "green";
    } else {
      bonusFeedback.innerHTML = "❌ Incorrect diagnosis. No bonus added.";
      bonusFeedback.style.color = "red";
    }
  });
});
