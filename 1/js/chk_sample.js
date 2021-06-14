import { Str } from "https://code4fukui.github.io/mojikiban/Str.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";

const names = [
  "第1水準",
  "第2水準",
  "第3水準",
  "第4水準",
  "非漢字",
];

const jisx0213c = new Str(names.map(name => {
  const s = new Str(Deno.readTextFileSync("../sample/JISX0213_" + name + ".txt"));
  console.log(name + ": " + s.length, "unique: ", ArrayUtil.isUnique(s));
  return s;
}).join(""));

const jisx0213 = new Str(await Deno.readTextFile("../sample/JISX0213.txt"));
console.log(jisx0213c == jisx0213);
console.log(jisx0213c.length, jisx0213.length);

for (const c of jisx0213) {
  const n = jisx0213c.indexOf(c);
  if (n < 0) {
    throw new Error(c + " is not found in jisx0213c");
  }
}

for (const c of jisx0213c) {
  const n = jisx0213.indexOf(c);
  if (n < 0) {
    throw new Error(c + " is not found in jisx0213");
  }
}
console.log("all same!");
