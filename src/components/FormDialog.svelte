<script>
  import Portal from "svelte-portal";
  import { Button, Dialog } from "svelte-materialify";
  export let active;
</script>

<style>
  @media (max-width: 600px) {
    :global(.s-dialog__content.dialog-form) {
      width: 100%;
      height: 100%;
      max-height: 100%;
      margin: 0;
      border-radius: 0;
    }
  }
</style>

<Portal target="#dialog">
  <Dialog {active} class="dialog-form" fullscreen>
    <section class="pt-5 pl-5 pr-5 ">
      <slot />
    </section>
    <section class="content pt-5 pb-5 pl-5 pr-5 ">
      <Button block on:click={() => (active = !active)} class="red white-text">
        Close
      </Button>
    </section>
  </Dialog>
</Portal>
