<script>
  import {
    Alert,
    Button,
    ExpansionPanels,
    ExpansionPanel,
    Subheader
  } from "svelte-materialify";
  import { events, pastEvents } from "@app/store/Event.js";
  import Event from "@app/components/Event.svelte";
  import EventHeader from "@app/components/EventHeader.svelte";
</script>

<article>
  {#if events.length === 0}
    <Alert class="orange-text" border="left" coloredBorder>
      No events scheduled yet, make one!
    </Alert>
  {:else}
    <Subheader>Upcoming</Subheader>
    <ExpansionPanels accordion>
      {#each $events as event}
        <ExpansionPanel>
          <span slot="header">
            <EventHeader {event} />
          </span>
          <Event {event} />
        </ExpansionPanel>
      {/each}
    </ExpansionPanels>
    <Subheader class="mt-3">Past</Subheader>
    <ExpansionPanels accordion>
      {#each $pastEvents as event}
        <ExpansionPanel>
          <span slot="header">
            <EventHeader {event} />
          </span>
          <Event {event} readOnly />
        </ExpansionPanel>
      {/each}
    </ExpansionPanels>
  {/if}
</article>
