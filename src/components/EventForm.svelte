<script>
  import * as R from "ramda";
  import { createEventDispatcher } from "svelte";
  import { Button, Checkbox, Radio, TextField } from "svelte-materialify";
  import { users } from "@app/store/User.js";
  import Validator from "@app/lib/Validator.js";

  const dispatch = createEventDispatcher();

  export let event = {
    type: "group",
    scheduled: new Date(),
    exchangeUsers: [],
    beers: []
  };
</script>

<form>
  <TextField
    class="mt-5 mb-3"
    outlined
    type="datetime-local"
    rules={[Validator.isDate, Validator.isRequired]}
    bind:value={event.scheduled}>
    Date
  </TextField>

  <p>Event type:</p>
  <section class="mb-5">
    <Radio bind:group={event.type} value="group" id="event-type-group">
      <label for="event-type-group">Group selection</label>
    </Radio>
    <Radio bind:group={event.type} value="exchange" id="event-type-exchange">
      <label for="event-type-exchange">Exchange</label>
    </Radio>
  </section>
  {#if event.type === 'exchange'}
    <p>Buddies to include in exchange:</p>
    <section class="mb-5">
      {#each $users as user}
        <Checkbox
          bind:group={event.exchangeUsers}
          color="orange"
          value={user.email}>
          {user.email}
        </Checkbox>
      {/each}
      <Button
        class="mt-5"
        on:click={() => (event.exchangeUsers = R.map(R.prop('email'), $users))}>
        Select All
      </Button>
    </section>
  {/if}
  <Button
    block
    on:click={() => {
      dispatch('submitForm', event);
    }}
    class="green white-text">
    Save
  </Button>
</form>
