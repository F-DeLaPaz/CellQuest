document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cellForm");
  const bonusForm = document.getElementById("bonusForm");
  const resultsSection = document.getElementById("results");
  const scoreSummary = document.getElementById("scoreSummary");
  const deliverySummary = document.getElementById("deliverySummary");
  const bonusFeedback = document.getElementById("bonusFeedback");

  const correctCells = ["mast", "goblet"];
  const bonusCorrect = "allergic_conjunctivitis";

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const checked = [...form.querySelectorAll("input[name='cell']:checked")].map(i => i.value);
    deliverySummary.innerHTML = "";
    let points = 0;

    if (checked.includes("mast")) {
      deliverySummary.innerHTML += "<li><strong>Mast Cells</strong> created via mitosis and dispatched to trigger histamine response.</li>";
      points++;
    } else {
      deliverySummary.innerHTML += "<li><strong>Mast Cells</strong> were not deployed. Eye remains itchy!</li>";
    }

    if (checked.includes("goblet")) {
      deliverySummary.innerHTML += "<li><strong>Goblet Cells</strong> generated to maintain tear film and trap allergens.</li>";
      points++;
    } else {
      deliverySummary.innerHTML += "<li><strong>Goblet Cells</strong> missing — mucus shield incomplete!</li>";
    }

    const wrongCells = checked.filter(c => !correctCells.includes(c));
    wrongCells.forEach(cell => {
      deliverySummary.innerHTML += `<li><strong>${cell.charAt(0).toUpperCase() + cell.slice(1)} Cells</strong> flagged for apoptosis. Not needed in eye defense!</li>`;
    });

    if (!checked.includes("mast") || !checked.includes("goblet")) {
      deliverySummary.innerHTML += `<li><strong>🧠 COO-Key Override:</strong> “Hold up! You're missing key cells. I’ve sent backup goblets and mast cells to fix this mess.”</li>`;
    }

    scoreSummary.innerText = `Scenario Score: ${points}/2`;
    resultsSection.style.display = "block";
  });

  bonusForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const selected = bonusForm.querySelector("input[name='diagnosis']:checked");
    if (selected) {
      bonusFeedback.textContent = selected.value === bonusCorrect
        ? "✅ Correct! Allergic Conjunctivitis identified."
        : "❌ Not quite. The symptoms point to Allergic Conjunctivitis.";
    }
  });
});
