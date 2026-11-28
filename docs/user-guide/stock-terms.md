# Stock terms (Glossary)

Plain-English meanings of Vietnamese market rules, order mechanics, chart concepts, technical indicators, and `vnt` terms. Where `vnt` computes something a specific way, this glossary tells you the exact rule.

---

## Market and exchanges

- **HOSE, HNX, UPCoM:** Vietnam's three public stock trading venues — Ho Chi Minh City Stock Exchange (`HOSE`), Hanoi Stock Exchange (`HNX`), and Unlisted Public Company Market (`UPCoM`). `vnt` follows all three.
- **VN-Index (VNI), VN30, VN100:** Index benchmarks measured in points. `VN-Index` covers HOSE; `VN30` and `VN100` cover its 30 and 100 largest, most traded companies. `Find` and watchlist backtests can scan `VN30` or `VN100` out of the box.
- **Stock code (Ticker):** Short symbol a stock trades under, such as `FPT`, `VCB`, `GEX`, or `HPG`.
- **Watchlist & Groups:** Curated lists of stock codes you follow, which can be organized into separate named groups (for example *Banks* or *Core*).
- **Sector:** Industry tag (such as Banks, Steel, Technology, Real Estate) shown on **Stock Summary**, **Market Sector heat map**, and **Paper** concentration checks.

---

## Trading sessions and auctions

All times are Vietnam time (**ICT**, UTC+7). On a normal weekday on **HOSE**:

| Time (ICT) | Session | Status line | What happens |
|---|---|---|---|
| Before `09:00` | Pre-open | `○ PRE-OPEN` | Orders queue; no matching yet |
| `09:00–09:15` | Opening auction (**ATO**) | `ATO` | Orders accumulate and match at one opening price |
| `09:15–11:30` | Morning continuous | `● CONTINUOUS` | Live tick-by-tick order matching |
| `11:30–13:00` | Lunch break | `LUNCH` | Market pauses (`┆` gap marker on intraday charts) |
| `13:00–14:30` | Afternoon continuous | `● CONTINUOUS` | Live matching resumes |
| `14:30–14:45` | Closing auction (**ATC**) | `ATC` | Orders accumulate and match at the day's official closing price |
| After `14:45` / Weekends | Closed | `○ CLOSED` | Final daily close saved; board displays last saved closes |

- **Trading day & Exchange calendar:** Weekends and Vietnamese public holidays are non-trading days. **Records → Health** verifies which calendar years are loaded and flags provisional future years.

---

## Prices, ticks, lots, and price bands

- **Prices in thousand dong (`kVND`):** Stock quotes omit three zeros: `43.00` means **43,000 ₫** per share. Cash, fees, and P&L display full dong with commas (`18,687,990 ₫`).
- **Reference price:** Normally yesterday's closing price (adjusted downward on **ex-dividend dates**). Daily percentage change is measured from this price.
- **Ceiling and floor (Daily price band):** Maximum price rise or fall allowed in one day around reference:
  - **HOSE:** ±**7%** (ceiling purple, floor cyan in Vietnam-board colour scheme)
  - **HNX:** ±**10%**
  - **UPCoM:** ±**15%**
  *(Newly listed or post-suspension stocks can have wider bands; `Chart` marks ceiling/floor closes with `▴` / `▾`.)*
- **Tick size:** Minimum legal price increment (depends on price tier and exchange; `vnt` snaps order prices and saved chart levels to valid ticks automatically).
- **Lot size:** Standard trading unit of **100 shares** on HOSE/HNX.
- **Bid and ask / Order book:** Best price buyers are currently bidding (**bid**) and sellers are offering (**ask**), plus queued share depth at each tier when supplied by the feed.
- **Last:** Most recent matched trade price.
- **Volume:** Total shares traded (`4.6M` = 4.6 million shares).
- **OHLC bar / Candle:** One session's **O**pen, **H**igh, **L**ow, **C**lose prices and Volume.

---

## Buying, selling, settlement, and risk management

- **Settlement (`T+2` at `13:00`):** Shares bought on day `T` settle and become sellable at **13:00 two trading sessions later** (`T+2`, so Monday's buy settles Wednesday `13:00`). Until then they show as *settling* (`◐ pending`) and **cannot be sold** — even if price drops below your stop.
- **Can sell:** Settled shares minus any shares already reserved by open sell orders.
- **Limit order:** Buy at this price or lower, or sell at this price or higher.
- **Market / ATO / ATC order:** Execute at best available live price (or at the opening/closing auction price).
- **Immediate orders (`IOC` / `FOK`):** *Immediate-or-Cancel* (fills what it can immediately, cancels rest) or *Fill-or-Kill* (fills completely now or cancels). Requires fresh live checks at submission.
- **Stop-loss & Stop order:** Your pre-committed exit price to cap losses (**invalidation**). A stop order waits until live price hits your trigger, then submits a sell (warning: overnight **gaps** or floor locks can cause fills worse than your stop price).
- **Target:** Pre-planned price where you take profits (`SELL limit`).
- **Bracket order:** Paired **stop** and **target** orders placed together once shares settle; when one fills, the other cancels automatically.
- **Protection states (Paper & Briefing):**
  - `● order active`: Live protective stop order is armed right now.
  - `◐ pending`: Buy hasn't settled yet; bracket stop will arm automatically at `T+2 13:00`.
  - `○ plan only`: You wrote a stop price in your plan, **but no live order is armed**.
  - `▲ no plan`: No stop price and no stop order exist.
- **Good for (`Today` / `Until canceled`):** Whether an unfilled order expires at close (`Today`) or remains open across days (`GTC`), plus queued drafts saved for the next continuous open.
- **Fee and sell tax:** Each paper account applies broker commission on buys/sells (for example `0.15%`) plus Vietnam's `0.10%` sell tax on sales.
- **Position, Cost, Unrealized P&L:** Shares held, weighted average price paid (**cost**), and open paper gain/loss (**unrealized** until sold).
- **Equity & Weight:** Account cash + market value of all positions (**equity**); single stock or sector share of total equity (**weight**).
- **Drawdown:** Percentage decline from an account's highest historical equity peak.
- **Risk (`R` multiple):** Planned entry-to-stop dollar risk = `1R`. A trade netting `+2.0 R` earned twice your planned risk; `-1.0 R` lost roughly your planned risk.
- **Risk guards (Engine limits):** Deterministic rules checked locally in Go on every manual and agent order: daily loss limit, max open positions, stop-loss-on-every-buy guard, single-stock concentration cap, and pause-on-drawdown.

---

## Charts, technical indicators & candlestick patterns

*(See [Reading charts & technical analysis](chart-reading.md) for visual examples and theory.)*

- **Swing high / Swing low:** Local price peak or trough where surrounding bars turned back — used to identify trends and draw support/resistance.
- **Support and resistance:** Historical zones where falls found buyers (**support**) or rallies met sellers (**resistance**).
- **Saved level ("Your level"):** Personal horizontal line (plus short note) saved on `Stock → Chart` (up to 8 per stock).
- **Candlestick signals (1–3 bar):** Short-term shapes checked on the latest daily candles in `Stock → Technicals → Context`: **Doji**, **Hammer**, **Shooting Star**, **Bullish / Bearish Engulfing**, **Morning / Evening Star**, and **Bullish / Bearish Marubozu**.
- **Moving average (`MA20`, `MA50`):** Average closing price over the last 20 or 50 sessions. **Golden cross** = `MA20` crossing above `MA50`; **Death cross** = `MA20` crossing below `MA50`.
- **RSI14:** Relative Strength Index over 14 sessions (`0–100`). Under `30` = oversold, over `70` = overbought; `> 50` scores bullish in `vnt`.
- **MACD histogram:** Distance between the `12/26` momentum line and its `9`-day average. Positive (`> +0.005`) = accelerating momentum; negative (`< -0.005`) = fading.
- **Divergence:** Price makes a new high/low while RSI or MACD moves the opposite direction — **Regular** (reversal warning) or **Hidden** (trend continuation).
- **Stochastic:** Momentum gauge comparing today's close against the 14-session high–low range.
- **Bollinger bands:** Upper and lower volatility bands placed 2 standard deviations around `MA20`.
- **VWAP:** Volume-Weighted Average Price for the current trading day.
- **ATR14 ("a usual day"):** Average True Range over 14 sessions — normal daily movement including overnight gaps, used to test whether a stop-loss is dangerously tight.
- **ADX14:** Trend strength meter (`0–100`). Under `20` = sideways chop; above `25` = strong trend.
- **On-balance volume (`OBV`):** Cumulative running total adding volume on up days and subtracting on down days over 5 sessions.
- **Relative strength (`vs VN-Index`):** Stock `%` return minus `VN-Index` `%` return over identical dates.
- **Foreign flow & Foreign room:** Net foreign investor share buying/selling, plus remaining shares allowed under Vietnam foreign ownership limits.
- **The Grade (`A+` to `D`):** Transparent sum of 7 daily factors (`Price vs MA20`, `Price vs MA50`, `MA20 vs MA50`, `RSI14`, `MACD histogram`, `Volume`, and half-weight `Foreign flow`). Summary only — never a forecast.

---

## Corporate actions, testing & practice

- **Ex-date (Ex-dividend date):** Shares bought *before* this date receive the dividend (cash minus 5% Vietnam dividend tax, or bonus shares). On ex-date morning, the exchange drops the reference price by roughly the payout — tight stops can trigger unexpectedly if unadjusted.
- **Backtest:** Simulating a fixed trading rule over saved daily bars (next-day open fills, fees, tax, and T+2 settlement; needs `>= 30` trades to judge reliably).
- **Against holding:** Strategy return minus buy-and-hold return over identical dates (`percentage points`).
- **Replay:** Practising daily trading one open at a time with future highs/lows/closes hidden (optional blind mode hides stock name & dates).
- **Chart study:** Pure blind chart reading bar-by-bar with zero paper account — record `BUY`/`SELL`/`WAIT` calls, optional stops/targets, and measure 5/10/20-bar follow-through and `R` outcomes.
- **Guided practice:** Locking in your own call and primary reason at an agent's historical decision point before revealing what the agent did and what happened next.
- **Grade check:** Local statistical audit checking whether higher TA grades (`A`) beat lower grades (`D`) over the next 5 and 20 sessions in your saved database.
- **Paper vs Real holdings:** **Paper** simulates orders with pretend cash; **Real holdings** under `Records` tracks your actual off-app broker shares read-only with zero order authority.
