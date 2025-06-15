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

  const correctCells = ["melanocyte", "keratinocyte"];
  const tooltips = {
    melanocyte: "Melanocytes produce melanin to absorb and block harmful UV rays.",
    keratinocyte: "Keratinocytes repair skin and rebuild the protective barrier.",
    neuron: "Neurons transmit sensory data — not used for healing sunburn.",
    platelet: "Platelets help with clotting but are not needed here."
  };

  const transportSystems = {
    melanocyte: "migrated to epidermis to reinforce UV shielding",
    keratinocyte: "generated in the basal layer and migrated upward",
    neuron: "flagged for apoptosis — irrelevant to surface burns",
    platelet: "rerouted to circulatory standby — no bleeding detected"
  };

  const overrideQuotes = [
    "Whoops — neurons again? This isn’t a pain puzzle. I rerouted keratinocytes for healing.",
    "No blood, no platelets. I deployed keratinocytes instead to do the real work.",
    "Let’s not send neurons to do a skin cell’s job. Healing crew patched in!"
  ];

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
        deployedCells.push(cell);
        correctCount++;
      } else {
        li.style.color = "red";
      }
      feedbackList.appendChild(li);
    });

    const missedCells = correctCells.filter(c => !selected.includes(c));
    let overrideText = "";
    if (missedCells.includes("keratinocyte")) {
      const quote = overrideQuotes[Math.floor(Math.random() * overrideQuotes.length)];
      overrideText = `<p><strong>🧠 COO-Key Override:</strong> ${quote}</p>`;
    }

    const scienceSummary = deployedCells.map(c =>
      `💡 BioForge generated ${c}s via mitosis and ${transportSystems[c]}.`
    ).join("<br>");

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
    if (selected === "sunburn") {
      bonusFeedback.innerHTML = "🎉 Correct! Sunburn identified. +2 bonus points.";
      bonusFeedback.style.color = "green";
      score += 2;
    } else {
      bonusFeedback.innerHTML = "❌ Incorrect. This was a basic UV burn.";
      bonusFeedback.style.color = "red";
    }

    totalPointsDisplay.textContent = score;
  });
});
