const ogs = require("open-graph-scraper");
const options = {
  url:
    "https://craftcentral.ie/collections/frontpage/products/verdant-unconventional-tactics-nelson-sauvin-double-ipa-440ml-can-8-abv?variant=39270728368163",
};

async function main() {
  const { result } = await ogs(options);
  const info = {
    title: result.ogTitle,
    description: result.ogDescription,
    price: Number.parseFloat(result.ogPriceAmount) * 100,
  };

  return info;
}

main();
