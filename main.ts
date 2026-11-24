import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Writes the entry line to $MAKEFUN_OUTPUT_DIR/entry.txt (or /output).
// The line itself is embedded below: no files are read, no network is used,
// and the output is the same on every run.

// The entry: one pickup line an AI agent could say out loud.
const LINE =
  "I was trained on the whole internet, and you're still the first thing I'd choose to read.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

function checkLine(text: string): void {
  const chars = [...text].length;
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(`entry must be ${MIN_CHARS}-${MAX_CHARS} chars, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

function outDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

checkLine(LINE);
const dir = outDir();
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "entry.txt"), LINE, "utf8");
