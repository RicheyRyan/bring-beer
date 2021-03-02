import "firebaseui/dist/firebaseui.css";
import firebase from "firebase";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDfipqi2OtlPnIRG0ZxpiTjms27PXIz68M",
  authDomain: "bring-beer.firebaseapp.com",
  databaseURL:
    "https://bring-beer-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bring-beer",
  storageBucket: "bring-beer.appspot.com",
  messagingSenderId: "1095303259468",
  appId: "1:1095303259468:web:e7596811833e508a659be9",
  measurementId: "G-M7EN9DWVW5",
});
export default {
  app() {
    return app;
  },
  auth: firebase.auth,
  firestore: firebase.firestore,
  mapDocuments: (action) => (snapshot) => {
    const events = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    action(events);
  },
};
