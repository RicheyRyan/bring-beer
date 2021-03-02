import * as R from "ramda";

const shuffler = R.curry(function (random, list) {
  var idx = -1;
  var len = list.length;
  var position;
  var result = [];
  while (++idx < len) {
    position = Math.floor((idx + 1) * random());
    result[idx] = result[position];
    result[position] = list[idx];
  }
  return result;
});
const shuffle = shuffler(Math.random);

export default {
  matches(people) {
    let matched = {};
    const shuffled = shuffle(people);
    shuffled.forEach((match, i) => {
      matched[match] = shuffled[i + 1] ?? shuffled[0];
    });
    return matched;
  },
};
