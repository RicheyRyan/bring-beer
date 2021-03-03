<script>
  import { onMount } from "svelte";
  import { Button, TextField } from "svelte-materialify";
  import { currentUser, editUser } from "@app/store/User";
  import { loggedInUser } from "@app/store/Auth.js";

  let user = null;
  $: user = $currentUser;
</script>

<form>
  {#if user}
    <TextField bind:value={user.displayName} outlined type="text">
      Display name
    </TextField>
    <TextField bind:value={user.address1} outlined type="text">
      Address 1
    </TextField>
    <TextField bind:value={user.address2} outlined type="text">
      Address 2
    </TextField>
    <TextField bind:value={user.address3} outlined type="text">
      Address 3
    </TextField>
    <Button class="green white-text" on:click={() => editUser({ ...user })}>
      Save
    </Button>
  {/if}
</form>
