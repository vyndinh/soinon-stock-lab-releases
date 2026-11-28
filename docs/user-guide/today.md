# 1 · Today

**Purpose:** Give you one calm daily starting point instead of forcing you to check five screens every morning. Today answers four questions at a glance:
1. Did any watched or held stock move close to an important level (your stop, waiting order, resistance, or heavy foreign flow)?
2. Where does your active paper account stand right now?
3. Did your automated agent propose an order or decide anything that needs you?
4. What market sessions or corporate ex-dividend dates are coming up next?

> **Safety reminder:** Today never places orders. Simulated stops and price alerts are evaluated **only while `vnt` is running**.

---

## Use cases & user stories (Benefits)

- **2-minute morning safety check:** *"As a beginner holding 4 paper positions, I want to know immediately if any stock is drifting toward my stop-loss or going ex-dividend before continuous trading heats up."* → **`MOVING NOW`** puts threatened stops at the top and **`COMING UP`** flags upcoming ex-dividend dates.
- **No-blind-spot co-pilot handoff:** *"If I'm testing an Auto paper or approval agent, I want one clear alert whenever a proposal needs my yes/no decision."* → **`Needs you`** and **`DO NEXT`** surface pending proposals right on the landing page.
- **Skipping noise on quiet days:** *"I watch 30 stocks — don't clutter my screen with stocks doing nothing."* → Today filters out quiet tickers (`27 other stocks have no nearby saved level`) so your attention goes straight to what matters.

---

## Screen walkthrough & worked example

![Today screen during continuous trading showing Moving now, Your book, Agent, Coming up, and Do next](images/today.png)

Look through each block in the example above during continuous morning trading (`10:42:06 ICT`):

### 1. `MOVING NOW` — stocks near a trigger
Instead of listing all 30 stocks in your watchlist, Today highlights only stocks close to a meaningful threshold and states *why* in plain words:
- **`▼ GEX 26.95 -1.6% · 0.6% above your stop 26.80`** — Early warning: `GEX` dipped close to your stop-loss at `26.80` (26,800 ₫).
- **`▲ HDB 27.30 +1.5% · 0.4% below resistance 27.40 · foreign net bought 310K shares today`** — Price is testing a historical ceiling backed by foreign buying.
- **`▲ ACB 21.40 +0.5% · your limit SELL 4,300 at 21.50 is 0.5% away · not filled`** — Your resting sell order is nearly reached.

### 2. `YOUR BOOK` & `AGENT`
- **`YOUR BOOK DEMO_01`:** Live equity (`498.1 M ₫`, `-0.3% today`), capital deployed (`5 positions · 71% invested`), resting orders vs armed protective stops, your **Closest stop** (`GEX · 0.6% away`), and how much of your hard **Daily loss** limit (`1,290,000 of 20,000,000 ₫`) is used.
- **`AGENT`:** Shows your active Auto paper session (Day 10 of 20 on `VCB`), today's `09:30` decision, running return, next decision timestamp, and **`Needs you: 1 decision on FPT waits`**.

### 3. `SINCE YOU LAST LOOKED` & `COMING UP`
- **`SINCE YOU LAST LOOKED`:** Shows the exact time you last marked the [Daily briefing](market.md#3-daily-briefing) reviewed (`today 08:52`) so you know what your comparison baseline is.
- **`COMING UP`:** Exchange milestones for today (`11:30-13:00 Lunch break`, `14:30-14:45 Closing auction`) plus saved corporate events such as **`Tue 17 Nov HDB ex-dividend · 1,000 ₫ a share`** — helping you remember that tomorrow's reference price adjusts down at open.

### 4. `DO NEXT` — prioritized actions
Instead of making you memorize what to check next, **`DO NEXT`** suggests up to four logical steps based on your actual state (inspect `GEX`, decide on `FPT`'s proposal, or open the live **Market** board).

---

## Beginner morning routine example

1. Open `vnt` shortly after continuous trading stabilizes (`09:35`).
2. Scan **`MOVING NOW`** to see if any holding is close to its stop or testing resistance (`GEX` above).
3. Check **`COMING UP`** for any ex-dividend dates in the next few days.
4. Once a day, open the **Daily briefing** (`review changes`) to compare today against your previous baseline.

---

## How to open and use Today (Controls)

`vnt` opens on **Today** by default (use `vnt --board` if you prefer starting on the Market board). Once you are familiar with Today, these controls navigate directly from it:

| Key | Action |
|---|---|
| `↑` `↓` | Select a stock in `MOVING NOW` or a step in `DO NEXT` |
| `Enter` | Open the highlighted stock's full page (or run the highlighted `DO NEXT` step) |
| `F2` | Jump straight to the holding closest to its stop-loss |
| `b` | Open your full account summary in **Daily briefing → Book** |
| `v` | Open **Daily briefing** to review changes |
| `p` | Act on a stop plan step when `DO NEXT` lists one |
| `a` | Open a saved research brief (when available) |
| `A` | Open **Agent** home / pending Decisions |
| `2` or `Esc` | Switch to the live **Market** board |
| `F3` | Open **Go to** (`1` returns to Today from anywhere) |
| `?` | List all keys |
| `q` | Quit `vnt` |
