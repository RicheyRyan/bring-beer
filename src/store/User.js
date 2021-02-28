import { createStore, createEvent, forward, createEffect } from "effector";
import Firebase from "@app/lib/Firebase";

export const users = createStore([]);
const loadUsers = createEvent();

users.on(loadUsers, (_, users) => users);

const db = Firebase.firestore();
const usersColl = db.collection("users");

usersColl.onSnapshot((snapshot) => {
  const users = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  loadUsers(users);
});

users.watch(console.log);
