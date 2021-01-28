
const ctx = document.getElementById('canvas').getContext('2d');
window.config = {
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
document.addEventListener("DOMContentLoaded", async () => {
    await api.initCommunication()
    setInterval(() => { api.getCurrentWeight().then(w => console.log(w)) }, 1000);
})
//

// port.on('data', function (data) {
//     let peso = bufferToFloat(data);
//     tictac = !tictac;
//     document.querySelector("#js-peso").innerText = `${peso} kg${tictac ? '○' : '●'}`
//     console.log(window.config)
//     if(tictac){
//         window.config.data.datasets[0].data.shift()
//         window.config.data.datasets[0].data.push(peso)
//         window.myChart.update()
//     }
//     // port.flush();
// })