<script>
  import {
    Alert,
    ExpansionPanels,
    ExpansionPanel,
    Subheader
  } from "svelte-materialify";
  let events = [{ type: "exchange" }, { type: "group" }, { type: "exchange" }];
</script>

<article>
  {#if events.length === 0}
    <Alert class="orange-text" border="left" coloredBorder>
      No events scheduled yet, make one!
    </Alert>
  {:else}
    <Subheader>Upcoming</Subheader>
    <ExpansionPanels accordion>
      {#each events as event}
        <ExpansionPanel>
          <span slot="header">{event.type}</span>
          Sample event
        </ExpansionPanel>
      {/each}
    </ExpansionPanels>
    <Subheader class="mt-3">Past</Subheader>
  {/if}
</article>
