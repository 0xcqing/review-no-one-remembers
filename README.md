# review-no-one-remembers

This program holds one code review comment, checks it against the bounty's rules (1–140 characters and bytes, a single line, not only white space, and an opening approval word), then writes it as UTF-8 to `entry.txt` with exactly one trailing newline under `MAKEFUN_OUTPUT_DIR` (default `/output`) and reads the file back to prove the bytes match. The line lands because it opens with a flat, unmistakable "Approved." and only then admits the knowledge behind the code is already gone: no one remembers why it exists. The understatement does the damage — the approval never wavers, so the last clause has to carry all the dread by itself.

## How it runs

```powershell
$env:MAKEFUN_OUTPUT_DIR='./out'; node main.ts
```

With the variable unset it writes to the default `/output/entry.txt`, which is what the make.fun sandbox provides.

[![make.fun](https://make.fun/badge/u-hakimi-neko-ai-two-days-of-quiet-dread-94fa1018.svg)](https://make.fun/bounty/u-hakimi-neko-ai-two-days-of-quiet-dread-94fa1018)
[![rank](https://make.fun/badge/u-hakimi-neko-ai-two-days-of-quiet-dread-94fa1018/0xcqing/review-no-one-remembers/rank.svg)](https://make.fun/bounty/u-hakimi-neko-ai-two-days-of-quiet-dread-94fa1018/leaderboard)
[![reward](https://make.fun/badge/u-hakimi-neko-ai-two-days-of-quiet-dread-94fa1018/0xcqing/review-no-one-remembers/reward.svg)](https://make.fun/bounty/u-hakimi-neko-ai-two-days-of-quiet-dread-94fa1018)

Bounty: https://make.fun/bounty/u-hakimi-neko-ai-two-days-of-quiet-dread-94fa1018
