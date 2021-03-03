import { createStore, createEvent, createEffect, combine } from "effector";
import Firebase from "@app/lib/Firebase";
import * as R from "ramda";
import { loggedInUser } from "@app/store/Auth";

export const users = createStore([]);
export const usersById = users.map((users) =>
  R.reduce((acc, value) => R.assoc(value.email, value, acc), {}, users)
);
const loadUsers = createEvent();

// usersById.watch(console.log);

users.on(loadUsers, (_, users) => users);

const db = Firebase.firestore();
const usersColl = db.collection("users");

usersColl.onSnapshot(Firebase.mapDocuments(loadUsers));

export const editUser = createEffect((user) => {
  usersColl.doc(user.id).set(user);
});

export const currentUser = combine(
  loggedInUser,
  usersById,
  (user, usersById) => {
    return usersById[user?.email ?? ""];
  }
);

currentUser.watch(console.log);
