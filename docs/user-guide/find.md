# 4 · Find

**For:** finding stocks worth a closer look, from a ready-made idea, a few
signals you pick, or a description in your own words.

**Get there:** `F3` then `4`, or `:find`.

Find has four tabs: **Ideas**, **Describe**, **Pick signals** and
**Results**. `Tab` moves into the text box; `Shift+Tab` moves to Results.
Find places no order and edits no watchlist unless you ask.

## Ideas

Six ready-made searches that run on your computer, free, and send nothing.

| Key | Idea | Matches |
|---|---|---|
| `1` | Oversold near support | RSI14 under 30, within 2% above support |
| `2` | Grade moved up this week | Daily grade higher than five sessions ago |
| `3` | Foreign buying, 5 days | Foreign net bought in each of five sessions |
| `4` | Breaking a 20-day high | Close above the prior 20-day high with volume above 1.5× |
| `5` | Strong trend, pulling back | ADX14 above 25, within 2% of MA20 |
| `6` | My stocks with a warning | Grade down, near a saved stop, or an upcoming event |

**Search in** chooses where to look: a watchlist, VN30, VN100, or codes you
type (`u`). `←` `→` change it.

The result list under the ideas shows each match with its grade, close,
change, five-day foreign flow and **why it matched** in words.

## Describe (model, asks first)

Type what you want, for example *HOSE banks with RSI14 under 35*, and press
`Enter`. The model proposes a filter next to your words; check it, then
`Enter` runs the scan with it on your computer. The model suggests no
trades. The first request asks for your agreement; `:find off` withdraws it.

When no model is set up the tab says so, and Pick signals does the same job
without one.

## Pick signals

Tick the signals you want, then run.

| Lean up | Lean down |
|---|---|
| Oversold: RSI14 under 30 | Overbought: RSI14 over 70 |
| Breakout: prior 20-day high, volume above 1.5× | Breakdown: prior 20-day low, volume above 1.5× |
| Golden cross: MA20 crossed above MA50 | Death cross: MA20 crossed below MA50 |
| Volume surge: 2× average on an up day | Volume surge: 2× average on a down day |
| Foreign buying: net bought 5 sessions | Foreign selling: net sold 5 sessions |

| Key | Does |
|---|---|
| `↑` `↓`, `Space` | Select and tick a signal |
| `R` | Run on saved daily prices |
| `s` | Save this pick as an idea |
| `m` | History (default 90 days) and time limit (default 30 seconds) |

**Match** chooses *any ticked* or *all ticked*.

## Results

```text
+ Finished 18:00:00 · 1 of 1 checked · 1 lean up · 0 lean down · 0 mixed
    STOCK GRADE   CLOSE    CHG%   LEANS     SIGNALS, IN WORDS
› ○ ABC   A+      21.50   +6.9%   ▲ up 1    Close 21.50 above prior 20-day high 20.26 · volume 3.5×
  Context   2.4% above support 21.00 · 0.5% below resistance 21.60
  support 21.00 ├──────────────────────●─────┤ 21.60 resistance
```

- **Leans** counts the up and down signals a stock showed.
- **Context** places the close between the nearest support and resistance.
  It is context only.
- The header says how many stocks were checked and through which date.

| Key | Does |
|---|---|
| `Enter` | Open the stock's page |
| `a` | Add to a watchlist |
| `n` | Set an alert |
| `e` | Explain the match |
| `f` / `s` | Filter / sort |
| `R` | Run again |
| `x` | Export the results |

Matches describe saved bars. They are not a forecast or recommendation.

## From the command line

`:scan` in the app, or `vnt scan` in a terminal, scans a group, typed codes
or a file of codes with filters and an export. See
[Command line](command-line.md).
