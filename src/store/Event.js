import { createStore, createEvent, createEffect } from "effector";
import Firebase from "@app/lib/Firebase";

export const allEvents = createStore([]);
export const events = createStore([]);
export const pastEvents = createStore([]);
const loadEvents = createEvent();
const loadPastEvents = createEvent();

events.on(loadEvents, (_, events) => events);
pastEvents.on(loadPastEvents, (_, events) => events);

const db = Firebase.firestore();
const eventsColl = db.collection("events");

export const createNewEvent = createEffect(eventsColl.doc().set);

eventsColl
  .where("scheduled", ">", Date.now())
  .orderBy("scheduled", "asc")
  .onSnapshot((snapshot) => {
    const events = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    loadEvents(events);
  });
eventsColl
  .where("scheduled", "<", Date.now())
  .orderBy("scheduled", "desc")
  .limit(5)
  .onSnapshot((snapshot) => {
    const events = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    loadPastEvents(events);
  });

allEvents.watch(console.log);
