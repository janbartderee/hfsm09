const ctx = document.getElementById("flevolandChart").getContext("2d");
const flevolandChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: [
      "Almere",
      "Lelystad",
      "Noordoostpolder",
      "Dronten",
      "Zeewolde",
      "Urk",
    ],
    datasets: [
      {
        label: "Inwoners per gemeente",
        data: [226500, 84080, 50035, 44354, 23899, 21958],
        backgroundColor: [
          "royalblue",
          "purple",
          "lightblue",
          "navy",
          "darkcyan",
          "mediumpurple",
        ],
        borderWidth: 0,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});