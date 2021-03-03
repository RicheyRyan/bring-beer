<script>
  import { Button, Icon, Divider, Tooltip } from "svelte-materialify";
  import { mdiInformationOutline } from "@mdi/js";
  import { deleteEvent } from "@app/store/Event.js";
  import { loggedInUser } from "@app/store/Auth.js";
  import { users, usersById } from "@app/store/User.js";
  export let event;
  export let readOnly = false;
  let show = false;

  function getMatchedUser() {
    const matchEmail = event.matches[$loggedInUser.email];
    return $usersById[matchEmail];
  }
  const matchedUser = getMatchedUser();
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
      <strong>{matchedUser.displayName || matchedUser.email}</strong>
    </p>
    <p>Their address is:</p>
    {#if Boolean(getMatchedUser().address1)}
      <p>{matchedUser.address1}</p>
      <p>{matchedUser.address2}</p>
      <p>{matchedUser.address3}</p>
    {:else}They didn't even give one{/if}
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
    <Button
      class="red white-text"
      on:click={() => {
        deleteEvent(event);
      }}>
      Delete
    </Button>
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
