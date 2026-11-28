# Stock terms (Glossary)

Plain-English explanations of Vietnam stock market mechanics, order types, technical indicators, chart concepts, and terms used inside `vnt`. Where `vnt` calculates something a specific way, this page says exactly how.

---

## Market and exchanges

- **HOSE, HNX, UPCoM:** Vietnam's three equity trading venues — Ho Chi Minh Stock Exchange (`HOSE`), Hanoi Stock Exchange (`HNX`), and the Unlisted Public Company Market (`UPCoM`). `vnt` covers all three.
- **VN-Index (VNI), VN30, VN100:** `VN-Index` tracks all HOSE-listed stocks in points; `VN30` and `VN100` track the 30 and 100 largest, most liquid stocks. `Find` and watchlist Backtest runs can scan `VN30` or `VN100` directly.
- **Stock code (Ticker):** The three-letter symbol a company trades under, such as `FPT`, `VCB`, `GEX`, or `HPG`.
- **Watchlist & Groups:** Your curated lists of stock codes (`a` adds, `D` deletes, `G` manages named groups like *Banks* or *Watchlist 1*).
- **Sector:** Industry category (e.g., Banks, Steel, Real Estate) shown on **Stock → Summary**, **Market → Sector heat map (`H`)**, and **Paper** concentration checks (`vnt sectors import` loads bundled tags).

---

## Trading sessions and auctions

All times are Vietnam time (**ICT**, UTC+7). On a standard weekday session for **HOSE**:

| Time (ICT) | Session | Status bar | What happens |
|---|---|---|---|
| Before `09:00` | Pre-open | `○ PRE-OPEN` | Orders queue; no matching yet |
| `09:00–09:15` | Opening auction (**ATO**) | `ATO` | Orders collect and match at one opening price (no continuous ticks) |
| `09:15–11:30` | Morning continuous | `● CONTINUOUS` | Live matching tick by tick (`vnt` shows intraday break gaps cleanly) |
| `11:30–13:00` | Lunch break | `LUNCH` | Matching pauses (`┆` vertical marker on intraday `vnt` charts) |
| `13:00–14:30` | Afternoon continuous | `● CONTINUOUS` | Live matching resumes |
| `14:30–14:45` | Closing auction (**ATC**) | `ATC` | Orders match at one official closing price for the day |
| After `14:45` / Weekends | Closed | `○ CLOSED` | Saved daily closes finalize; quotes show last saved close |

- **Trading day / Exchange calendar:** Weekends and Vietnamese market holidays are skipped. **Records → Health** shows which calendar years are verified and warns if next year is still provisional.

---

## Prices, ticks, lots, and bands

- **Prices in thousand dong (`kVND`):** Stock prices omit three zeros: `43.00` means **43,000 ₫** per share. Account totals and P&L use full dong with commas (`18,687,990 ₫`).
- **Reference price:** Normally the previous session's closing price (adjusted downward on **ex-dividend dates**). Daily `%` change is measured from this price.
- **Ceiling and floor (Price band):** Maximum upward and downward move allowed in a single session around the reference price:
  - **HOSE:** ±**7%** (ceiling purple, floor cyan in Vietnam-board theme)
  - **HNX:** ±**10%**
  - **UPCoM:** ±**15%**
  *(Newly listed or post-suspension stocks can have wider bands; `Chart` marks ceiling/floor daily closes with `▴` / `▾`.)*
- **Tick size:** Minimum allowed price step (snapped automatically by the Paper order ticket and saved-level editor).
- **Lot size:** Shares on HOSE/HNX trade in **round lots of 100** (for example `100`, `300`, `1,000` shares).
- **Bid and ask:** Highest price buyers offer (**bid**) and lowest price sellers ask (**ask**). The **order book** shows best price levels and queued quantities when supplied by the feed.
- **Last:** Price of the most recent matched trade.
- **Volume:** Total shares traded (`4.6M` = 4.6 million shares).
- **Daily / Intraday bar (Candle):** Summarizes one period's **O**pen, **H**igh, **L**ow, **C**lose (**OHLC**) and Volume.

---

## Buying, selling, settlement, and risk

- **Settlement (`T+2` at `13:00`):** In Vietnam, shares bought on day `T` settle and become sellable at **13:00 two trading sessions later** (`T+2`, e.g. Monday's buy settles Wednesday `13:00`). Until then they show as *settling* (`◐ pending`) and **cannot be sold** — not even by a stop-loss!
- **Can sell:** Settled shares minus any shares already locked in open sell orders.
- **Limit order:** Buy at this price or lower, or sell at this price or higher.
- **Market order / ATO / ATC:** Fill at best available quote now (or at opening/closing auction price).
- **Stop-loss & Stop order:** Your pre-planned exit price to cap losses (`invalidation`). A stop order waits until live price drops to your trigger, then sells (if price **gaps** down at open or locks floor, a stop can fill worse than its trigger price).
- **Target:** Pre-planned price where you take profit (`SELL limit`).
- **Bracket order:** A protective **stop** and a **target** placed together after shares settle; when one fills, the other is cancelled automatically.
- **Protection states (in Paper & Briefing):**
  - `● order active`: An actual stop order is live and armed.
  - `◐ pending`: Buy is unsettled; bracket stop will arm automatically once shares settle (`T+2 13:00`).
  - `○ plan only`: You saved a stop price in your plan, **but no order is armed** to sell automatically.
  - `▲ no plan`: No stop price and no stop order at all.
- **Good for:** Order duration — `Today` (expires at market close) or `Until canceled` (`GTC`). *(Paper also supports queued orders and IOC/FOK checks.)*
- **Fee and tax:** Paper accounts simulate broker trading fee (e.g., `0.15%` each buy/sell) plus Vietnam's sell tax (`0.10%` on sells). "After fees and tax" includes both.
- **Position, Cost, Unrealized P&L:** Shares currently held, average entry price paid (**cost**), and open profit/loss vs last price (**unrealized** until sold).
- **Equity & Weight:** Account cash + market value of all positions (**equity**); one holding or sector divided by total equity (**weight**).
- **Drawdown:** Percentage fall from an account's highest recorded equity peak.
- **Risk (`R` multiple):** Planned loss from entry to your stop-loss = `1R`. Finishing a trade at `+2.0 R` means you made twice the amount you originally risked; `-1.0 R` means you lost roughly your planned stop distance.
- **Risk guards (Engine-enforced limits):** Non-bypassable safety checks in `Paper`: hard daily loss cap, max open positions, stop-loss-on-every-buy guard, max % equity cap per stock, and pause-on-drawdown guard.

---

## Charts, indicators & candlestick patterns

*(For deeper beginner intuition and examples, see [Reading charts & technical analysis](chart-reading.md).)*

- **OHLC / Candlestick:** Visual bar showing Open, High, Low, Close. Green = closed higher than open; red = closed lower; thin vertical wicks = intraday extremes.
- **1–3 bar candlestick patterns:** Classic short-term candle shapes checked on the latest 1–3 bars in `Technicals → Context`: **Doji**, **Hammer**, **Shooting Star**, **Bullish/Bearish Engulfing**, **Morning/Evening Star**, and **Bullish/Bearish Marubozu**.
- **Support and resistance:** Historical price zones where prior declines found buyers (**support**) or prior rallies met sellers (**resistance**), computed from saved swing highs and lows.
- **Your level (`y`):** Personal horizontal price line (with optional note) saved by you on `Stock → Chart` (up to 8 per stock).
- **Moving average (`MA20`, `MA50`):** Average closing price over the last 20 or 50 sessions. **Golden cross** = `MA20` crosses above `MA50`; **Death cross** = `MA20` crosses below `MA50`.
- **RSI14 (Relative Strength Index, 0–100):** Momentum oscillator over 14 sessions. Under `30` = oversold, over `70` = overbought; `> 50` scores bullish in `vnt`.
- **MACD histogram:** Gap between MACD momentum line (`12/26`) and its 9-day signal line. Positive = upward momentum (`> +0.005`), negative = downward (`< -0.005`).
- **Divergence:** Disagreement between price and RSI/MACD — **Regular bullish** (lower low in price, higher low in RSI/MACD), **Regular bearish** (higher high in price, lower high in indicator), plus **Hidden** trend-continuation variants.
- **Stochastic:** Momentum oscillator comparing closing price to its 14-session high-low range (available on the Market board lower pane).
- **Bollinger bands:** Upper and lower volatility envelopes placed 2 standard deviations around `MA20`.
- **VWAP:** Session Volume-Weighted Average Price — average price per share traded today.
- **ATR14 ("a usual day"):** Average True Range over 14 sessions — measures normal daily movement including overnight gaps. Used by **Stop against a usual day** on the order ticket and chart stop editor to warn against stops likely to get tripped by routine noise.
- **ADX14:** Trend strength meter (`0–100`). Below `20` = range-bound / sideways; above `25` = strong trend.
- **On-balance volume (`OBV`):** Cumulative running total adding volume on up-closes and subtracting on down-closes, showing 5-session accumulation or distribution.
- **Relative strength (`vs VN-Index`):** Stock return minus VN-Index return over the exact same matching sessions (`'` pane on Chart and `Flow and strength` on Summary).
- **Foreign flow & Foreign room:** Net shares bought minus sold by foreign investors, plus how many shares remain under Vietnam's foreign ownership cap.
- **The Grade (`A+` to `D`):** Objective sum of 7 daily factors (`Price vs MA20`, `Price vs MA50`, `MA20 vs MA50`, `RSI14`, `MACD histogram`, `Volume`, and half-weight `Foreign flow`). Descriptive summary only — never a prediction.

---

## Corporate actions & testing

- **Ex-date (Ex-dividend date):** If you buy *before* this date, you receive the cash dividend (minus 5% Vietnam cash dividend tax) or bonus shares. On the ex-date morning, the exchange lowers the stock's reference price by roughly the payout value, which can trigger tight stops if left unadjusted.
- **Backtest:** Simulating a fixed rule over saved daily bars (next-day open fills, fees, tax, and T+2 settlement enforced; needs `>= 30` trades for fair comparison against simply holding).
- **Against holding:** Rule return minus buy-and-hold return over the exact same days (in percentage points).
- **Replay:** Practising daily trading day-by-day on past dates while future highs/lows/closes remain hidden (`blind` hides stock name & dates too).
- **Chart study:** Practising chart analysis bar-by-bar with zero paper account and zero orders — recording `BUY` / `SELL` / `WAIT` calls, optional stop/target, and reviewing 5/10/20-bar follow-through and `R` outcomes.
- **Guided practice:** Answering what *you* would do at an agent's historical decision point before seeing what the agent chose and what followed over 5 and 20 sessions.
- **Grade check (`Lab → Grade check`):** Statistical test over your saved history checking whether `A`-graded stocks actually beat `D`-graded stocks over the next 5 and 20 sessions (with 90% confidence intervals).
- **Paper vs Real holdings:** **Paper** accounts simulate orders with pretend money; **Real holdings** under `Records` are purely private personal records for tracking shares you own outside `vnt` (no broker link, no orders placed).
