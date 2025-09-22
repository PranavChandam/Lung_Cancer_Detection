document.addEventListener("DOMContentLoaded", () => {
  const { prediction, confidence } = predictionData;

  const positive = prediction === "Positive" ? confidence : (100 - confidence);
  const negative = prediction === "Negative" ? confidence : (100 - confidence);

  const ctx = document.getElementById("resultChart").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Positive", "Negative"],
      datasets: [
        {
          label: "Prediction Confidence (%)",
          data: [positive, negative],
          backgroundColor: ["#e74c3c", "#2ecc71"]
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          title: { display: true, text: "Confidence (%)" }
        }
      }
    }
  });
});
