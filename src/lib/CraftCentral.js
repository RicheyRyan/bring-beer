import * as R from "ramda";
export default {
  parseVariant(url) {
    const [, variant] = url.split("?");
    const id = new URLSearchParams(variant).get("variant");
    return id;
  },
  generateCartUrl(beers) {
    const root = "https://craftcentral.ie/cart/";
    if (!beers || beers.length === 0) return "";
    const url = R.reduce(
      (acc, curr) => {
        const id = this.parseVariant(curr.url);
        return acc + `${id}:1,`;
      },
      "",
      beers
    );
    return `${root}${url}`;
  },
};
