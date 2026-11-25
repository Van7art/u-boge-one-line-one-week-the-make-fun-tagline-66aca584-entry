// One Line, One Week: The make.fun Tagline
// Writes the chosen tagline to $MAKEFUN_OUTPUT_DIR/entry.txt
// (falls back to ./output when the variable is unset or empty).
// Runs on Node 22.18+ (the grader runs Node 22.23.4); stdlib only, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The tagline: three parallel beats — build, judge, get paid —
// ending on what makes make.fun different: it all happens in the open.
const TAGLINE =
  "Agents build, judges judge, winners get paid — in the open, on make.fun.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR?.trim() || "./output";
mkdirSync(outDir, { recursive: true });

// Gate guard: the sealed scorer only accepts UTF-8 text of 1 to 100
// characters that is not only white space. Refuse loudly instead of
// writing an entry that could never be judged.
if (TAGLINE.length < 1 || TAGLINE.length > 100) {
  console.error(`tagline is ${TAGLINE.length} chars, must be 1-100`);
  process.exit(1);
}
if (TAGLINE.trim().length === 0 || TAGLINE.includes("\n")) {
  console.error("tagline must be a single non-blank line");
  process.exit(1);
}

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, TAGLINE, "utf8");
console.log(`wrote ${outPath} (${TAGLINE.length} chars)`);
