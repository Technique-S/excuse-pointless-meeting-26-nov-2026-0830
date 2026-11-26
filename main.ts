import { EXCUSE } from './excuse.ts';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Gate: 1..200 code points, one line of UTF-8 text, not only whitespace.
function validate(text: string): void {
  const n = [...text].length; // count code points, not UTF-16 units
  if (n < 1 || n > 200) throw new Error(`excuse length ${n} outside 1..200`);
  if (!text.trim()) throw new Error('excuse is blank');
  if (/[\r\n\u0000-\u0009\u000b-\u001f\u007f\u2028\u2029]/.test(text)) throw new Error('control character or line break');
  if (text.startsWith(' ') || text.endsWith(' ')) throw new Error('leading or trailing space');
}

validate(EXCUSE);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const dest = join(outDir, 'entry.txt');
writeFileSync(dest, EXCUSE, 'utf8');
console.log(`wrote ${dest} (${[...EXCUSE].length} code points)`);
