import { createStore, createEvent } from "effector";
import Firebase from "@app/lib/Firebase";
import * as R from "ramda";

export const users = createStore([]);
export const usersById = users.map((users) =>
  R.reduce((acc, value) => R.assoc(value.email, value, acc), {}, users)
);
const loadUsers = createEvent();

users.on(loadUsers, (_, users) => users);

const db = Firebase.firestore();
const usersColl = db.collection("users");

usersColl.onSnapshot(Firebase.mapDocuments(loadUsers));
