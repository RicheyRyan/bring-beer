<script>
  export let event;
  let date;
  $: date = new Intl.DateTimeFormat("en-IE", {
    dateStyle: "full",
    timeStyle: "short"
  }).format(new Date(event.scheduled));
</script>

{#if event.type === 'exchange'}Exchange{:else}Group selection{/if}
- {date}
