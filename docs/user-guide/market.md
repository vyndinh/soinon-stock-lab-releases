# 2 · Market

**For:** watching your stocks live, reading news and foreign flow, setting
alerts, and reviewing what changed since you last looked.

**Get there:** `F3` then `2`, `:market`, or `2` / `Esc` from Today.

## The board

The board is a set of panels around your watchlist.

```text
╭─ WATCHLIST · Watchlist 1/5 · sort manual ───────────╮╭─ STOCK — DIG ─────────────────────╮
│  SYMBOL  GRADE   LAST  CHANGE   CHG%  VOLUME  TODAY  ││ LAST    9.63  -0.15  -1.5%        │
│› DIG              9.63  -0.15  -1.5%    4.6M  █▇▆▅▄▃ ││ GRADE   Not graded yet            │
│  HPG              9.63  -0.15  -1.5%    4.6M  —      ││ HELD    Not held in paper         │
│ vps · observed 19:58:00 · exchange time not in feed  ││ SUPPORT 9.50  resist 9.76 · 9.85  │
╰──────────────────────────────────────────────────────╯│ Room    39.1M   Foreign net -124.7K│
╭─ CANDLE · DIG · 1m · 30 bars · auto ────────────────╮╭─ WHY GRADE · DIG ─────────────────╮
│  …intraday chart…                                    ││ Price / MA20     for    +1        │
╰──────────────────────────────────────────────────────╯╰───────────────────────────────────╯
╭─ NEWS · relevance · 7d ─────────────────────────────╮╭─ FOREIGN FLOW · today ────────────╮
```

| Panel | Shows |
|---|---|
| Watchlist | Your codes with grade, last price, change, % change, volume and a sparkline of today's prices. The footer line names the feed and when the quotes were observed |
| Stock | The selected stock: last price, grade, whether you hold it, nearest support and resistance, foreign room and today's foreign net |
| Chart | An intraday chart of the selected stock |
| Why grade | The seven grade factors for the selected stock, each *for*, *against* or *neutral* |
| News | Recent headlines for your stocks |
| Foreign flow | Today's foreign net buying or selling per stock, in shares |

Outside trading hours the board shows the last saved quotes and says how
old they are. The watchlist's **GRADE** column fills in once the stock is in
a daily briefing. Until then the Stock card shows the grade read from the
chart (*chart reading*), or *Not graded yet* when there are too few bars.

### Board keys

| Key | Does |
|---|---|
| `↑` `↓` | Select a stock |
| `Enter` | Open the stock's page |
| `Tab` | Move to the next panel |
| `a` / `D` | Add / delete a code |
| `K` / `J` | Move the selected code up / down |
| `s` `p` `v` `m` | Sort by code, % change, volume, or your own order |
| `G` | Watchlist groups: create, rename, switch |
| `[` / `]` | Previous / next group |
| `e` | The selected stock's score in full |
| `t` | Recent trades for the selected stock |
| `n` | New alert for the selected stock |
| `S` | Show and focus the screener; `S` again hides it |
| `H` | Sector heat map |
| `N` | Focus the news panel |
| `A` | Alert inbox |
| `C` | Study the selected stock on past daily bars (Lab → Chart study) |
| `B` / `X` | Paper buy / sell ticket |
| `P` | Paper portfolio |
| `1` | Today |

On the intraday chart: `1` `5` `F` `4` switch between 1-minute, 5-minute,
15-minute and daily bars; `'` changes the lower pane; `L` shows the previous
session's high, low and close; `V` shows VWAP; `M` cycles pivots and
Fibonacci levels.

### Screener

`S` opens a panel listing stocks in the current group that show a
technical signal, such as an RSI below 30 or a 20-day breakout. `Enter`
selects that stock on the board; `d` shows the signal details. For a fuller
search use [Find](find.md).

### Sector heat map

`H` shows one tile per sector, coloured by the average change of its stocks
today. Sectors come from tags saved in Records → Sectors.

## News

`N` focuses the news panel. Headlines come from CafeF RSS and are matched to
codes and sectors.

| Key | Does |
|---|---|
| `↑` `↓` | Select a headline |
| `Enter` | Open the article, or filter to a sector row |
| `D` | Lookback: 1, 3, 7 or 30 days |
| `R` | Sort by relevance or by time |
| `W` | Only your watchlist stocks |
| `Esc` | Clear the filter |

`:news export` saves the list shown as a CSV file.

## Alerts

An alert tells you when a stock does something. It never places an order.

**Set one:** `n` on a selected stock, or type `:alert FPT above 54`.

| Watch for | Fires when |
|---|---|
| Price above / below | The live price crosses a level you set (two decimals) |
| Cross MA20 | The daily close crosses MA20 |
| RSI above / below | RSI14 crosses a value from 1 to 99 |
| Volume spike | Volume reaches a multiple of the 20-day average |

**Alert inbox:** `A`, or `:alerts`.

```text
FIRED · 1
› ● FPT  below 41.50   fired Mon 16 Nov 10:32 at 41.40 · now 41.10 · unread
WAITING · 3
  STOCK  RULE          NOW     DISTANCE          SET
  ACB    above 21.80   21.40   +1.9% to level    09 Nov
```

*Distance* is how far the price must move to reach the level. An alert fires
once, then waits. `R` re-arms it at the same price.

| Key | Does |
|---|---|
| `Enter` | Open the stock |
| `u` | Mark read |
| `n` | New alert |
| `R` | Re-arm (asks first) |
| `D` | Delete (asks first) |
| `f` | Filter: waiting, fired, all |

Alerts are checked against live quotes **only while the app is running**.
Time while it was closed is not replayed.

## Daily briefing

**For:** a two-minute check of what changed in your stocks since your last
review.

**Get there:** `:brief`, `v` on Today, or Get started goal 1. `:brief
ACCOUNT` chooses which paper account's holdings to include.

```text
DAILY BRIEFING  Sat 14 Nov · first review · a baseline                  3 in scope
   STOCK  CLOSE   SINCE   GRADE   FLOW 10d   YOUR POSITION      WHAT CHANGED
›● FPT    46.80           B+      +0.0 bn    hidden · account changed   baseline
 ● ACB    —               —       —                                     baseline
   2 with gaps: ACB, BID · c details
```

| Column | Meaning |
|---|---|
| CLOSE | The latest saved daily close |
| SINCE | % change since the close in your last reviewed briefing |
| GRADE | The grade from saved daily bars |
| FLOW 10d | Foreign net over ten sessions, in billion dong |
| YOUR POSITION | Shares in the selected paper account and how far the close is above your saved stop. *hidden · account changed* means the account differs from the one in the review |
| WHAT CHANGED | Why the stock is listed: a price move of 2% or more, a grade change, a stop nearby, an upcoming event |

The first visit records a **baseline**. Marking a briefing reviewed (`m`,
then `y`) makes it the next baseline. Viewing alone never saves one. A
stock with missing prices is listed as a gap with the reason (`c`).

| Key | Does |
|---|---|
| `↑` `↓`, `Enter` | Select a stock; open its frozen evidence |
| `f` | Fetch daily prices for every stock in scope |
| `r` | Read the saved evidence again |
| `m` | Mark reviewed (asks `y`) |
| `d` | Note a decision about the stock |
| `D` | Saved decisions and what happened after each |
| `b` | Your whole book: value, largest holding, sectors, stops |
| `a` | Research brief (needs a model; see below) |
| `x` | Export as JSON |

The briefing reads saved daily bars and calls no model. A 2% change is an
attention threshold, not a trade signal.

### Research brief (model, paid)

`a` in the briefing, or `:brief agent`, asks the model to link changes
across up to five stocks using the briefing's saved evidence. Before the
request it shows the stocks, what will be sent and the estimated cost; type
`send` and press `Enter` to confirm. `e` shows the cited evidence and `x`
saves it. A saved brief opens without a new request. See
[Safety and your data](safety-and-data.md#model-features).
