<script>
  import { onMount } from "svelte";
  import firebase from "firebase";
  import { auth } from "firebaseui";
  const ui = new auth.AuthUI(firebase.auth());
  onMount(() => {
    ui.start("#firebaseui-auth-container", {
      signInSuccessUrl: "/",
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
    });
  });
</script>

<article id="firebaseui-auth-container" />
