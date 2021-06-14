import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";
import { Str } from "https://code4fukui.github.io/mojikiban/Str.js";

const cinfo = await Deno.readTextFile("../CharacterInformation.txt");
// 0 "U+0"から"U+10FFFF"の範囲
// 1 JIS 1-4, 5非漢字、空白" " はJIS外？
// 2 1:常用漢字、2
// 3 e-Tax
// 4 学年別
// 5 NISA
// 6 eLTAX

const names = [
  "第1水準",
  "第2水準",
  "第3水準",
  "第4水準",
  "非漢字",
];

const ucs2s = (s) => {
  const uc = s.match(/^U\+([\dABCDEF]+)(\+[\dABCDEF]+)?$/)
  if (!uc) {
    throw new Error("unknow unicode format: " + s2[0]);
  }
  const c1 = String.fromCodePoint(parseInt(uc[1], 16));
  return uc[2] ? c1 + String.fromCodePoint(parseInt(uc[2], 16)) : c1;
};
const s2ucs = (s) => {
  if (s.length == 1) {
    return "U+" + s.codePointAt(0).toString(16).toUpperCase();
  } else if (s.length == 2) {
    return "U+" + s.codePointAt(0).toString(16).toUpperCase() + "+" + s.codePointAt(1).toString(16).toUpperCase();
  } else {
    throw new Error("can't convert");
  }
};

const ss = cinfo.split("\r\n");
const data = [];
let map = {};
let jismap = {};
let nsep = 0;
for (const s of ss) {
  if (!s.startsWith("U+")) {
    continue;
  }
  const s2 = s.split(",");
  const chk = ucs2s(s2[0]);
  const s20 = s2[0].substring(2);
  if (s20.indexOf("+") >= 0) {
    console.log(s2[0], chk);
    nsep++;
  } else if (s20.indexOf("_") >= 0) {
    console.log(s2[0], chk);
    nsep++;
  }
  //console.log(chk);
  //map[cp] = s2.splice(1);
  if (map[chk]) {
    throw new Error("duplicated: " + map[chk] + " / " + s); // nothing!?
  }
  map[chk] = s;
  if (s2[1] >= 1 && s2[1] <= 5) {
    jismap[chk] = s;
  }
  data.push(s2);
}
console.log("nchars", Object.keys(map).length, data.length); // 24762
console.log("njis", Object.keys(jismap).length, "unique", ArrayUtil.isUnique(Object.keys(jismap))); // 11237
console.log(nsep);
await Deno.writeTextFile("../sample/JISX0213.json", JSON.stringify(Object.keys(jismap)));
for (let i = 1; i <= 6; i++) {
  const res = data.filter(d => d[4] == i).map(d => ucs2s(d[0])).join("");
  //console.log(i, res);
  await Deno.writeTextFile(`../sample/小学${i}年.txt`, res)
}
await Deno.writeTextFile("../sample/nisa.txt", data.filter(d => d[5] == 1).map(d => ucs2s(d[0])).join(""));
await Deno.writeTextFile("../sample/JISX0213.txt", data.filter(d => d[1] >= 1 && d[1] <= 5).map(d => ucs2s(d[0])).join(""));
await names.forEach(async (name, idx) => {
  const filtered = data.filter(d => d[1] == 1 + idx);
  const cs = filtered.map(d => ucs2s(d[0]));
  console.log(name, filtered.length, ArrayUtil.isUnique(cs)); // 1183
  const txt = cs.join("");
  const chk = new Str(txt);
  console.log(chk.length);

  await Deno.writeTextFile(`../sample/JISX0213_${name}.txt`, txt);

  if (chk.length == filtered.length) {
    return;
  }
  // 非漢字 1153 .. なぜか30文字減 -> U+2E9+2E5 や、U+3xx系のせい
  for (const c of cs) {
    const hit = chk.indexOf(c) >= 0;
    if (!hit) {
      console.log("nothing! ", c, s2ucs(c)); // U+2E9+2E5　と U+3xx 系統がひっかかる、IVSと競合
      /*
        U+28C+300 ʌ̀
        U+28C+301 ʌ́

        //??
        U+2E5+2E9 ˥˩
        U+2E9+2E5 ˩˥
      */
    }
  }
  /*
  console.log("list")
  for (const c of cs) {
    console.log(s2ucs(c), c);
  }
  */
});

