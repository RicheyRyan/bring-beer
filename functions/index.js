const functions = require("firebase-functions");
const ogs = require("open-graph-scraper");
const R = require("ramda");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

async function getData(beer) {
  const { result } = await ogs(beer);
  return {
    title: result.ogTitle,
    description: result.ogDescription,
    price: Number.parseFloat(result.ogPriceAmount) * 100,
  };
}

exports.augmentEvent = functions.firestore
  .document("events/{eventId}")
  .onUpdate(async (change, context) => {
    const data = change.after.data();
    functions.logger.info("Original data", { data });
    const eventId = data.id;
    const beerExtraData = await Promise.all(data.beers.map(getData));
    const newBeers = data.beers.map((beer, i) =>
      R.merge(beer, beerExtraData[i])
    );
    return db.collection("events").doc(eventId).update({ beers: newBeers });
  });
