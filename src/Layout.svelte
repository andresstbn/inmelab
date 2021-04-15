<script>
  import Logo from "./img/inmetar_mpq.png";
</script>

<div class="table w-full">
  <div class="table-row w-full p-1">
    <div class="table-cell w-1/4 bg-green-500">
      <div class="flex flex-row justify-center items-center bg-green-600 p-1">
        <div class="bg-white rounded-sm p-1 w-9">
          <img src={Logo} alt="" />
        </div>
        <h1 class="px-1 text-yellow-50 text-xl" style="font-family: Gugi, sans">
          InmeLAB
        </h1>
      </div>
    </div>
    <div class="table-cell w-full align-middle bg-green-400">
      <div class="h-full flex flex-row items-center justify-end">
        <h3
          class="text-green-50 font-bold text-xl font-mono px-2"
          style="font-family: Chakra Petch, sans"
        >
          Ensayos de Malla Electrosoldada
        </h3>
      </div>
    </div>
  </div>
  <div class="table-row w-full">
    <div class="table-cell bg-green-300 p-2 align-top">
      <div class="flex flex-col space-y-2">
        <button class="btn-main">Ensayo Malla</button>
        <button class="btn-main">Ensayo Grafil</button>
        <button class="btn-main">Ir a SGInmetar</button>
      </div>
    </div>
    <div class="table-cell w-full py-4 px-2 bg-green-100">
      <slot name="content" />
    </div>
  </div>
</div>
<slot name="footer" />

<style lang="postcss">
  .btn-main {
    @apply w-full bg-blue-300 shadow py-2;
  }
  .btn-main:hover {
    @apply shadow bg-gradient-to-r from-blue-800 to-blue-500 text-blue-50;
  }
</style>
