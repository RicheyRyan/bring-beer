<script>
  import * as R from "ramda";
  import {
    Button,
    Icon,
    Divider,
    Tooltip,
    TextField
  } from "svelte-materialify";
  import { mdiInformationOutline, mdiDelete } from "@mdi/js";
  import { deleteEvent, editEvent } from "@app/store/Event.js";
  import { users, usersById, currentUser } from "@app/store/User.js";
  import Validator from "@app/lib/Validator.js";
  import CraftCentral from "@app/lib/CraftCentral.js";
  import FormDialog from "@app/components/FormDialog.svelte";
  export let event;
  export let readOnly = false;
  let show = false;

  function getMatchedUser() {
    if (!event.matches) {
      return null;
    }
    const matchEmail = event.matches[$currentUser.email];
    return $usersById[matchEmail];
  }
  function getUsersBeers() {
    if (!event.beers) return [];
    return event.beers.filter(beer => beer.user === $currentUser.email);
  }
  let matchedUser = getMatchedUser();
  let usersBeers = getUsersBeers();
  let selectBeersActive = false;
  let cartUrl = CraftCentral.generateCartUrl(event.beers);
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
    {#if Boolean(matchedUser.address1)}
      <p>{matchedUser.address1}</p>
      <p>{matchedUser.address2}</p>
      <p>{matchedUser.address3}</p>
    {:else}They didn't even give one{/if}
  {:else}
    <p>The selected beers are:</p>
    {#each event.beers as beer}
      <p>{beer.url}</p>
    {:else}
      <p>No one has selected anything yet</p>
    {/each}
    <div>
      <a href={cartUrl} target="_blank">Checkout now</a>
    </div>
  {/if}
  <p />
  <Divider class="mt-5 mb-5" />
  {#if !readOnly}
    {#if event.type === 'group'}
      <Button
        class="green white-text"
        on:click={() => (selectBeersActive = true)}>
        Select your beers
      </Button>
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
<FormDialog bind:active={selectBeersActive}>
  {#each usersBeers as beer, i (beer.url)}
    <TextField
      bind:value={beer.url}
      outlined
      rules={[Validator.isCraftCentral, Validator.isRequired]}>
      Enter URL for beer
      <div slot="append">
        <Button icon on:click={() => (usersBeers = R.remove(i, 1, usersBeers))}>
          <Icon path={mdiDelete} class="orange-text" />
        </Button>
      </div>
    </TextField>
  {/each}
  <Button
    class="mt-5 mb-5"
    on:click={() => (usersBeers = [...usersBeers, { url: '', user: $currentUser.email }])}>
    Add beer
  </Button>
  <Button
    block
    on:click={() => {
      const beers = R.uniq(R.filter(beer => {
          return Validator.isCraftCentral(beer.url) === true;
        }, usersBeers));
      const otherUsersBeers = R.filter(beer => {
        return beer.user !== $currentUser.email;
      }, event.beers);
      editEvent({ ...event, beers: R.concat(beers, otherUsersBeers) });
      selectBeersActive = false;
    }}
    class="green white-text">
    Save beers
  </Button>
</FormDialog>
