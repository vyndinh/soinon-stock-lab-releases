# Soinon Stock Lab user guide

Soinon Stock Lab (`vnt`) is a keyboard-driven terminal app for following Vietnamese stocks across **HOSE**, **HNX**, and **UPCoM**, reading daily and intraday charts, practising trades with simulated paper money, and testing ideas on historical prices. Everything runs locally on your computer, stores its database in a single SQLite file, and needs **no brokerage account or API key** for market data.

> **Paper only.** Every order in Soinon Stock Lab is a local simulation. Nothing is ever sent to a broker, and the app gives **no investment advice**.

## Who this guide is for

This guide is written for people who are **new to `vnt` and new to technical analysis**:
- Every page explains **why it exists**, **what you see on screen** (with real screenshots), **step-by-step examples**, and **exact keyboard shortcuts**.
- Unfamiliar market or chart words are explained in [Stock terms](stock-terms.md).
- Want to learn how candlesticks, indicators, volume, support/resistance, and stops work together on `vnt` charts? Read [Reading charts & technical analysis](chart-reading.md).

## Why Soinon Stock Lab? (User stories & benefits)

New investors and active traders use `vnt` to solve common mistakes with concrete, verifiable tools:

| User story ("As a… I want… so that…") | How `vnt` supports you | Real benefit |
|---|---|---|
| **Complete beginner:** *"I want to practise reading charts and placing orders with zero financial risk so I understand T+2 settlement, ticks, and stops before ever using real money."* | Practise day-by-day in **Replay** (`Lab`) and bar-by-bar in **Chart study**, then graduate to **Paper** accounts (`B` / `X`) enforcing HOSE/HNX/UPCoM rules. | Learn exchange mechanics and discipline for free with zero real-money mistakes. |
| **Busy weekday investor:** *"I only have 5 minutes at lunch or after work — I want one screen showing what moved near my stops or levels without opening 10 browser tabs."* | Open **Today** (`1`) for stocks near stops/resistance and run **Daily briefing** (`:brief`) to see only what changed since your last review. | Cut noise cleanly; never miss an ex-dividend date or stop warning. |
| **Chart learner fighting hindsight:** *"Charts look easy when I see the right half of the screen. I want to test if I actually spot setups before the breakout happens."* | Open **Chart study** (`C`) or **Replay** (`2`) in blind mode (`Stock A`, dates hidden), lock calls in SQLite, then step forward one bar at a time. | Honest 5/10/20-bar follow-up shows whether your reads actually beat a blind baseline. |
| **Risk-focused trader:** *"I keep setting stop-losses too tight and getting shaken out on normal days. I want help sizing shares and placing stops outside normal noise."* | Every order ticket and Chart stop editor (`p`) checks **ATR14 ("a usual day")** and calculates max shares via **Size it from risk** (`r`). | Stops respect stock volatility and every trade risks a known, capped `%` of equity. |
| **Disciplined reviewer:** *"I forget why I bought a stock a month later and repeat the same errors."* | Record entry reasons on buy tickets, review them in **Your reasons** (`Paper → Review → w`) and **Trade review**, and rate **Agent** lessons. | Turns guesswork into a concrete record of which setups and habits actually worked. |

## Start in 10 minutes

If this is your first time opening `vnt`, try this five-step tour (nothing places a real order or spends money):

1. **Launch `vnt`** — Run `./vnt` (or `.\vnt.exe` on Windows) from your terminal. You land on **Today** (or **Get started** on your very first launch). See [Getting started](getting-started.md).
2. **Browse the market** — Press `2` (or `F3` then `2`) to open the **Market** board. Use `↑` `↓` to move down your watchlist and watch the mini-chart, grade factors, news, and foreign flow update for each stock. See [2 · Market](market.md).
3. **Inspect one stock deeply** — Press `Enter` on any stock (for example `FPT` or `VCB`) to open its **Stock** page. Check **Summary** (`1`st tab), switch to **Chart** (`Tab`), move the crosshair with `←` `→`, and toggle indicators (`'`). See [3 · Stock](stock.md).
4. **Practise without hindsight** — Press `C` on a stock to open **Chart study**, make a BUY / SELL / WAIT call while future bars stay hidden, then press `→` one bar at a time to test your chart reading honestly. See [6 · Lab](lab.md#chart-study).
5. **Place a simulated trade with a plan** — Press `B` to open a **Paper order**, enter share quantity, set a stop-loss and target, check how many "usual days" (`ATR14`) away your stop sits, and review the result in **Paper**. See [5 · Paper](paper.md).

## How to read keys and commands

- Keys appear in code style, like `Enter`, `Tab`, or `F3`.
- Letter keys are **case-sensitive**: `a` and `A` do different things (for example, on the board `a` adds a stock while `A` opens the Alert inbox).
- Commands typed after `:` look like `:brief` or `:history FPT`.
- Any page can press `?` (or `F1`) for contextual help, or `F3` (or `` ` ``) to jump between the 8 main places.

## Chapters

| Chapter | What it covers |
|---|---|
| [Getting started](getting-started.md) | Install, first launch, the 3-zone screen layout, Go to (`F3`), Get started, Help (`?`), command bar (`:`), themes |
| [1 · Today](today.md) | Morning overview: what moved near a level, paper book snapshot, agent status, upcoming events, suggested next steps |
| [2 · Market](market.md) | Live watchlist board, groups, screener (`S`), sector heat map (`H`), news, foreign flow, alerts, daily briefing |
| [3 · Stock](stock.md) | One stock in depth: Summary, Chart + crosshair/measure/levels/stop editing, Order book, Technicals, Trades, Backtest, Daily prices |
| [Reading charts & technical analysis](chart-reading.md) | Beginner theory behind candlesticks, 1–3 bar patterns, MA20/MA50, RSI14, MACD, Bollinger Bands, OBV, ADX14, ATR14, divergences & support/resistance |
| [4 · Find](find.md) | Ready-made Ideas, plain-English Describe scans (optional model), Pick signals, and scanning from saved bars |
| [5 · Paper](paper.md) | Paper accounts, Overview, Positions, Orders & drafts, Journal, Performance & Trade review, Risk guards, and the Paper order ticket |
| [6 · Lab](lab.md) | Backtesting 4 fixed rules, blind Replay, blind Chart study & history library, Guided practice, Agent practice, Grade check |
| [7 · Agent](agent.md) | Go-rule vs model agents, Auto paper, approval Decisions (`Needs you`), Track record, Lessons, Model cost log |
| [8 · Records](records.md) | Real holdings CSV import, corporate dividends, SQLite backup/restore, HTML/CSV/JSON exports, feed Health, Sectors, Theme |
| [Soinon in Codex and Claude Code](mcp.md) | Connect a local AI chat via MCP (`vnt mcp serve`) for read-only research and user-confirmed paper order previews |
| [Stock terms](stock-terms.md) | Plain-language glossary of Vietnam stock rules, order types, indicators, and app words |
| [Command line](command-line.md) | `vnt` subcommands for scripts, automation, diagnostics, and backup recovery |
| [Safety and your data](safety-and-data.md) | Paper-only boundaries, local SQLite storage, public feeds, limits the engine enforces, and paid model safeguards |

## Two words used everywhere

- **Saved** means read from your local SQLite file (`vnt` keeps price bars, news, and accounts on your computer). Pages always show how old saved data is.
- **Live** means fresh quotes polled from public market feeds while the exchange is open (for example during `● CONTINUOUS`, `ATO`, or `ATC` sessions).
