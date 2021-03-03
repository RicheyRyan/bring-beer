import {
  createStore,
  createEvent,
  createEffect,
  combine,
  restore,
} from "effector";
import Firebase from "@app/lib/Firebase";
import * as R from "ramda";
import { loggedInUser } from "@app/store/Auth";

const loadUsers = createEvent();
export const users = restore(loadUsers, []);
export const usersById = users.map((users) =>
  R.reduce((acc, value) => R.assoc(value.email, value, acc), {}, users)
);

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
