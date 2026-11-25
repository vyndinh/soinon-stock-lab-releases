# 8 · Records

**For:** what the app keeps on your computer. Your real holdings,
dividends, backups, exported files, a health check, sector tags, the theme,
and information about the app.

**Get there:** `F3` then `8`, or `:records`.

```text
RECORDS  what this app keeps on this computer
▲ No backup yet. Your watchlists, paper accounts and journal live in one file.   b backs up now
YOURS
› Real holdings     No holdings yet · i imports a CSV in Real holdings
  Dividends         2 to review · next: HDB cash 1,000 ₫ a share on Tue 17 Nov
KEEPING IT SAFE
  Backup            none yet                                       reminds every 7 days
  Exports           1 file · last: journal CSV on Thu 12 Nov
THE APP
  Health            Not checked yet
  Sectors           94 stocks tagged · 1 of yours has no sector
  Theme             Light
  About             what the app is, your data, the terms
```

`↑` `↓` and `Enter` open a row; `b` backs up now. Nothing on this page is
sent anywhere.

## Real holdings

Shares you really own, kept as your own records. **No broker checks them,
and nothing here places an order.** They are separate from paper accounts.

**Get there:** Records → Real holdings, or `:portfolio real`.

```text
2 holdings · 35,000,000 ₫ shown · unrealized +1,000,000 ₫
  STOCK   QTY    COST    LAST    VALUE ₫     WEIGHT   P&L ₫      %      GRADE  COMING UP
› FPT     100    95.00   100.00  10,000,000  28.6%    +500,000   +5.3%  C      —
```

Values use saved daily closes. The panel below links the holding to the
rest of the app: its grade and levels, whether the briefing includes real
holdings, alerts on the stock, and agent sessions.

**Import a CSV** with `i`. Type the file path, match the columns (stock,
shares, cost, currency, as-of date, source) and confirm the cost unit
(thousand dong or dong). The preview shows rows to add, update and reject;
`A` reviews the change and `y` saves it. Every import keeps a snapshot.

| Key | Does |
|---|---|
| `Enter` | Open the stock |
| `i` | Import a CSV |
| `e` | Edit a record |
| `D` | Remove a record (review first) |
| `p` | Refresh prices now; `Ctrl+X` cancels |
| `b` | Include real holdings in the daily briefing |
| `h` | Saved snapshots; `r` restores one after a review |
| `x` | Export holdings, the last import receipt, or a snapshot (CSV or JSON) |

## Dividends

Cash dividends and share issues for stocks you hold, in paper and real.

```text
COMING · 2
  EX-DATE     STOCK  WHAT                            YOU HOLD            YOU WOULD RECEIVE
  Thu 26 Mar  VCI    7 new shares for every 20 held  95 paper · 95 real  paper 33 · real 33 new shares
› Thu 26 Mar  VCI    cash 250 ₫ a share              95 paper · 95 real  paper 22,562 ₫ · real 22,562 ₫
```

- **Ex-date.** Buy before this date to receive the dividend. On the
  ex-date the reference price falls by about the dividend, so a stop just
  under the old price can fill that morning.
- **You would receive** is shares × amount after the 5% tax on cash
  dividends, rounded down for new shares.
- Paper accounts are credited on the ex-date. Real holdings are estimates.
- **To review** lists events that need you to confirm or correct them.

| Key | Does |
|---|---|
| `n` | Type in a new event |
| `e` | Correct an event |
| `f` | Fetch notices from VSDC |
| `r` | Events received this year |

## Backup

A checked copy of the app's data file, written to a new file. An existing
file is never replaced.

| In the copy | Not in the copy |
|---|---|
| Watchlists, alerts, paper accounts, journal and notes, decisions, replays, backtests, real holdings | Logs, agent portfolios, model spend records (separate files; copy them yourself) |

`Enter` backs up now to `~/vnt/backups/`; `p` chooses another place. The
app keeps running, and the copy is checked before the file appears.
**Remind me** (`←` `→`) sets a reminder on Today: never, every 7 days or
every 30 days. `v` verifies a backup file.

To restore, close the app and run in a terminal:

```text
vnt backup verify FILE            check a copy; read-only
vnt backup restore FILE NEW.db    restore to a new file
vnt --db NEW.db                   open the restored file
```

## Exports

Files the app wrote, in `~/vnt-exports`.

| Choice | Writes |
|---|---|
| Everything of mine | Trades, notes, decisions, holdings and dividends in one folder |
| My trades for a year | Every fill with its fee and sell tax, one row per fill |
| One page | Press `x` on any page to export what it shows |

Pages that show a chart or report can also save one HTML file you can open
in a browser. `o` shows a file in its folder, `c` copies the path, `D`
removes the file. Nothing is uploaded.

## Health

Is everything working?

| Group | Checks |
|---|---|
| The data you rely on | The data file, saved daily prices, the briefing snapshot, dividends, the exchange calendar, the last backup |
| Public feeds | Live prices (VPS), daily bars (Entrade), trades (KBS), news (CafeF RSS), each with its response time |
| The agent | Auto paper sessions and the model request log |
| This computer | Terminal size and colours, theme |

Each line says `ok` or `look` with what to do. `r` checks again: it
contacts the four public feeds and nothing else. These are the same checks
as `vnt doctor`. `x` exports the page.

## Sectors

How many stocks have a sector tag, and which of yours have none. Sector
tags drive the heat map and sector weights. `vnt sectors import` loads the
bundled tags or your own CSV.

## Theme

Background (light, dark or auto-detect) and the colours for up and down.
See [Getting started](getting-started.md#themes-and-colours). `Enter`
applies at once and is saved for the next start.

## About

What the app is, where your data lives and the terms.

- **Your data.** Accounts, orders, notes, real holdings and decisions stay
  on this computer. Prices, news and company events come from public feeds
  with no account or key. Data goes out only for a model request you agree
  to.
- **Documents.** Terms, third-party notices, support and security, readable
  with `Enter`.
- `d` opens the data folder; `m` opens the model log; `x` saves a report
  for a bug note: version, terminal size and Health, with no account data.

Report problems at the issues page linked there.
