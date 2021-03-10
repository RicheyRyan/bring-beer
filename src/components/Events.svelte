<script>
  import {
    Alert,
    Button,
    ExpansionPanels,
    ExpansionPanel,
    Icon,
    Subheader,
    NavigationDrawer
  } from "svelte-materialify";
  import { mdiPlus } from "@mdi/js";
  import { events, pastEvents, createNewEvent } from "@app/store/Event.js";
  import Event from "@app/components/Event.svelte";
  import EventHeader from "@app/components/EventHeader.svelte";
  import EventForm from "@app/components/EventForm.svelte";
  import FormDialog from "@app/components/FormDialog.svelte";
  let active = false;
</script>

<style>
  :global(.s-btn.add) {
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 3;
  }
  :global(.s-navigation-drawer.add-form) {
    height: 100%;
  }
</style>

<article class="article">
  <Subheader>Upcoming</Subheader>
  <ExpansionPanels accordion>
    {#each $events as event, i (event.id)}
      <ExpansionPanel>
        <span slot="header">
          <EventHeader {event} />
        </span>
        <Event {event} />
      </ExpansionPanel>
    {:else}
      <Alert class="orange-text" border="left" coloredBorder>
        No events scheduled, make one!
      </Alert>
    {/each}
  </ExpansionPanels>
  <Subheader class="mt-3">Past</Subheader>
  <ExpansionPanels accordion>
    {#each $pastEvents as event, i (event.id)}
      <ExpansionPanel>
        <span slot="header">
          <EventHeader {event} />
        </span>
        <Event {event} readOnly />
      </ExpansionPanel>
    {:else}No past events yet!{/each}
  </ExpansionPanels>
</article>
<Button
  fab
  size="default"
  class="add orange white-text"
  on:click={() => (active = !active)}>
  <Icon path={mdiPlus} />
</Button>
<FormDialog bind:active>
  <EventForm
    on:submitForm={e => {
      active = false;
      createNewEvent(e.detail);
    }} />
</FormDialog>
