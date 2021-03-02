import { createStore, createEvent, createEffect } from "effector";
import Firebase from "@app/lib/Firebase";
import Exchange from "@app/lib/Exchange";
import * as R from "ramda";
import produce from "immer";

export const allEvents = createStore([]);
export const events = createStore([]);
export const pastEvents = createStore([]);
const loadEvents = createEvent();
const loadPastEvents = createEvent();

events.on(loadEvents, (_, events) => events);
pastEvents.on(loadPastEvents, (_, events) => events);

const db = Firebase.firestore();
const eventsColl = db.collection("events");

export const createNewEvent = createEffect((event) => {
  eventsColl.doc().set(
    produce(event, (draft) => {
      draft.scheduled = new Date(event.scheduled).getTime();
      if (event.type === "exchange") {
        draft.matches = Exchange.matches(event.exchangeUsers);
      }
    })
  );
});

export const editEvent = createEffect((event) => {
  eventsColl.doc(event.id).set(
    produce(event, (draft) => {
      draft.scheduled = new Date(event.scheduled).getTime();
      if (draft.type === "exchange") {
        draft.matches = Exchange.matches(event.exchangeUsers);
      }
    })
  );
});

export const deleteEvent = createEffect((event) => {
  eventsColl.doc(event.id).delete();
});

eventsColl
  .where("scheduled", ">", Date.now())
  .orderBy("scheduled", "asc")
  .onSnapshot(Firebase.mapDocuments(loadEvents));
eventsColl
  .where("scheduled", "<", Date.now())
  .orderBy("scheduled", "desc")
  .limit(5)
  .onSnapshot(Firebase.mapDocuments(loadPastEvents));

events.watch(console.log);
