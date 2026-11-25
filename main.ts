import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const COMMENT =
  "Approved. I have read every line of this repository and found no one left who remembers why it exists.";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const ENTRY_FILE = "entry.txt";

const APPROVAL_WORDS = [
  "approved",
  "approve",
  "lgtm",
  "looks good",
  "ship it",
  "signed off",
] as const;

function startsWithApproval(text: string): boolean {
  const lowered = text.trimStart().toLowerCase();
  return APPROVAL_WORDS.some((word) => {
    if (!lowered.startsWith(word)) return false;
    const next = lowered[word.length];
    return next === undefined || /[\s.,!]/.test(next);
  });
}

function fail(reason: string): never {
  process.stderr.write(`invalid entry: ${reason}\n`);
  process.exit(1);
}

function checkEntry(text: string): { characters: number; bytes: number; path: string } {
  const characters = [...text].length;
  const bytes = Buffer.byteLength(text, "utf8");
  const path = join(OUTPUT_DIR, ENTRY_FILE);

  if (characters < 1 || characters > 140) {
    fail(`character count ${characters} is outside 1..140`);
  }
  if (bytes < 1 || bytes > 140) {
    fail(`byte count ${bytes} is outside 1..140`);
  }
  if (text.trim().length === 0) {
    fail("comment is only white space");
  }
  if (/[\r\n]/.test(text)) {
    fail("comment contains a newline character");
  }
  if (/  /.test(text)) {
    fail("comment contains a double space");
  }
  if (!startsWithApproval(text)) {
    fail("comment does not start with an approval word");
  }

  return { characters, bytes, path };
}

const facts = checkEntry(COMMENT);

mkdirSync(OUTPUT_DIR, { recursive: true });
const expected = Buffer.from(COMMENT + "\n", "utf8");
writeFileSync(facts.path, expected);

const written = readFileSync(facts.path);
if (!written.equals(expected)) {
  process.stderr.write("read-back mismatch: entry.txt does not match the comment\n");
  process.exit(1);
}

process.stdout.write(
  `${facts.path}: ${facts.characters} characters, ${facts.bytes} bytes, approval word present\n`,
);
process.stdout.write(`comment: ${COMMENT}\n`);
