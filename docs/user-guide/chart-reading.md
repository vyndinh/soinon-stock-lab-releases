# Reading charts & technical analysis (beginner guide)

If you have never read a stock chart before, all the lines, bars, and acronyms (`MA20`, `RSI14`, `MACD`, `ATR14`) can look intimidating. This guide explains **every technical concept used in Soinon Stock Lab (`vnt`)** in plain English, how to spot common traps, and where to see each indicator in the app.

> **Golden rule of technical analysis:** Indicators and chart shapes **summarize past prices and volume**. They help you organize risk, spot stretched moves, and place logical stop-losses — they are **never** guarantees of what happens next.

---

## 1. Reading a candlestick (`Chart` tab)

Each vertical bar on the `Chart` tab represents one time period (**1 day** on the daily chart `4`, **1 week** on `W`, or **1m / 5m / 15m** intraday):

```text
   │   ← Upper wick (highest price buyers reached, then pulled back)
  ┌─┐
  │ │  ← Body (distance between Open and Close)
  └─┘
   │   ← Lower wick (lowest price sellers pushed down, then recovered)
```

- **Green candle (up bar):** Closed **higher** than it opened (buyers controlled the bar).
- **Red candle (down bar):** Closed **lower** than it opened (sellers controlled the bar).
- **Long lower wick:** Price dropped sharply during the day, then buyers stepped in aggressively before the close — often seen near **support**.
- **Long upper wick:** Price spiked up intraday, then sellers pushed it back down before the close — often seen near **resistance**.
- **Tiny body (`Doji`):** Open and close ended almost equal, showing indecision or a tug-of-war pause after a strong move.

### Vietnam price-limit markers (`▴` and `▾`)
Unlike U.S. or crypto markets, Vietnam exchanges enforce daily price bands around yesterday's close (**reference price**):
- **HOSE:** ±**7%**
- **HNX:** ±**10%**
- **UPCoM:** ±**15%**

When a stock closes locked at the **ceiling (`▴`)** or **floor (`▾`)**, `vnt` marks that day on the `Chart` marker row and in **Chart study**. Why does that matter? Because a floor lock can freeze liquidity so even a stop-loss cannot fill until buyers return — a critical real-world risk in Vietnam.

*(Try cycling `c` on `Stock → Chart` between thin candles, braille candles, block candles, and close-only line to see which view is clearest on your monitor.)*

---

## 2. Built-in 1–3 bar candlestick patterns (`Technicals → Context`)

`vnt` automatically checks the **most recent 1–3 daily candles** (`internal/ta/patterns.go`) and surfaces matches under **Stock → Technicals → CONTEXT** together with a context note (for example, whether it occurred near support or on higher volume):

| Pattern | Bars | What it looks like | Traditional reading |
|---|---|---|---|
| **Doji** | 1 | Open ≈ Close with visible wicks | Indecision; watch the next candle for direction |
| **Hammer** | 1 | Small body near top, long lower wick (≥2× body) after a drop | Sellers pushed down, buyers reclaimed control by close |
| **Shooting Star** | 1 | Small body near bottom, long upper wick after a rally | Buyers tried higher, sellers rejected the rally |
| **Bullish Marubozu** | 1 | Full green body with little/no wicks (close near high) | Strong buying pressure from open to close |
| **Bearish Marubozu** | 1 | Full red body with little/no wicks (close near low) | Strong selling pressure from open to close |
| **Bullish Engulfing** | 2 | Small red bar followed by a larger green bar covering its body | Momentum swung strongly from sellers to buyers |
| **Bearish Engulfing** | 2 | Small green bar followed by a larger red bar covering its body | Momentum swung sharply from buyers to sellers |
| **Morning Star** | 3 | Large red bar → small indecision bar → strong green bar | Classic 3-day bottoming shift |
| **Evening Star** | 3 | Large green bar → small indecision bar → strong red bar | Classic 3-day topping shift |

**Beginner tip:** A single `Hammer` floating in the middle of nowhere means very little. A `Hammer` appearing **right at a known support level with rising volume** is much more informative — which is why `vnt` reports context beside every pattern name rather than grading patterns blindly.

---

## 3. Trend indicators: Moving Averages (`MA20`, `MA50`) & `ADX14`

### Moving averages (`MA20` and `MA50`)
- **`MA20`** is the average closing price over the last **20 trading sessions** (~1 calendar month). Traders watch it as the **short-term trend**.
- **`MA50`** is the average over the last **50 sessions** (~2.5 months), representing the **medium-term trend**.

How beginners read them on `Stock → Summary`, `Chart`, and `Technicals`:
1. **Price above MA20 and MA50 (`+1` each in `vnt`'s score):** Uptrend — buyers have been willing to pay higher prices recently than over the past 1–2.5 months.
2. **MA20 above MA50 (`Golden cross` when it crosses up):** Short-term trend is stronger than medium-term trend; **Death cross** is the reverse.
3. **Pullback to MA20 (`Find → Idea 5`):** In strong uptrends, prices frequently pause and bounce near `MA20` rather than going straight up forever.

### `ADX14` — How strong is the trend?
Moving averages fail badly during **choppy sideways ranges** (producing whipsaw crosses). **ADX14** measures trend *strength* (not direction, from 0 to 100):
- **Below 20:** Weak / sideways range — trend-following rules (`MA cross`) struggle; range/mean-reversion tools (`RSI`, `Bollinger`) make more sense.
- **Above 25:** Established trend — either up or down! Check `MA20` vs `MA50` to see which way.

---

## 4. Volume & Money Flow: Confirming whether moves have backing

Price alone can drift on tiny volume. **Volume** tells you how much real money participated:

1. **Volume vs 20-day average (`Chart` volume bars & `Technicals` factor):**
   - Breakouts above resistance on **`1.5×` to `2×`+ volume** show broad participation rather than a thin late-day tick. `Find → Pick signals` uses `> 1.5×` for Breakouts/Breakdowns and `2×` for Volume surges.
2. **On-Balance Volume (`OBV`, shown in `Technicals → Context`):**
   - Adds a day's volume when close rises and subtracts it when close falls. If OBV rises over 5 sessions while price drifts flat, buyers may be quietly accumulating shares.
3. **VWAP (`Stock → Technicals` & Market board intraday chart):**
   - *Volume-Weighted Average Price* resets each intraday session. It shows the average price per **share traded today** — institutional desks often benchmark fills against VWAP.
4. **Foreign Flow & Room (`Stock → Summary`, `Market`, `Technicals`):**
   - Foreign institutional flows heavily influence liquid VN30/VN100 blue chips (such as `VCB`, `FPT`, `HPG`). Note that in `vnt`'s daily score, foreign flow has half weight (`±0.5`), and **CLI** commands (`vnt score`) exclude intraday foreign flow so offline daily calculations stay exact.

---

## 5. Momentum & Divergences: `RSI14`, `MACD`, `Stochastic`

Turn these on in **`Stock → Chart`** by pressing **`'`** (or read them in **`Stock → Technicals`**):

### `RSI14` (Relative Strength Index, 0–100)
Measures how fast recent up-days compare to down-days over 14 sessions:
- **Under 30 (`Oversold`):** Price has fallen sharply; selling may be stretched (`Find → Idea 1`). *Warning for newbies:* in a severe downtrend, RSI can stay under 30 while price keeps dropping ("falling knife") — always check **support** and **wait for stabilization** before assuming a bounce!
- **Around 50:** `vnt` scores `RSI14 > 50` (and below overbought) positively in healthy momentum, and `< 50` negatively (`Technicals`).
- **Over 70 (`Overbought`):** Rally has run very fast; upside may pause or pull back (`Find → Pick signals`).

### `MACD Histogram`
Shows the distance between the **MACD momentum line** (`12/26 EMA` spread) and its **9-day signal average**:
- **Positive & growing:** Upward momentum is accelerating.
- **Negative & shrinking toward zero:** Selling pressure is losing steam.
- `vnt` treats tiny readings inside a narrow dead-band near zero (`±0.005`) as **neutral (`0`)** so tiny rounding jitters don't flip the Grade.

### Divergences (spotted in Screener / `internal/ta/divergence.go`)
A **divergence** occurs when price makes a new extreme that momentum **refuses to confirm**:
- **Regular Bullish Divergence:** Price makes a **lower low**, while RSI/MACD makes a **higher low** → downward selling force is weakening (potential reversal warning).
- **Regular Bearish Divergence:** Price makes a **higher high**, while RSI/MACD makes a **lower high** → rally is losing fuel behind the scenes.
- **Hidden Bullish / Bearish Divergence:** Momentum resets deeper while price holds a higher low (uptrend continuation) or lower high (downtrend continuation).

---

## 6. Volatility & Logical Stop-Loss Placement: `ATR14` & `Bollinger Bands`

One of the biggest beginner mistakes is putting a stop-loss **too close** (like `-1.5%` because it "feels safe"), getting knocked out by ordinary daily noise, and watching the stock rally afterward.

### `ATR14` ("a usual day")
**Average True Range over 14 sessions** measures how much a stock normally moves from high to low in a single day (including overnight gaps from yesterday's close).
- Look at the **`STOP AGAINST A USUAL DAY`** block in **`Paper order → Edit`** and **`Stock → Chart → Move the stop (p)`**:
  - Suppose `VCB` has `ATR14 = 1.12` (`1.8%` a day) and you set a stop `1.6 usual days` away (`60.30` below `62.20`). `vnt` checks your saved history and tells you: *"The low was that far under the prior close 4 days in 60."*
  - By contrast, if you tighten a stop to `0.5 usual days` away (`GEX` at `27.00` vs `27.40`), `vnt` warns that normal movement hits it on `23 of the last 60 sessions`!
- **`SIZE IT FROM RISK`:** Once you choose a logical stop distance **below support or ≥ 1–1.5× ATR14**, let risk sizing (`r` on the order ticket) compute share count automatically (`Risk % of equity ÷ distance to stop`), instead of buying a huge size with an impossibly tight stop.

### Bollinger Bands (`20-day MA ± 2 standard deviations`, `Chart study` & `Backtest`)
- When price hugs or pokes outside the upper/lower bands, volatility is unusually stretched.
- **Mean reversion** (`Lab → Backtest` Bollinger rule) looks for prices dipping below the lower band in range-bound stocks and returning toward the middle (`MA20`) or upper band.

---

## 7. Support, Resistance & Relative Strength (`vs VN-Index`)

- **Support:** A prior price floor where buyers stepped in before (`LEVELS` in `Stock → Summary` & `Technicals`, computed from historical swing lows). Waiters look for stops slightly *below* clear support (`-1` or `-2` ticks below), never right on the round number where stops cluster.
- **Resistance:** A prior ceiling where rallies stalled (`swing highs`). Once resistance breaks decisively on strong volume (`> 1.5×`), it often reverses roles and acts as new support.
- **Custom levels (`y`):** When moving averages or automatic swings miss a gap edge or multi-month range top you spot by eye, save up to 8 personal levels per stock with `y` on the Chart crosshair.
- **Relative strength (`'` pane `vs VN-Index`):** Sometimes a stock rises `+2%` simply because `VN-Index` jumped `+3%` (actually weak!). Plotting `vs VN-Index` strips out the market tide so you can spot true leaders holding steady or rising even when the index falls.

---

## 8. How `vnt`'s 7-Factor Grade works (and doesn't work)

Every daily stock grade (`A+` down to `D`) adds **7 objective readings** from saved daily bars:

| Factor | `+1` (`for`) | `-1` (`against`) | `0` (`neutral`) |
|---|---|---|---|
| **Price vs MA20** | Close > MA20 | Close < MA20 | Equal |
| **Price vs MA50** | Close > MA50 | Close < MA50 | Equal |
| **MA20 vs MA50** | MA20 > MA50 | MA20 < MA50 | Equal |
| **RSI14** | Above 50 (healthy momentum) | Below 50 (or extreme caution) | Neutral band |
| **MACD histogram** | `> +0.005` | `< -0.005` | Inside `±0.005` dead band |
| **Volume** | Rising bar with volume support | Falling bar with volume expansion | Quiet / neutral |
| **Foreign flow** | Net buying (`+0.5`) | Net selling (`-0.5`) | Net 0 / unavailable |

Sum `>= 5` → `A+`, `4` → `A`, `3` → `B+`, `2` → `B`, `1` → `C+`, `0` → `C`, `-1` → `C-`, `-2` → `D+`, `< -2` → `D`.

> **Test it yourself before trusting it:** Open **`Lab → Grade check`** (`g` from `Why this grade` or Lab home) to check whether `A`-graded stocks in **your own saved database** actually beat `D`-graded stocks over the next 5 and 20 sessions — complete with 90% confidence intervals! And practise making calls blind in **`Lab → Chart study`** (`C`) before risking even paper money.
