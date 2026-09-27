let distance = 10.00;
let initialDistance = 10.00;
let tilt = 0.00;
let riskScore = 10;

const distanceElement = document.getElementById("distance");
const displacementElement = document.getElementById("displacement");
const tiltElement = document.getElementById("tilt");
const riskElement = document.getElementById("riskScore");

const statusElement = document.getElementById("status");
const messageElement = document.getElementById("message");


// Create graph
const ctx = document.getElementById("sensorChart");

const chart = new Chart(ctx, {

    type: "line",

    data: {
        labels: [],
        datasets: [{
            label: "Displacement (cm)",
            data: [],
            tension: 0.3
        }]
    },

    options: {
        responsive: true,

        scales: {
            y: {
                beginAtZero: true
            }
        }
    }

});


// Generate simulated sensor readings
function updateSensors() {

    distance += (Math.random() - 0.45) * 0.05;

    tilt += (Math.random() - 0.45) * 0.05;

    if (tilt < 0) {
        tilt = 0;
    }

    let displacement = distance - initialDistance;

    riskScore =
        Math.abs(displacement) * 12 +
        tilt * 8;

    if (riskScore > 100) {
        riskScore = 100;
    }


    // Display values

    distanceElement.innerText =
        distance.toFixed(2) + " cm";

    displacementElement.innerText =
        displacement.toFixed(2) + " cm";

    tiltElement.innerText =
        tilt.toFixed(2) + "°";

    riskElement.innerText =
        Math.round(riskScore) + " / 100";


    // Determine risk

    if (riskScore < 30) {

        statusElement.innerText = "NORMAL";

        statusElement.className = "normal";

        messageElement.innerText =
            "Ground conditions are currently stable.";

    }

    else if (riskScore < 60) {

        statusElement.innerText = "WARNING";

        statusElement.className = "warning";

        messageElement.innerText =
            "Abnormal ground movement detected. Continue monitoring.";

    }

    else {

        statusElement.innerText = "HIGH RISK";

        statusElement.className = "high";

        messageElement.innerText =
            "Significant deformation trend detected. Immediate assessment is required.";

    }


    // Update graph

    const time =
        new Date().toLocaleTimeString();

    chart.data.labels.push(time);

    chart.data.datasets[0].data.push(
        Math.abs(displacement)
    );


    if (chart.data.labels.length > 20) {

        chart.data.labels.shift();

        chart.data.datasets[0].data.shift();

    }

    chart.update();

}


// Update every 2 seconds

setInterval(updateSensors, 2000);

updateSensors();