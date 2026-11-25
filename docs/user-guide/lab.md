# 6 · Lab

**For:** learning on past prices. Test a rule, trade a past period yourself
one day at a time, study a chart with the future hidden, or answer before
the agent's saved decisions.

**Get there:** `F3` then `6`, or `:lab`.

Everything in Lab uses saved past prices with simulated fills. A good past
result does not predict the next one.

## Home

```text
WHAT DO YOU WANT TO TEST?
  1  Would a rule have worked?        Backtest: a rule on past prices, in seconds          free
  2  Could I have traded it myself?   Replay: one day at a time, future hidden             free
  3  What would the agent have done?  Agent practice: on past prices, in limits  free with the Go rule
  4  Can I read it like the agent?    Guided practice: answer first, then compare          free
  g  Grade check · does the grade separate later returns?
RECENT WORK
  KIND          STOCK  WHAT                 PERIOD          RESULT  AGAINST HOLDING  DATE
› Backtest #1   FPT    Bollinger reversion  Nov 2024–Oct    N/A     older summary !  13 Nov
```

**Recent work** lists your backtests, replays and practice sessions.
**What your tests say so far** counts how many backtests beat holding.
A backtest needs **30 trades** before it is compared; fewer are listed but
not judged. *Older summary* means the rule's definition changed since; run
it again before comparing.

| Key | Does |
|---|---|
| `1`–`4` | Start one of the four |
| `g` | Grade check |
| `Enter` | Open the selected work |
| `p` | Replay that period yourself |
| `v` | Compare |
| `x` | Export |
| `C` / `S` | New chart study / saved studies |

## Backtest

A backtest runs a fixed rule over a stock's saved daily bars. It places no
orders and needs no paper account. Fills happen at the next day's open with
fees and tax, and respect T+2 settlement.

**Get there:** `1` on Lab home, `:backtest`, or `Enter` on Stock →
Backtest. `:backtest FPT ma-cross from=2025-01-01` runs one at once.

The four rules:

| Rule | Buys | Sells |
|---|---|---|
| Moving-average cross 20/50 | MA20 crosses above MA50 | It crosses back |
| Breakout of the 20-day high | Close above the prior 20-day high on volume above 1.5× the prior 20-day average | Close below the prior 20-day low, or 5% or more below entry |
| RSI under 30, exit over 70 | RSI14 closes below 30 | RSI14 closes above 70 |
| Bollinger reversion | Close below the lower 20-day Bollinger band | Close above the upper band |

The workbench has **Run**, **Saved runs** and **Compare** tabs. A run shows
the rule's equity curve beside holding, return, worst drop, time in the
market and trades.

**Compare** runs all four rules on the same stock, period and costs:

```text
    RULE                         RETURN   VS HOLDING  WORST DROP  IN MARKET  TRADES  ENOUGH?
›   Moving-average cross 20/50   -9.2%    -2.2 pts    -12.1%      45.8%      4       no
    Holding FPT                  -7.0%    —           -9.1%       100%       —
```

| Column | Meaning |
|---|---|
| Return | Gain or loss over the period after fees and tax |
| Vs holding | Return minus holding the stock, in percentage points |
| Worst drop | The largest fall in equity from a peak |
| In market | Share of days holding shares |
| Enough? | Whether there are 30 trades or more |

| Key | Does |
|---|---|
| `↑` `↓`, `Enter` | Select a rule; open its run |
| `w` | Run the rules across your whole watchlist, with progress; `Ctrl+X` cancels |
| `p` | Replay the same period yourself |
| `x` | Export |

## Replay

Trade a past period one day at a time with the future hidden.

**Get there:** `2` on Lab home, `:replay new`, or `p` on a backtest.
`:replay` lists saved sessions.

### Setup

| Choice | Default | Other options |
|---|---|---|
| Stock | Surprise me: from your watchlist, name hidden until the end | Type a code |
| Period | Surprise me: 45 trading days from the last 3 years, dates hidden | Pick dates |
| Who trades | You decide each day | Watch a rule trade |

Each replay gets its own account with 100,000,000 ₫ of practice cash, the
same fees, tax and T+2 as Paper. `m` changes the rule to compare with, the
cash, the length and the seed. Hiding the stock helps you avoid remembering
what happened; prices can still give it away.

### A session

```text
REPLAY #1 · FPT · by hand · informed practice · paper        day 14 of 45 · Mon 16 Mar
  …chart up to today's open; the rest is hidden…
TODAY      opened at 43.10 · the high, low and close stay hidden until you close the day
YOUR MOVE  B buy    X sell    → do nothing and close the day    p add a stop first
YOU        200 FPT bought at 41.85 · +250,000 ₫ at today's open · no stop
SO FAR     you +0.8% · the rule's and holding's results come at the end
```

*Informed practice* means you chose the stock or dates, so you may know
what happens next.

| Key | Does |
|---|---|
| `→` | Close the day and reveal the next open |
| `B` / `X` | Buy / sell ticket at today's open |
| `p` | Save a stop for the whole position |
| `f` | Fast-forward to the end (asks once) |
| `Space` | Pause or resume |
| `q` | End now and see the result (asks once) |
| `R` | Restart as a new session; this one is kept |
| `x` | Export the receipts as text or JSON |
| `Esc` | Leave; the session stays as it is |

### The result

**How it went** puts you, the rule and holding side by side with each
one's return and worst drop. **Your decisions beside the rule** lists each
day you acted, what the rule did, and how the stock moved over the next
five days. From here: `R` runs the same days again, `n` the same days on
another stock, `G` guided practice on this period.

### Replay library

`:replay` lists saved sessions with their state and strategy. `Enter`
reads the saved report without changing it; `o` continues a session;
`f`, `m` and `t` filter by symbol, mode and state; `v` compares.

## Chart study

Study a past chart bar by bar and record what you think will happen.

**Get there:** `C` on the board or the Stock chart, or `C` on Lab home.

| Field | Meaning |
|---|---|
| Stock | The code to study |
| Start | A random past date, or `YYYY-MM-DD`; needs 60 bars before and 20 after |
| Bars to study | How many bars stay hidden after the start (default 20) |
| Hide dates | Show the stock as *Stock A* and days as numbers until the review |
| Overlay | None, MA20, MA20 + MA50, or Bollinger |
| Lower pane | None, RSI14, MACD, stochastic, relative strength, or foreign flow |
| Limit days | Mark days that closed at the ceiling `▴` or floor `▾` |

During the study, record a call at any bar; `n` reveals the next bar. The
review compares your calls with what happened. `Ctrl+L` opens the history
library: which stocks have enough saved bars, and an explicit fetch for more.
A study uses saved daily bars only and needs no account.

## Guided practice

Answer at each of the agent's saved decision points before you see its
answer.

```text
GUIDED PRACTICE · FPT  close 49 of 60 · Tue 25 Mar 2025
WHAT THE CLOSE SHOWS                     YOUR ANSWER
  FACT              VALUE   READS        › ‹ Buy 100 ›   Hold · Buy 100 · Buy 300
  RSI14             100.00  against        Which fact matters most to you?
  Volume vs average 1.00×   against        Why, in your own words  optional
```

Pick an action, the fact that matters most, and optionally why. `Enter`
saves your answer and shows the agent's, with what happened over the next 5
and 20 sessions. **Your answer cannot be changed after the reveal.**
`Ctrl+P` shows the rule the agent was given. No model is called.

## Agent practice

Watch the agent trade a past period inside limits you set. With the Go rule
it is free; with the model it is paid and shows the cost first. See
[Agent](agent.md).

## Grade check

Does a higher grade separate later returns in your own saved history?

```text
GROUP      SESSIONS 5/20   NEXT 5 vs VN-INDEX         NEXT 20 vs VN-INDEX
                           mean    median  above      mean    median  above
A (A+ A)   1,200/1,144     +0.21%  +0.05%  51.0%      +0.62%  +0.20%  53.0%
D (D+ D)   1,900/1,780     -0.12%  -0.10%  48.0%      -0.40%  -0.22%  47.0%
A − D   next 20  +1.02%  90% interval  +0.21% … +1.85%  above zero
```

| Term | Meaning |
|---|---|
| Sessions 5/20 | Graded sessions with a complete 5- and 20-session window after them |
| Next 5 / next 20 vs VN-Index | The stock's return over the next 5 or 20 sessions minus VN-Index's |
| Above | Share of sessions that beat VN-Index |
| A − D | The gap between the top and bottom groups, with a 90% interval. *Spans zero* means the gap could be chance |

It needs at least 100 graded sessions. It covers only stocks you have
saved, uses close-to-close returns, and ignores costs, tax and price limits.
`r` runs it again; `x` exports.
