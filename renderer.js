
const ctx = document.getElementById('canvas').getContext('2d');
window.config = {
    responsive: true,
    type: 'line',
    data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        datasets: [{
            label: 'Fuerza actual en kg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    // beginAtZero: true,
                    max: 50,
                    min: 0,
                }
            }]
        }
    }
}
window.myChart = new Chart(ctx, config);

// window.addEventListener('resize', () => console.log("resize"))
document.addEventListener("DOMContentLoaded", async () => {
    let err = await api.initCommunication();
    console.log("ERROR", err)
    if (err) {
        alert(err);
    } else {
        setInterval(refresh, 1000);
    }
})
let tictac = true;
function refresh() {
    api.getCurrentWeight().then(w => {
        console.log(w)
        tictac = !tictac;
        document.querySelector("#js-peso").innerText = `${w} kg${tictac ? '○' : '●'}`
        if (tictac) {
            window.config.data.datasets[0].data.shift()
            window.config.data.datasets[0].data.push(w)
            window.myChart.update()
        }
    });
}