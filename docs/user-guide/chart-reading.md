# Reading charts & technical analysis (Beginner guide)

If you have never read a stock chart before, candlesticks, moving averages, volume bars, and acronyms like `MA20`, `RSI14`, `MACD`, `OBV`, `ADX14`, and `ATR14` can look confusing. This guide teaches the **core technical analysis theory behind `vnt`'s charts and scorecards** in plain English, using concrete market logic and common beginner traps to avoid.

> **Golden rule of technical analysis:** Indicators, patterns, and grades **describe past prices and volume**. They help you read market structure, spot stretched moves, and place logical stop-losses — they **never** guarantee future prices.

---

## 1. Price structure: Trends, Swings & Support/Resistance

Before looking at any indicator, look at **price itself**. Prices rarely move in straight lines — they move in waves (**swings**).

### How trends work (Higher Highs vs Lower Lows)
```text
Uptrend (Buyers in control):              Downtrend (Sellers in control):
           High 2                               High 1
          /      \                             /      \
    High 1        \                     Low 1 /        High 2 (lower peak)
   /      \   Low 2 (higher low)             \        /      \
Low 1      --'                                '--    /        Low 2 (lower low)
```

- **Uptrend:** Each rally reaches a **higher high** and each pullback stops at a **higher low**. Buyers step in earlier on every dip.
- **Downtrend:** Each bounce peaks at a **lower high** and each drop breaks to a **lower low**. Sellers exit into every bounce.
- **Sideways range (Consolidation):** Price bounces repeatedly between a floor and ceiling with no clear direction. Many trend strategies lose money chopping back and forth inside ranges.

### Support, Resistance & Role Reversal
- **Support (Floor):** A price zone where previous declines stopped because buyers saw value and stepped in (`LEVELS` below the current price in `vnt`, computed from swing lows).
- **Resistance (Ceiling):** A price zone where previous rallies stalled because sellers took profits (`LEVELS` above current price, computed from swing highs).
- **Role Reversal:** Once price breaks cleanly *above* an old resistance ceiling on heavy volume, buyers who missed the breakout often step in on a pullback to that same price — turning **old resistance into new support**. The reverse happens when major support breaks down.
- **False Breakouts ("Bull Traps"):** Price pokes briefly above resistance on weak volume, lures impatient buyers in, then snaps right back below the line by the close. Waiting for a **strong daily close** backed by volume helps filter traps.

> **Newbie tip for stops:** Never place your stop-loss *directly on* an obvious round support number (like `60.00`), because market noise frequently sweeps just a tick below round levels before bouncing. Tuck stops slightly *under* support and beyond normal daily noise (`ATR14`).

---

## 2. Candlesticks: Reading buyer vs seller pressure

Every candlestick summarizes four prices over one window (**1 day** on daily charts, **1 week** on weekly, or **1m / 5m / 15m** intraday):

```text
    │    ← Upper wick (highest intraday price; rejected by sellers)
  ┌───┐
  │   │  ← Body (Open vs Close: who won the session)
  └───┘
    │    ← Lower wick (lowest intraday price; defended by buyers)
```

- **Green bar (Up candle):** Close finished **above** Open — buyers controlled the bar.
- **Red bar (Down candle):** Close finished **below** Open — sellers controlled the bar.
- **Long lower wick:** Sellers pushed price sharply down early in the session, then buyers stepped in strongly to push it back up before the close (rejection of lower prices).
- **Long upper wick:** Buyers pushed price up, but sellers overwhelmed the rally by close (rejection of higher prices).
- **Small body with long wicks (`Doji`):** Stalemate / indecision between buyers and sellers.

### Vietnam price limits (`▴` Ceiling and `▾` Floor locks)
On Vietnamese exchanges, daily movement is capped around yesterday's close (**reference price**):
- **HOSE:** ±**7%** · **HNX:** ±**10%** · **UPCoM:** ±**15%**

When a stock finishes locked at the **ceiling (`▴`)** or **floor (`▾`)**, `vnt` marks that session directly on daily charts and in **Chart study**.
- **Why this matters practically:** When a bad news shock locks a stock at its daily **floor** (`-7%`) with zero buyers in the bid queue, a protective stop-loss cannot fill at that price — it must wait until liquidity returns on a later session (potentially at a much lower gap price).

### Built-in 1–3 bar candlestick signals
In **Stock → Technicals (`CONTEXT`)**, `vnt` checks the latest 1–3 daily candles for 9 classic formations and always pairs the shape with market context (nearby trend, support/resistance, and volume):

| Pattern | Bars | Visual story | What it suggests (in context) |
|---|---|---|---|
| **Doji** | 1 | Open ≈ Close | Indecision; watch next bar for direction |
| **Hammer** | 1 | Small upper body, lower wick ≥2× body after a drop | Buyers defended lower prices — strongest right on **support** |
| **Shooting Star** | 1 | Small lower body, tall upper wick after a rally | Sellers rejected higher prices — warning sign near **resistance** |
| **Bullish / Bearish Marubozu** | 1 | Tall full green or red body, almost zero wicks | One-sided buying or selling conviction from open to close |
| **Bullish Engulfing** | 2 | Small red candle completely swallowed by a bigger green body | Sudden shift from selling drift to strong buying control |
| **Bearish Engulfing** | 2 | Small green candle swallowed by a larger red body | Sudden supply surge wiping out prior session's gains |
| **Morning Star** | 3 | Big red bar → small pause/indecision bar → strong green bar | 3-session shift from selling to buyer momentum |
| **Evening Star** | 3 | Big green bar → small pause/indecision bar → strong red bar | 3-session topping shift from rally to selling |

---

## 3. Trend Indicators: Moving Averages (`MA20`, `MA50`), `ADX14` & Multi-Timeframe Reading

### Moving Averages (`MA20` and `MA50`)
A Simple Moving Average smooths daily price chatter so trend direction stands out:
- **`MA20`** (average close of the past **20 trading sessions**, ~1 month) tracks the **short-term trend**.
- **`MA50`** (average close of the past **50 sessions**, ~2.5 months) tracks the **medium-term trend**.

Practical ways traders read `MA20` and `MA50`:
1. **Trend alignment (`Price > MA20 > MA50`):** Short- and medium-term trends agree to the upside; pullbacks often pause near rising `MA20` or `MA50` (acting as *dynamic support*).
2. **Golden Cross (`MA20` crosses above `MA50`) vs Death Cross (`MA20` crosses below `MA50`):** Slow, confirming regime shifts — useful for medium-term context, though lagging on fast turns.
3. **Extension warning:** When price sprints far above `MA20` (for example `+12%–15%` above `MA20`), rubber-band mean reversion toward `MA20` becomes more likely even in healthy uptrends.

### `ADX14` — Separating Trends from Sideways Chop
**Average Directional Index (`ADX14`)** measures **trend strength** (0–100), *not* direction:
- **`ADX14 < 20`:** Sideways, choppy market. Moving-average crossovers give frequent false signals here; range indicators (`RSI14`, `Bollinger Bands`) behave better.
- **`ADX14 > 25`:** Strong, persistent directional trend (up *or* down — check `MA20` vs `MA50` for direction). Pullbacks toward `MA20` in an `ADX > 25` uptrend are a classic continuation setup.

### Top-Down Multi-Timeframe Analysis (`1W → 1D → 15m/5m`)
Professional chart readers zoom out before zooming in:
1. Check **Weekly (`1W`) & Daily (`1D`)** first to identify major trend, support/resistance, and upcoming hurdles (`Stock → Summary / Chart`).
2. Only then look at **Intraday (`15m`, `5m`, `1m`)** to watch intraday execution around **`VWAP` (session average)**.
`vnt` summarizes **`5m · 15m · 1D · 1W`** side-by-side in **Technicals** and **Why grade** so you spot timeframe conflicts immediately (for instance, a weak 5-minute bounce inside a strong `1D`/`1W` downtrend).

---

## 4. Volume, Flow & Market Conviction

Think of **price as the car** and **volume as the fuel**:

- **Volume vs 20-day average:**
  - A breakout above resistance on **`1.5×` to `2.0×+` volume** shows broad participation backing the move.
  - A bounce on thin `0.5×` volume lacks institutional conviction and fails easily.
  - Conversely, **Volume Climax** (huge `3×`+ volume spike right into multi-month resistance or after a long crash) often marks exhaustion where early participants hand shares off.
- **On-Balance Volume (`OBV`):** Keeps a running score adding volume on up-closes and subtracting volume on down-closes. If price moves sideways in a flat base while `OBV` climbs over 5–10 sessions, buyers may be quietly accumulating shares ahead of a move.
- **Intraday `VWAP` (`session average`):** Volume-weighted average price for today's trading session. Staying consistently above `VWAP` signals buyers controlled most of today's transacted volume; drifting below `VWAP` shows sellers pressing afternoon prices down.
- **Foreign Flow & Foreign Room:** On liquid HOSE leaders (`VCB`, `FPT`, `HPG`), persistent multi-day foreign net buying or selling adds significant tailwind or headwind. *(Note: `vnt` weights foreign flow at half weight `±0.5` in its daily Grade so local chart structure still leads.)*

---

## 5. Momentum Oscillators & Divergences (`RSI14`, `MACD`, `Stochastic`)

Momentum tools measure **speed and acceleration** rather than raw price level:

### `RSI14` (Relative Strength Index, 0–100)
Compares average up-closes vs down-closes over 14 sessions:
- **Below `30` (Oversold):** Selling pressure has stretched sharply down. Useful for spotting rebound candidates **near clear historical support** — **danger:** in strong downtrends (`ADX > 25`, below `MA50`), `RSI14` can stay oversold for weeks while price keeps falling ("catching a falling knife").
- **Above `50` vs below `50`:** In `vnt`'s 7-factor score, `RSI14 > 50` supports bullish momentum; `< 50` warns momentum leans bearish.
- **Above `70` (Overbought):** Price rose rapidly; strong trends can stay over `70`, so treat it as a warning not to chase stretched entries blindly, rather than an automatic sell.

### `MACD Histogram`
Measures the gap between the fast/slow trend difference (`12/26 EMA`) and its 9-day signal average:
- **Positive & growing (`> +0.005`):** Upward momentum is accelerating.
- **Crosses from negative to positive:** Early momentum shift ahead of slower `MA20/MA50` crosses.
- `vnt` treats tiny readings inside `±0.005` as **neutral (`0`)** to prevent noisy score flips.

### `Stochastic Oscillator`
Compares where today's close sits inside the 14-day High–Low range (`0–100`), useful for spotting short-term swings inside sideways ranges (available on the Market board lower pane and Chart study).

### Divergences — Reading behind the headlines
A **divergence** happens when price makes a fresh extreme that momentum refuses to match:
- **Regular Bullish Divergence:** Price makes a **lower low**, while `RSI14` or `MACD` prints a **higher low** → downward selling force is fading (early reversal alert).
- **Regular Bearish Divergence:** Price makes a **higher high**, while `RSI14`/`MACD` prints a **lower high** → upside rally is losing internal fuel.
- **Hidden Bullish / Bearish Divergence:** Price holds a **higher low** during a healthy uptrend dip while `RSI14` pulls back lower (continuation clue).

---

## 6. Volatility, `ATR14` Stops, Bollinger Bands & Relative Strength

### `ATR14` ("a usual day") & Position Sizing (`R`-Multiple)
**Average True Range (`ATR14`)** measures how wide a stock typically swings per day (including overnight gaps). Knowing `ATR14` solves two major beginner mistakes:
1. **Avoiding noise stop-outs:** If a stock's `ATR14` is `2.7%` a day and you place your stop-loss only `1.0%` below entry (`0.37× ATR14`), ordinary intraday noise will knock you out repeatedly. Putting stops **`≥ 1.0–1.5× ATR14`** away *and* beneath real chart support gives trades breathing room.
2. **Keeping loss constant (`1R`) across volatile vs calm stocks:**
   - Decide max account risk per trade first (e.g. **`0.5%`** or **`1.0%`** of equity = `1R`).
   - Then compute share quantity from your stop distance:
     `Max shares = (Equity × Risk %) ÷ (Entry price − Stop price)` (rounded down to 100-share lots).
   - That way, buying a volatile `±3%` stock automatically uses **fewer shares** than buying a steady `±1%` stock — keeping every trade's dollar loss consistent!
   - Aiming for targets at least **`1.5×` to `2×+` your risk (`1.5R–2R+`)** means you can be wrong half the time and still come out ahead.

### Bollinger Bands (`MA20 ± 2 Standard Deviations`)
Bands widen when volatility expands and squeeze tightly during quiet bases (**volatility squeeze**, often preceding a sharp breakout move). Stretching outside a band signals a short-term statistical extreme.

### Relative Strength (`vs VN-Index`)
Comparing a stock directly against `VN-Index` over the exact same dates prevents an illusion:
- If `VN-Index` rallies `+4%` and your stock gains `+1%`, it is actually **underperforming** (`-3 pts`).
- Conversely, stocks holding flat or rising while `VN-Index` falls often become the strongest leaders when the broad market recovers.

---

## 7. Putting it together safely (Avoiding beginner pitfalls)

### Common traps beginners hit
1. **Indicator redundancy (double-counting):** Using `RSI14` + `Stochastic` + `MACD` all saying "oversold" isn't 3 independent confirmations — they are all momentum math from the same price bars! Combine **one factor per category** instead: **Trend** (`MA20/MA50`, `ADX`) + **Level** (Support/Resistance) + **Volume** (`>=1.5×` / `OBV` / `Foreign flow`) + **Volatility-adjusted stop** (`ATR14`).
2. **Ignoring market regime:** Buying breakout systems during broad market downtrends (`VN-Index < MA50`) or trend-following inside `ADX < 20` chop leads to repeated small losses.
3. **Treating scores as predictions:** `vnt`'s 7-factor Grade (`A+` to `D`) simply adds 7 transparent daily checks (`Price vs MA20`, `Price vs MA50`, `MA20 vs MA50`, `RSI14`, `MACD histogram`, `Volume`, and half-weight `Foreign flow`). Verify how grades performed on your own saved history using **Lab → Grade check** and practise reading charts blind in **Lab → Chart study** before risking real convictions.
