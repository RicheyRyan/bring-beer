import { restore, createEvent, forward, createEffect } from "effector";
import Firebase from "@app/lib/Firebase";
import { navigate } from "svelte-routing";

const loggedIn = createEvent();
const loggedOut = createEvent();

export const loggedInUser = restore(loggedIn, {}).reset(loggedOut);

forward({
  from: loggedIn,
  to: createEffect(() => navigate("/")),
});
forward({
  from: loggedOut,
  to: createEffect(() => navigate("/login")),
});

Firebase.auth(Firebase.app()).onAuthStateChanged(function (fbUser) {
  if (fbUser) {
    loggedIn(fbUser);
  } else {
    loggedOut();
  }
});
Firebase.auth(Firebase.app()).onIdTokenChanged(function (fbUser) {
  if (fbUser) {
    loggedIn(fbUser);
  } else {
    loggedOut();
  }
});
