<script>
  //   import { Chart } from "chart.js"
  import { onMount } from "svelte";
  import { Chart } from "chart.js";
  import PortSelector from "./PortSelector.svelte";
  let w;
  let tictac = true;
  let canvasEl;

  async function refresh() {
    w = await api.getCurrentWeight();
    tictac = !tictac;
    window.config.data.datasets[0].data.shift();
    window.config.data.datasets[0].data.push(w);
    window.myChart.update();
  }

  onMount(async () => {
    // let err = await api.initCommunication('COM3');
    // portList = await api.portsList()
    // console.log(portList)
    // if (err) {
    //   alert(err);
    // } else {
    //   setInterval(refresh, 500);
    // }

    let ctx = canvasEl.getContext("2d");
    window.config = {
      responsive: true,
      type: "line",
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        datasets: [
          {
            label: "Fuerza actual en kg",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                // beginAtZero: true,
                max: 50,
                min: 0,
              },
            },
          ],
        },
      },
    };
    window.myChart = new Chart(ctx, window.config);
  });
</script>

<div class="flex flex-row justify-end">
  <div class="mr-2">Puerto serial</div>
  <PortSelector />
</div>
<div
  class="flex flex-col items-center rounded shadow border-2 border-yellow-500 w-full"
>
  <h7>Lectura:</h7>
  <h5 class="font-mono text-3xl text-red-500">{w}{tictac ? "🟢" : "🔵"}</h5>
</div>
<div class="relative">
  <canvas id="canvas" bind:this={canvasEl} />
</div>
