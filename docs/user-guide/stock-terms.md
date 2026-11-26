# Stock terms

Plain-language meanings of the words the app uses. Where the app computes
something a particular way, this page says how.

## Market and exchanges

**HOSE, HNX, UPCoM.** Vietnam's three stock venues: the Ho Chi Minh City
exchange, the Hanoi exchange, and the Hanoi market for unlisted public
companies. The app follows all three.

**VN-Index, VN30, VN100.** Indices measured in points. VN-Index covers HOSE;
VN30 and VN100 are its 30 and 100 largest, most traded stocks. Find and the
backtest can search VN30 or VN100 instead of a watchlist.

**Stock code.** The three-letter code a stock trades under, such as `FPT`.

**Watchlist.** Your own list of codes. You can keep several **groups** and
switch between them on the board.

## Sessions and auctions

Times are Vietnam time (ICT). On a normal trading day on HOSE:

| Time | Session | Status line |
|---|---|---|
| before 09:00 | Pre-open | `○ PRE-OPEN` |
| 09:00–09:15 | Opening auction (ATO) | `ATO` |
| 09:15–11:30 | Continuous trading | `● CONTINUOUS` |
| 11:30–13:00 | Lunch break | `LUNCH` |
| 13:00–14:30 | Continuous trading | `● CONTINUOUS` |
| 14:30–14:45 | Closing auction (ATC) | `ATC` |
| after 14:45 | Closed for the day | `○ CLOSED` |

**Auction.** During ATO and ATC orders are collected and matched at one
price. The closing auction sets the day's close.

**Trading day.** Weekends and exchange holidays are not trading days. The
app keeps the exchange calendar; Records → Health shows which years it
covers and whether next year is still provisional.

## Prices

**Prices are in thousand dong.** `43.00` means 43,000 ₫ a share.

**Reference price.** Usually the previous session's close. Daily changes
are measured from it.

**Ceiling and floor.** The highest and lowest price allowed today: the
reference plus or minus **7% on HOSE, 10% on HNX and 15% on UPCoM**. New
listings and stocks returning from suspension can have wider bands. In the
Vietnam board colour scheme, ceiling is purple, floor cyan and reference
amber.

**Tick.** The smallest price step. The order ticket snaps prices to a
valid tick.

**Lot.** Shares trade in lots of 100. The order ticket shows the lot.

**Bid and ask.** The best price buyers offer (bid) and sellers ask (ask).
The **order book** lists the best few of each with their sizes.

**Last.** The most recent traded price.

**Volume.** Shares traded. `4.6M` is 4.6 million.

**Daily bar** (or candle). One session's open, high, low and close (OHLC)
and volume. Intraday bars cover 1, 5 or 15 minutes.

## Buying, selling and settlement

**Settlement.** Bought shares become yours to sell after settlement. The
app uses **13:00 two trading sessions after the buy** (T+2). Until then
the shares show as *settling* and cannot be sold.

**Can sell.** Settled shares less any already reserved by open sell orders.

**Limit order.** Buy at this price or lower, or sell at this price or
higher.

**Market order.** Fill at the best available price now.

**Stop order.** Wait until the price falls to the stop, then sell. A stop
can fill below its price when the market gaps.

**Stop-loss.** The price where your plan says to exit with a small loss.
The distance from entry to stop is the **price risk**.

**Target.** The price where your plan takes the gain.

**Bracket.** A stop and a target placed together; when one fills, the other
is cancelled.

**Good for.** How long an order waits: *today only*, or *until canceled*.

**Fee and tax.** Each paper account has a broker fee on every trade (for
example 0.15%) and a sell tax (0.1%). Results "after fees and tax" include
both.

**Position.** Shares you hold in one stock. **Cost** is the average price
you paid. **P&L** is profit or loss against that cost; **unrealized** means
not yet sold.

**Equity.** Cash plus the value of all positions.

**Weight.** One position's share of equity.

**Drawdown.** The fall from the highest equity so far.

## Reading charts

**Moving average (MA20, MA50).** The average close over the last 20 or 50
sessions. A close above both is read as an uptrend.

**RSI14.** Relative strength index over 14 sessions, from 0 to 100. Under 30
is called oversold, over 70 overbought.

**MACD histogram.** The gap between a fast and a slow trend line. Positive
means momentum is rising.

**Bollinger bands.** Lines two standard deviations above and below MA20.

**VWAP.** The volume-weighted average price for today's session.

**ATR14 and a usual day.** Average true range over 14 sessions: a day's
typical price range, including gaps from the prior close. The order ticket
compares your stop with it: a stop less than one usual day away can be hit
by ordinary movement.

**ADX14.** Trend strength. Above 25 is called a strong trend.

**Support and resistance.** Price levels where earlier falls stopped
(support) or rises stopped (resistance). The app finds them from saved
daily bars.

**Pivots and Fibonacci levels.** Reference lines computed from recent highs
and lows. Display only.

**Candlestick signals.** One- to three-bar shapes such as a doji, hammer
or engulfing bar, found on the latest bars and shown with their context.

**Foreign flow.** Shares foreign investors bought minus sold. **Foreign
room** is how many more shares foreigners may still own under the
ownership limit.

## The grade

The app scores each stock from saved daily bars on seven factors: price
against MA20, price against MA50, MA20 against MA50, RSI14, the MACD
histogram, volume and foreign flow. Each factor adds +1 (for), −1 (against)
or 0 (neutral). The sum maps to a letter:

| Score | Grade |
|---|---|
| 5 or more | A+ |
| 4 | A |
| 3 | B+ |
| 2 | B |
| 1 | C+ |
| 0 | C |
| −1 | C− |
| −2 | D+ |
| below −2 | D |

The grade describes the chart today. It is not a forecast. Lab → Grade
check shows how saved history behaved after each grade.

## Results and testing

**Backtest.** Running a fixed rule over past daily bars with simulated
fills, to see how it would have done.

**Against holding.** The backtest result compared with buying on the first
day and holding to the last.

**R.** A trade's net result divided by the risk planned at entry. `2R` means
twice what you planned to risk.

**Paper.** Simulated trading with pretend money, using real prices and the
exchange rules.
