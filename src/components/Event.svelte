<script>
  import { Button, Icon, Divider, Tooltip } from "svelte-materialify";
  import { mdiInformationOutline } from "@mdi/js";
  export let event;
  export let readOnly = false;
  let show = false;
</script>

<style>
  .event {
    width: 100%;
  }
</style>

<section class="event pt-5">
  {#if event.type === 'exchange'}
    <p>
      Your buddy is:
      <strong>{event.buddy}</strong>
    </p>
    <p>Their address is:</p>
    <p>{event.address1}</p>
    <p>{event.address2}</p>
    <p>{event.address3}</p>
  {:else}
    <p>The selected beers are:</p>
    <a
      href="https://craftcentral.ie/cart/39247336374307:1,39247316615203:1"
      target="_blank">
      Checkout now
    </a>
  {/if}
  <p />
  <Divider class="mt-5 mb-5" />
  {#if !readOnly}
    {#if event.type === 'group'}
      <Button class="green white-text">Select your beers</Button>
    {/if}
    <Button class="green white-text">Edit event</Button>
    <Button class="red white-text">Delete</Button>
  {/if}
  <Button icon on:click={() => (show = !show)}>
    <Icon path={mdiInformationOutline} />
  </Button>
  <Tooltip top bind:active={show}>
    <span slot="tip">
      {#if event.type === 'exchange'}
        You are randomly given a buddy to buy beer for, better pick something
        they like
      {:else}We select a couple of beers each and try them all together{/if}
    </span>
  </Tooltip>
</section>
