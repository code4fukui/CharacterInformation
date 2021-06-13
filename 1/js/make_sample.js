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

const ss = cinfo.split("\r\n");
const data = [];
for (const s of ss) {
  if (!s.startsWith("U+")) {
    continue;
  }
  const s2 = s.split(",");
  const chk = ucs2s(s2[0]);
  console.log(chk);
  //map[cp] = s2.splice(1);
  data.push(s2);
}
for (let i = 1; i <= 6; i++) {
  const res = data.filter(d => d[4] == i).map(d => ucs2s(d[0])).join("");
  console.log(i, res);
  await Deno.writeTextFile(`../sample/小学${i}年.txt`, res)
}
await Deno.writeTextFile("../sample/nisa.txt", data.filter(d => d[5] == 1).map(d => ucs2s(d[0])).join(""));
await Deno.writeTextFile("../sample/JISX0213.txt", data.filter(d => d[1] >= 1 && d[1] <= 5).map(d => ucs2s(d[0])).join(""));
await names.forEach(async (name, idx) => await Deno.writeTextFile(`../sample/JISX0213_${name}.txt`, data.filter(d => d[1] == 1 + idx).map(d => ucs2s(d[0])).join("")));
