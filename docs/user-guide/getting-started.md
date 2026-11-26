# Getting started

## What you need

- A terminal with 256 colours: Terminal, iTerm2, WezTerm, Ghostty,
  Alacritty or Windows Terminal.
- A window of at least **80 columns × 24 rows**. Pages are laid out for
  80×24 and 120×32; a wider window shows more columns and longer labels.
- An internet connection for live prices, daily bars, trades and news. Pages
  that read saved data still work offline.

## Install and first launch

Download the archive for your system from the
[download page](https://vyndinh.github.io/soinon-stock-lab-releases/),
extract it, and open a terminal in that folder.

```text
./vnt version     prints the version
./vnt doctor      checks the data file and the public feeds
./vnt             opens the app on Today
```

On Windows use `.\vnt.exe`. Current prerelease binaries are unsigned. If
your system blocks the launch, do not turn off its security protection;
report it through the link under Records → About.

The first launch creates a data file in your system's application-data
folder. Use `--db PATH` to choose another file, for example a separate file
for experiments.

## The screen

Every page has the same frame.

```text
Soinon Stock Lab  ● CONTINUOUS 10:42:06  HOSE │ HNX │ UPCoM          ▌PAPER DEMO_01   ← status line
TODAY  Mon 16 Nov · continuous session · lunch 11:30 · closes 14:45   [Today] Board   ← page title
──────────────────────────────────────────────────────────────────────────────────────
  … the page …
──────────────────────────────────────────────────────────────────────────────────────
  TODAY  Enter stock  b book  A agent  2 board  F3 go to  ? all keys          q quit  ← footer
```

- **Status line.** The market session and clock in Vietnam time, the
  exchanges, the price feed, and on the right the active paper account.
  `● CONTINUOUS` means the market is trading; `○ CLOSED` or `○ PRE-OPEN`
  means it is not. See [sessions](stock-terms.md#sessions-and-auctions).
- **Page title.** Where you are, and tabs when the page has them. The tab in
  `[brackets]` is open.
- **Footer.** The page's main keys, key first. `? all keys` lists the rest.
  The key on the right edge (`Esc back`, `Esc/q close`, `q quit`) leaves.

## Moving around

The app has eight **places**. Press `F3` (or `` ` ``) to open **Go to**,
then a number:

| Key | Place | What is there |
|---|---|---|
| `1` | Today | What changed, your book, the agent, what is next |
| `2` | Market | Board, news, foreign flow, alerts |
| `3` | Stock | Summary, chart, order book, technicals, trades |
| `4` | Find | Ready-made ideas, describe one, or pick signals |
| `5` | Paper | Positions, orders, journal, performance, review |
| `6` | Lab | Backtest, replay and practice on past prices |
| `7` | Agent | Auto paper, decisions, track record, lessons, model log |
| `8` | Records | Real holdings, dividends, backup, exports, health, theme |

In Go to you can also type a stock code such as `FPT` and press `Enter` to
open its Stock page. A lowercase `g` opens **Get started**; type a code that
starts with G as a capital `G`.

Go to opens from any page that holds nothing unsaved. On a form, a ticket or
a confirmation, `F3` says **Finish or Esc first**, so nothing is lost.

Other moves that work on most pages:

| Key | Does |
|---|---|
| `↑` `↓` | Select a row |
| `Tab` / `Shift+Tab` | Next / previous tab or panel |
| `Enter` | Open the selected row |
| `Esc` | Go back one step |
| `F2` | Open the selected stock's page, or go back to the board |
| `?` or `F1` | Help |
| `:` | Command bar |
| `q` | Quit from Today or the board |

When you quit with something unsaved, such as a held order draft, the app
lists it first. `y` quits; any other key keeps the app open.

## Get started

Get started (`F3` then `g`, or `:guide`) lists five things to try. Each row
says what you get, what it uses, what it sends and whether it costs money.

| Goal | Page |
|---|---|
| See what changed in my stocks | Daily briefing |
| Understand one stock | Stock → Summary |
| Practise a trade with a plan | Paper order ticket |
| Watch an agent trade | Agent → Auto paper |
| Find stocks worth a look | Find |

`1`–`5` select a goal and `Enter` opens it. Finished goals are ticked.
Nothing on Get started places an order or sends a request.

## Help

`?` or `F1` opens Help over the page you were on.

- Help opens on the section for that page, with its main controls first.
- `←` `→` change section. `↓` scrolls into the full reference.
- `/` searches keys, tasks and commands. Every word must match.
- `Tab` moves through **tasks** such as *Understand one stock* or *Track
  real holdings*. Each says where the feature is and what it needs.
  `Enter` opens it. Opening runs and saves nothing.
- `Esc` closes Help.

The Help **Support** section shows the exact `doctor`, backup, verify and
restore commands for the data file you have open.

## The command bar

`:` opens the command bar. Type a command and press `Enter`.

```text
:brief            daily briefing
:history FPT      saved daily prices for FPT
:alert FPT above 54
:backtest         backtest workbench
:replay new       Replay setup
:portfolio real   real holdings
:backup           save a checked copy of the data file
```

Place names also work: `:today`, `:market`, `:stock`, `:find`,
`:portfolio`, `:lab`, `:agent`, `:records`, `:alerts`.

The bar suggests a correction when a word is misspelt. For `:alrt fpt 54`
it offers *alert FPT above 54.00*, explains why it chose "above", and runs
only when you press `Enter`. `Tab` lets you edit the suggestion first. `↑`
recalls earlier commands.

## Themes and colours

Records → Theme sets the background and the colour scheme for gains and
losses. The choice is saved for the next start.

| Background | Up and down colours |
|---|---|
| Light | Standard: green up, red down |
| Dark | Vietnam board: also purple at the ceiling, cyan at the floor, amber at reference |
| Auto-detect: follows the terminal | Colour-blind safe: blue up, orange down |

Arrows `▲` `▼` are shown in every scheme, so colour is never the only signal.

## Prices and units

- Stock prices are in **thousand dong**. `62.30` means 62,300 ₫.
- Money amounts end in `₫` and use commas: `4,006,000 ₫`.
- Volumes use `K` and `M`: `4.6M` is 4.6 million shares.
- Indices such as VN-Index are in points.
