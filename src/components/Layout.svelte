<script>
  import { Card } from "svelte-materialify";
</script>

<style>
  .layout {
    max-width: 960px;
    min-width: 320px;
    margin: 0 auto;
    height: calc(100vh - 56px);
  }
</style>

<main class="layout">
  <Card>
    <slot />
  </Card>
</main>
