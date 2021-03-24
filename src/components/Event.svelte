<script>
  import * as R from "ramda";
  import {
    Alert,
    Button,
    Icon,
    Divider,
    Tooltip,
    TextField
  } from "svelte-materialify";
  import { mdiInformationOutline, mdiDelete } from "@mdi/js";
  import { deleteEvent, editEvent } from "@app/store/Event.js";
  import { usersById, currentUser } from "@app/store/User.js";
  import Validator from "@app/lib/Validator.js";
  import CraftCentral from "@app/lib/CraftCentral.js";
  import FormDialog from "@app/components/FormDialog.svelte";
  import EventForm from "@app/components/EventForm.svelte";
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
  let editFormActive = false;
  let cartUrl;
  $: cartUrl = CraftCentral.generateCartUrl(event.beers);
  let beerTotalPrice;
  $: beerTotalPrice = R.reduce(
    (total, { price }) => total + price,
    0,
    event.beers
  );
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
      {#if beer.title}
        <p>
          <a href={beer.url}>{beer.title}</a>
        </p>
        <p>{beer.description}</p>
        <p>Added by: {$usersById[beer.user].displayName}</p>
      {:else}
        <p>{beer.url}</p>
      {/if}
    {:else}
      <p>No one has selected anything yet</p>
    {/each}
    {#if beerTotalPrice < 2500}
      <Alert class="orange-text" border="left" coloredBorder>
        Total cost of beers doesn't meet the minimum shipping limit of 25 euro.
      </Alert>
    {/if}
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
    <Button
      class="green white-text"
      on:click={() => {
        editFormActive = true;
      }}>
      Edit event
    </Button>
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
<FormDialog bind:active={editFormActive}>
  <EventForm
    on:submitForm={e => {
      editFormActive = false;
      editEvent(e.detail);
    }}
    bind:event
    edit />
</FormDialog>
