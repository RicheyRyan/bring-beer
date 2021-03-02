<script>
  import { Card } from "svelte-materialify";
</script>

<style>
  .layout {
    max-width: 960px;
    min-width: 320px;
    margin: 0 auto;
    height: calc(100vh - 56px);
    padding-top: 56px;
  }
  @media (max-width: 600px) {
    .layout {
      max-width: 100vw;
    }
  }
</style>

<main class="layout">
  <Card class="pb-5">
    <slot />
  </Card>
  <div id="dialog" />
</main>
