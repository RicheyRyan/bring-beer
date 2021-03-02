<script>
  import { onMount } from "svelte";
  import Firebase from "@app/lib/Firebase";
  import { auth } from "firebaseui";
  const ui = new auth.AuthUI(Firebase.auth());
  onMount(() => {
    ui.start("#firebaseui-auth-container", {
      signInSuccessUrl: "/",
      signInOptions: [Firebase.auth.EmailAuthProvider.PROVIDER_ID]
    });
  });
</script>

<article id="firebaseui-auth-container" />
