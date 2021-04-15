<script>
  import Content from "./Content.svelte";
  import Layout from "./Layout.svelte";
  import Footer from "./Footer.svelte";
  import Tailwindcss from "./Tailwindcss.svelte"
</script>
<Tailwindcss></Tailwindcss>
<Layout>
  <div slot="content">
    <Content />
  </div>
  <div slot="footer">
    <Footer />
  </div>
</Layout>
