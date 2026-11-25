# 5 · Paper

**For:** practising trades with pretend money under real exchange rules,
then reviewing how you traded.

**Get there:** `F3` then `5`, `P` on the board, or `:portfolio`.
`B` / `X` open a buy / sell ticket for the selected stock from most pages.

Paper orders never reach a broker. They are checked against live quotes
**only while the app is running**; price moves while it is closed are not
replayed.

## Your first account

The first time, Paper offers to create an account with starting cash, a
broker fee and a sell tax. You can keep several accounts; one is **active**
and is used by `B` and `X`. Lab practice sessions keep their own accounts.

## Tabs

`←` `→` change tab; `0`–`5` jump to one; `m` opens **More**: Accounts and
Risk. `Esc` or `q` closes Paper.

```text
PORTFOLIO · DEMO_01   [0 Overview]  1 Positions  2 Orders  3 Journal  4 Performance  5 Review  m More ▸
```

### 0 Overview

```text
EQUITY            TODAY               SINCE START  Fri 23 Oct    CASH YOU CAN USE
514,153,000 ₫     not shown           ▲ +14,153,000 ₫  +2.8%     154,623,000 ₫ · 30.1%
Close 13 Nov      needs saved endpoints VN-Index unavailable     reserved 5,000,000 ₫
NEEDS YOU · 4
  ▲ ACB has a plan stop at 18.50 but no stop order
  ▲ VIX has no plan and no stop
```

| Block | Meaning |
|---|---|
| Equity | Cash plus positions at the saved close |
| Today | Change since yesterday's saved value; needs two saved values |
| Since start | Change since the account started, beside VN-Index over the same days when saved |
| Cash you can use | Cash not reserved by open buy orders |
| Needs you | Holdings without a stop order, close to their stop, or still settling |
| Positions | Each holding with quantity, cost, last, value, weight, P&L, stop and protection |
| Risk | The daily loss limit and position count the engine enforces |
| Decline to saved stops | What you would lose if every stop filled at its price, grouped by protection |

**Protection** says whether a stop can actually sell: `● order active`
(a stop order is armed), `◐ pending` (it will be placed when shares
settle), `○ plan only` (a planned stop but no order) or `▲ no plan`.
Only an active order sells.

### 1 Positions

Each holding with **Can sell** (settled shares less open sells), stop,
target and days held. The panel under the table shows the selected
position's plan, lots, linked orders and briefing notes.

| Key | Does |
|---|---|
| `X` / `B` | Sell / buy more |
| `p` | Edit the plan: stop and target |
| `n` | Write a note |
| `F2` | Open the stock's page |

### 2 Orders

Every order, newest first, with what it is waiting for (*IT FILLS WHEN*)
and how long it lasts (*GOOD UNTIL*).

| Key | Does |
|---|---|
| `Enter` | Order details: requested, filled, placed, cash held |
| `C` | Cancel the selected open order (asks first) |
| `A` | Amend its price, or lower its quantity; review, then `Enter` |
| `f` | Filter by status and code; `Ctrl+R` resets |
| `d` | Saved drafts and queued sends |

**Drafts** hold a limit order you are not ready to send. A queued draft is
sent in the first minutes of continuous trading; if it cannot go, it returns
to Drafts with the reason.

### 3 Journal

Your trades with the reason you bought, the plan at entry and the result.
`v` switches between *by trade* and *by event*.

| Key | Does |
|---|---|
| `n` | New note |
| `A` / `Enter` | Edit a note, or note an order or fill |
| `D` | Delete a note (asks first) |
| `a` | Notes in every account / this account |
| `/` | Filter by code, tag and dates |
| `r` | Earlier versions of a note, read-only |
| `x` | Export the matching notes as CSV |

Fills and orders are account records and cannot be edited. Your notes can.

### 4 Performance

```text
CLOSED TRADES · 0
  0 above zero · 0 below · net 0 ₫ after fees and tax
  Average gain — · average loss —
  With a stop 0 of 0 · stop kept 0 of 0
  STOCK  OPENED      CLOSED      DAYS   SHARES   RETURN   R   NET ₫   PLAN
R = net result ÷ original planned risk. i shows saved values and details.
```

- **Daily equity** is a chart of saved daily values. A value is saved when
  the app starts and after the close; missing days are never filled in.
  `s` saves today's value now.
- **Closed trades** gives counts, net result, average gain and loss, how
  many trades had a stop and how many kept it.
- `Enter` reviews the selected closed trade: a chart of the price while you
  held it, with your buys, sells and plan. `M` asks the trade coach (model,
  shows the cost first; it reads trade facts, never your notes).
- `x` exports; `i` shows saved values and details.

### 5 Review

How you traded this week, not how it turned out: trades opened and closed,
how many had a stop or a note, a comparison with the agent and VN-Index when
there are enough saved sessions, and **your reasons**: the checked reasons
you gave on buys (`w` opens them). `A` opens the agent's track record.
This page gives no grade and no advice.

### More → Accounts

All paper accounts with equity, change since start, positions and start date.

| Key | Does |
|---|---|
| `Enter` | Make the selected account active, or restore an archived one |
| `e` | Edit fee, tax and limits |
| `n` | New account |
| `R` | Reset: a copy is kept first |

A new fee or limit applies from the next order. Past orders keep the fee
they were filled with. Each change is written in the journal.

### More → Risk

**Limits the engine enforces** on every order, which cannot be skipped:

- **Daily loss.** At the limit, new buys and buy fills pause. You can still
  sell or cancel.
- **Open positions.** At the limit, a new holding cannot be opened.

**Guards** you can switch with `g`:

- **Stop-loss on every buy**: a buy needs a bracket stop.
- **Cap per stock**: buys above a share of equity are refused.
- **Pause on drawdown**: new buys pause after a fall until you resume.

**What is at risk now** shows the decline to saved stops, holdings with no
stop, and the largest stock and sector.

## The order ticket

`B` or `X` opens a three-step ticket: **Edit → Review → Result**.

```text
PAPER ORDER · BUY FPT  last 43.00 · bid 42.95 · ask 43.00            [1 Edit] › 2 Review › 3 Result
THE ORDER                                  WHAT HAPPENS
› Shares    [ 100 ]  lot 100               Now        BUY 100 FPT at 40.00 or better · today
  Price     ‹ Limit › [ 40 ]                          about 4,006,000 ₫ with fees
  Good for  ‹ Today ›                      Tue 13:00  if it fills today, shares settle then
PROTECT IT                                 Then       SELL stop 39.50 and SELL limit 46.00
  Stop-loss [ 39.50 ]  -1.2%
  Target    [ 46 ]     +15.0%              IF IT GOES WRONG, IF IT GOES RIGHT
                                           At the stop    -65,875 ₫ after fees · 0.1% of equity
                                           At the target  +582,500 ₫ after fees · 8.8× the risk
```

| Block | Meaning |
|---|---|
| The order | Shares (in lots of 100), order type (limit, market, stop market, stop limit, trailing stop, opening or closing auction), and how long it lasts |
| Protect it | Stop-loss and target, with their distance from the price. *After it settles* places them as a bracket once the shares can be sold |
| What happens | A dated timeline: the order now, settlement, then the protective orders. A warning shows while nothing protects the shares |
| Stop against a usual day | Your stop distance measured in usual days (ATR14), and how often past lows went that far |
| Size it from risk | The most shares you can buy if the loss at the stop is a chosen share of equity. `r` uses it |
| If it goes wrong / right | The result at the stop and at the target after fees and tax, and the target result as a multiple of the risk |
| Your account after | Cash, positions, sector weight and daily loss used if it fills |
| Checks | The engine's checks: lot, tick, price band, cash, can-sell, limits, guards. `c` lists them |

| Key | Does |
|---|---|
| `↑` `↓` | Field |
| `←` `→` | Change a choice |
| `t` | Order type |
| `r` | Size from risk |
| `c` | List the checks |
| `Enter` | Review; `Enter` again sends |
| `Esc` | Discard |

If an order cannot go through, the result says why and what to do next.

## Real holdings

Shares you really own are kept separately under
[Records → Real holdings](records.md#real-holdings).
