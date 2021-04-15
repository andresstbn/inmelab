<script>
  import { onMount } from "svelte";
    let portList =[];
    let selectedPort;

    onMount(async () => {
    // let err = await api.initCommunication('COM3');
    portList = await api.portsList()
    console.log(portList)
    })

    async function  initComHandler(){
        let err = await api.initCommunication(selectedPort);
    }

</script>

<select class="select" bind:value={selectedPort}>
    {#each portList as port}
        <option value="{port.path}">{port.path} {port.manufacturer}</option>
    {/each}
</select>
<button class="button"
on:click={initComHandler}
>
    Con.
</button>

<style lang="postcss">

.select{
    @apply border border-gray-700 rounded
}

.button{
    @apply rounded border border-green-400 text-green-400
}
</style>

