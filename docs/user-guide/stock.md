# 3 · Stock

**For:** understanding one stock: its grade and why, its price levels, the
chart with your own cost and stop, the order book, recent trades and how
simple rules would have done on it.

**Get there:** `Enter` or `F2` on a stock anywhere (board, Today, Find,
Paper). `F3` then `3` opens the selected stock. In Go to, type a code and
press `Enter`. `Esc` or `F2` goes back.

The Stock page has six tabs. `Tab` / `Shift+Tab` move between them; the
page remembers the last tab you used.

```text
STOCK · FPT  HOSE                     [Summary]  Chart  Book  Technicals  Trades  Backtest
43.00  0.00  0.0%  vs prev close · grade B+ · you hold 100
Cost 42.00 · your stop 41.00
```

Keys on most tabs: `B` / `X` paper buy / sell ticket, `n` new alert and
`p` plan or move the stop. Summary and Technicals add `e` score factors
and `M` ask the model (paid, asks first). Each tab's footer shows its keys;
`?` lists all of them.

## Summary

The stock on one page.

| Block | Meaning |
|---|---|
| Header | Last price, change from the previous close, grade, and your shares, cost and stop if you hold it |
| 6 months | A sparkline of saved daily closes, the high and low with dates, and how far the price is below the high |
| Why grade | The seven factors, each marked `+` for, `×` against or `·` neutral, and the total score out of 7 |
| Levels | Support and resistance with their distance from the last price, and ATR14: the usual daily range |
| Flow and strength | Foreign net over ten sessions, buying days, and the stock's change against VN-Index over 20 sessions |
| Coming up | Saved company events in the next ten sessions |
| News | Cached headlines from the last seven days |
| Your notes | Decisions you noted from the briefing |

`d` notes a decision; `g` opens Lab → Grade check.

## Chart

A daily or intraday chart with your position drawn on it.

```text
 DAILY · 46 sessions · MA20 43.00 · MA50 43.00      v your lines on · 1/5/F/4/W timeframe · ' [volume] · c look
 …candles…                                                              43.00 last ◀
 ┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿┈╿  42.00 your cost +2.4%
 ┈│┈│┈│┈│┈│┈│┈│┈│┈│┈│┈│┈│┈│┈│┈│┈│┈│┈│┈│┈│┈│┈│┈│┈│┈│┈│┈│┈│┈│┈│┈│┈│┈│┈│┈│┈│┈│  41.00 your stop
 YOUR TRADE  DEMO_01 · order active · 100 shares at 42.00 · +2.4%
 THE CHART  at MA20 43.00 · at MA50 43.00 · 2.3% below 28 Aug high · volume 1× prior 20 bars
```

- The right edge labels the last price, your cost, stop and target, and
  nearby levels. A level outside the view is named under the chart.
- **Your trade** gives the account, whether a stop order is active, shares,
  cost and the distance to cost and stop.
- **The chart** states facts from saved daily bars. It is not a signal.

| Key | Does |
|---|---|
| `1` `5` `F` `4` `W` | 1-minute, 5-minute, 15-minute, daily, weekly bars |
| `←` `→` (or `h` `l`) | Move the crosshair; the readout shows that bar |
| `PgUp` `PgDn` | Move the crosshair five sessions |
| `+` `-` | Zoom in / out |
| `[` `]` | Pan earlier / later |
| `0` | Back to the latest bars |
| `c` | Chart look: thin, braille or block candles, line |
| `'` | Lower pane: volume, RSI, MACD, stochastic, ratio to the index |
| `v` | Show or hide your cost, stop and target lines |
| `p` | Move the stop or target: pick one, step it, review, then `Enter` |
| `m` | In the crosshair: measure from that bar to the last price |
| `y` | In the crosshair: save a price level |
| `n` | In the crosshair: an alert at that price |
| `Enter` | In the crosshair: that day in Daily prices |
| `C` | Study this stock in Lab → Chart study |
| `Esc` | Clear the crosshair, then go back |

Saved levels are drawn on both daily and intraday charts. On intraday
charts the lunch break is shown as a gap. Company events such as dividends
are marked on the daily chart.

**Moving a stop or target** changes the paper order and the plan together.
The review shows the old and new price and what changes; nothing is sent
until you press `Enter`. A stop the agent owns cannot be moved here.

## Book

The order book: best bids and asks with sizes when the feed provides them,
the reference, floor and ceiling, volume, your position and the nearest
levels. When the feed has no depth the page says so instead of guessing.
Depth is never extended beyond the levels the feed shows.

## Technicals

Every grade factor in a table, with its reading, side and score.

```text
  FACTOR           READING                                SIDE       SCORE
› Price vs MA20    close 46.80 · MA20 46.67 (0.3% above)  for        +1.0
  MACD histogram   -0.0198                                against    -1.0
  Volume           1M · 1× the 20-day average              neutral    +0.0
  Price vs MA20: +1 when the latest close is above MA20, -1 when below, 0 when level.
```

`↑` `↓` select a factor; the line under the table says how it is scored.
**Context** shows readings that are not in the score: ADX14 trend strength,
on-balance volume and candlestick signals.

### Why this grade

`e` opens the full explanation:

- each factor with its score, reading and plain meaning;
- **What would change it**: the nearest close that would flip a factor, and
  the new sum. This is arithmetic, not a forecast;
- **The grade over 20 sessions**, computed from saved daily bars. Foreign
  flow is not saved for past sessions, so past grades leave it out.

`Enter` explains how the selected factor is scored. `g` opens Grade check.
`M` asks the model to explain the score from the same evidence; it shows
the cost first.

## Trades

Recent trade prints for the stock, from the KBS feed: time, price, size and
whether the buyer or seller started the trade. `f` shows only large trades;
`r` reads them again.

## Backtest

A quick preview of four simple rules on this stock's saved daily bars:
MA cross 20/50, Bollinger reversion, 20-day breakout, and RSI below 30 with
an exit above 70. The preview runs on your computer, fetches nothing and
saves no run. `Enter` carries the chosen rule into the
[Lab backtest workbench](lab.md#backtest).

## Daily prices

**Get there:** `:history FPT`, or `Enter` on a crosshair day in the chart.

A table of saved daily bars, newest first, with your own activity in the
notes column: buys, sells, stop moves and decision notes.

```text
SINCE FIRST BUY  Tue 01 Sep · 12 sessions · +4.5% from average cost
  DATE     OPEN    HIGH    LOW     CLOSE   CHANGE   VOLUME   NOTES
› 16 Sep   43.70   44.10   43.40   43.90   +0.2%    2,000    2× the usual volume
  08 Sep   43.10   43.50   42.80   43.30   +0.2%    1,000    S you sold 100 at 43.10
```

| Key | Does |
|---|---|
| `Enter` | That day on the chart |
| `n` | Only days with a note |
| `w` | Switch the period summary at the top |
| `x` | Export the rows shown as CSV to `~/vnt-exports` |

Daily prices lists only saved bars. Opening a stock's daily chart (`4`)
saves the finished sessions it shows; today's session is saved only after
the market closes. Bars are also saved when you fetch in the daily briefing
(`f`), when Replay or Chart study's history library fetches them, and when
the board fills in recent closes for your watchlist.
