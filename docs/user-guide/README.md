# Soinon Stock Lab user guide

**Soinon Stock Lab (`vnt`)** is a local-first desktop terminal workbench for following Vietnamese stocks on **HOSE**, **HNX**, and **UPCoM**, learning how to read charts honestly, practising trades with simulated paper money, and testing rules on historical data. Everything runs privately on your computer in a single local SQLite file and requires **no brokerage account or API key** for market data.

> **Research and practice software only.** Every order in Soinon Stock Lab is a local paper simulation. Nothing ever reaches a real broker, and the app never gives investment, financial, or tax advice.

---

## 1. What features Soinon Stock Lab supports & how they benefit you

| Capability | What it includes | How it benefits a beginner or trader |
|---|---|---|
| **Daily & Live Market Workspace** | Watchlists & custom groups, live quotes (`VPS`), intraday & daily candlesticks, news feed (`CafeF`), foreign investor flow, sector heat map, price/indicator alerts, and a **Daily Briefing** that tracks what changed since your last review. | Replaces noisy social media and scattered browser tabs with one calm view showing only meaningful price moves, dividend dates, and stop warnings. |
| **Deep Single-Stock Research** | Six coordinated views for any stock: **Summary** (levels, 6-month trend, foreign flow, news, agent/events), **Chart** (daily/weekly/intraday candles, crosshair, swing measure tool, personal saved price lines, RSI/MACD/VN-Index comparison, and direct stop editing), **Order Book**, **Technicals** (7-factor scorecard + exact flip thresholds), **Recent Trades**, and local **Backtest** preview. | Lets you inspect a stock's trend, support/resistance, normal daily volatility (`ATR14`), and fundamentals/news in under a minute before risking paper cash. |
| **Transparent Stock Screening (`Find`)** | Six built-in free quantitative **Ideas**, custom **Pick signals** builder, and optional plain-English **Describe** queries (with explicit preview before scanning locally). | Helps you systematically find setups like oversold pullbacks near support or volume-confirmed breakouts without guessing or hunting blindly. |
| **Realistic Paper Trading (`Paper`)** | Multiple paper accounts enforcing Vietnam market rules: **100-share lots**, exchange ticks, `±7%/10%/15%` daily price bands, **T+2 settlement at 13:00**, fees, sell tax, bracket stops/targets, **Risk sizing** (`% of equity`), **Stop against a usual day (`ATR14`)**, Trade Journal, **Trade Review**, and **Your Reasons**. | Teaches real market mechanics and disciplined position sizing safely with pretend money — exposing sloppy habits (like skipping stops or oversized bets) before real money is at stake. |
| **Bias-Free Historical Practice (`Lab`)** | **Backtest** (4 fixed rules on historical bars with 30-trade validity checks), blind **Replay** (trade historical days one open at a time with hidden ticker/dates), blind **Chart Study** (record `BUY/SELL/WAIT` calls bar-by-bar with zero paper account clutter), **Guided Practice**, **Agent Practice**, and **Grade Check**. | Cures **hindsight bias** — proves whether your chart reading and indicator rules actually hold up when the right half of the chart is hidden. |
| **Accountable Trading Assistant (`Agent`)** | Scheduled **Auto Paper** sessions and co-pilot **Decisions (`Needs you`)** driven either by a free deterministic **Go rule** or an optional paid AI **Model**, plus **Track Record**, **Lessons** (*did its reasons hold?*), and **Model Cost Log**. Strict risk limits stay locked in Go code. | Lets you observe or co-pilot automated rule/model trade proposals inside strict capital limits, then audit whether the reasoning held 5–20 sessions later. |
| **Private Local Records & Export** | Read-only **Real Holdings** tracker (CSV import with snapshot protection), **Dividends / Ex-date** calendar, verified local **SQLite Backups**, **CSV / JSON / standalone HTML page exports**, **Feed Health** diagnostics, **Sector tags**, and accessible **Themes**. | Keeps your real broker portfolio private on disk, prevents surprise ex-dividend stop triggers, and safeguards all your notes and backups locally. |

---

## 2. User stories & real-world use cases

### Story 1 · The complete beginner learning without financial risk
> *"As someone new to Vietnamese stocks, words like T+2 settlement, HOSE ceiling/floor, stop-loss, and RSI confuse me — and I'm afraid of losing real money on simple mistakes."*
- **How you use `vnt`:** Start by reading the [Glossary](stock-terms.md) and [Reading charts & technical analysis](chart-reading.md). Then open **Lab → Chart study** in blind mode (`Stock A`) to practise spotting trends and support/resistance without risking even virtual cash. Finally, open a **Paper** account and place a small simulated buy to experience 100-share lots, `T+2 13:00` settlement locks, and automatic bracket stops firsthand.

### Story 2 · The busy weekday worker (5-minute daily routine)
> *"I work full time and can only check the market briefly at lunch or after the close. I need to know immediately if my holdings hit danger or if anything important changed."*
- **How you use `vnt`:** Open **Today** to see only stocks moving close to your stops, targets, or resistance lines plus upcoming ex-dividend dates. Set price or MA/RSI watches in **Market → Alerts**. After market close, open **Market → Daily briefing** to review every change against your previous baseline in two minutes.

### Story 3 · The trader trying to stop getting shaken out by noise
> *"My stop-losses keep getting hit on ordinary red mornings, only for the stock to bounce back the next afternoon."*
- **How you use `vnt`:** Before entering a trade in **Paper order**, look at **Stop against a usual day (`ATR14`)** to make sure your stop sits comfortably beyond normal daily swings (for example `1.5× ATR14` and tucked beneath clear **Support**). Then let **Size it from risk** calculate a safe share count based on risking only `0.5%` of account equity.

### Story 4 · The chart learner fighting hindsight bias
> *"Everything looks obvious in hindsight on a static chart, so I want an honest test of whether my setups actually work before breaking out."*
- **How you use `vnt`:** Run **Lab → Replay** or **Chart study** with dates and stock names hidden. Commit your call, stop, target, and written reason while future candles remain invisible, then step forward day-by-day and inspect your 5/10/20-bar follow-through against the market's own base rate. Open **Lab → Grade check** to test statistically whether `A`-graded setups outperform `D`-graded setups on your saved history.

### Story 5 · The systematic reviewer building discipline
> *"I keep repeating the same trading mistakes because I forget why I bought a stock a month earlier."*
- **How you use `vnt`:** Record your structured reason (`Price above MA20`, `Volume confirmation`, `A level you named`) and *"Wrong if"* exit rule on every **Paper** buy. Weeks later, open **Paper → Performance → Trade review** and **Paper → Review → Your reasons** to measure objectively which reasons actually paid off.

---

## 3. Recommended reading order for beginners

1. **Understand the language, charts & testing rules first** *(no keyboard shortcuts required yet)*:
   - [Stock terms (Glossary)](stock-terms.md) — Vietnam exchange sessions, `±7%/10%/15%` bands, `kVND` pricing, settlement, orders, and `R`.
   - [Reading charts & technical analysis](chart-reading.md) — How candlesticks, trends, support/resistance, volume, indicators, divergences, `ATR14` stops, and risk-reward work on `vnt` charts.
   - [Backtesting theory & how `vnt` tests rules](backtesting.md) — Look-ahead bias, Vietnam `T+2`/limit-band execution, realistic costs, sample size (`>= 30`), drawdowns, and interpreting backtest metrics honestly.
2. **Understand how screens work, what they show, and real examples**:
   - [Getting started](getting-started.md) — Screen layout, the 8 workspaces, themes, and safe onboarding.
   - [1 · Today](today.md) · [2 · Market](market.md) · [3 · Stock](stock.md) · [4 · Find](find.md) · [5 · Paper](paper.md) · [6 · Lab](lab.md) · [7 · Agent](agent.md) · [8 · Records](records.md).
   *(Every chapter explains **purpose → benefits/stories → screen images & examples first**, and puts **navigation & keyboard controls cleanly at the bottom** once you know what each screen is for.)*
3. **Optional integrations & safety reference**:
   - [Soinon in Codex and Claude Code](mcp.md) — Connect local AI chats (`vnt mcp serve`) for read-only research and user-confirmed paper order previews.
   - [Command line](command-line.md) — `vnt` CLI commands for scripting, diagnostics, and database recovery.
   - [Safety and your data](safety-and-data.md) — Paper-only guarantees, local SQLite storage, model costs, and hard limits.

## Two words used everywhere in this guide

- **Saved** means read from your local SQLite database file on your computer. Pages always state how old saved data is.
- **Live** means fresh quotes polled from public market feeds while the Vietnamese exchanges are open (`ATO`, `● CONTINUOUS`, `ATC`).
