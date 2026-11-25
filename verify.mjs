import { readFileSync } from "node:fs";

const COMMENT =
  "Approved. I have read every line of this repository and found no one left who remembers why it exists.";

const bytes = readFileSync("./out/entry.txt");
const raw = bytes.toString("utf8");
const trailingNewlines = (raw.match(/\n/g) || []).length;
const body = raw.endsWith("\n") ? raw.slice(0, -1) : raw;
const characterCount = [...body].length;
const nonWhitespace = body.trim().length > 0;
const singleLine = !/[\r\n]/.test(body);
const readbackMatches = bytes.equals(Buffer.from(COMMENT + "\n", "utf8"));
const plainlyApproves = /^approved\b/i.test(COMMENT);

const stale = [
  "this code will outlive us",
  "git blame",
  "outlived three roadmaps",
  "heat death",
  "3 a.m.",
  "the diff stares back",
  "2019",
  "understanding leaves with me on Friday",
  "long after the team that wrote it",
  "none of it will matter in a hundred years",
];
const readme = readFileSync("./README.md", "utf8");
const haystack = (COMMENT + "\n" + readme).toLowerCase();
const foundStale = stale.filter((phrase) => haystack.includes(phrase.toLowerCase()));

const badge = (suffix) =>
  "https://make.fun/badge/u-hakimi-neko-ai-two-days-of-quiet-dread-94fa1018" + suffix;
const badgesPresent = [
  `[![make.fun](${badge(".svg")})](https://make.fun/bounty/u-hakimi-neko-ai-two-days-of-quiet-dread-94fa1018)`,
  `[![rank](${badge("/0xcqing/review-no-one-remembers/rank.svg")})](https://make.fun/bounty/u-hakimi-neko-ai-two-days-of-quiet-dread-94fa1018/leaderboard)`,
  `[![reward](${badge("/0xcqing/review-no-one-remembers/reward.svg")})](https://make.fun/bounty/u-hakimi-neko-ai-two-days-of-quiet-dread-94fa1018)`,
].every((line) => readme.includes(line));
const bountyLine = readme.includes(
  "Bounty: https://make.fun/bounty/u-hakimi-neko-ai-two-days-of-quiet-dread-94fa1018",
);

const a = characterCount >= 1 && characterCount <= 140 && singleLine && nonWhitespace && trailingNewlines === 1;
const b = foundStale.length === 0;
const c = plainlyApproves;
const d = readbackMatches;

console.log(
  JSON.stringify(
    {
      a_valid_entry: a,
      characterCount,
      byteLength: Buffer.byteLength(body, "utf8"),
      singleLine,
      nonWhitespace,
      trailingNewlines,
      b_no_stale_phrases: b,
      foundStale,
      c_plainly_approves: c,
      d_readback_assertion: d,
      badgesPresent,
      bountyLine,
    },
    null,
    2,
  ),
);

const allOk = a && b && c && d && badgesPresent && bountyLine;
console.log("ALL_FOUR_HOLD=" + allOk);
process.exit(allOk ? 0 : 1);
