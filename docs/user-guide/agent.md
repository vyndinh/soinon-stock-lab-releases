# 7 · Agent

**For:** letting an agent trade a paper account inside limits you set,
deciding together on its proposals, and learning from what it did.

**Get there:** `F3` then `7`, `A` on Today, or `:agent`.

The agent works on **paper accounts only**. It proposes; fixed limits in
the app decide what is allowed, and every order goes through the same paper
engine checks as yours. Two kinds of agent are available:

- **Go rule**: a fixed rule built into the app. Free; no model is called.
  It is a demonstration rule, not an evaluated strategy.
- **Model**: a language model you set up. Each request is paid; the cost is
  shown before you confirm. See
  [Safety and your data](safety-and-data.md#model-features).

## Agent home

```text
AGENT · PAPER                              [Home]  Decisions  Auto paper  Track record  Model log
START
› 1  Watch an agent trade    Auto paper decides once a day inside your limits. Go rule free, model paid.
  2  Decide together         It proposes an order; you approve or decline each one.
  3  Ask about a stock       One explanation with its sources. paid per request.
  4  Review my closed trade  The coach reads one of your own trades. paid per request.
  5  Practise on past prices Agent practice in Lab, using past data.
  6  Run a daily portfolio   one session per run · bars free, model paid
Model spend, 30 days  $0.0000 · 0 requests · h Model log
```

| Key | Does |
|---|---|
| `1`–`6`, `Enter` | Start or open one |
| `Tab` | Next section |
| `l` | Open a lesson |
| `p` | Agent portfolios (experiment only) |
| `h` | Model log |

Row 6 and `p` appear only when the app starts with `vnt tui --experiment`.

## Auto paper

The agent decides once each trading day at **09:30** and places paper
orders inside your limits.

**Setup** asks for:

| Field | Meaning |
|---|---|
| Stocks | The current stock or a watchlist, up to 5. The list freezes at start |
| Who decides | Go rule (free) or the model (paid) |
| How long | 5, 10, 20, 40 or 60 trading days |
| Your limits (`L`) | Largest buy, largest holding per stock and per account, number of stocks, daily loss |

The setup also shows how many checkpoints, model calls and actions the
session can use at most. While a session runs, manual buys and approvals
are off on that account.

**Keep the app open at 09:30.** Closing it pauses the session until you
resume. Stops are armed when bought shares settle.

**A running session** shows today's decision with its reasons *for* (`+`)
and *against* (`×`), why it did not wait, what would prove it wrong, the
position, results so far and the last decisions.

| Key | Does |
|---|---|
| `P` | Pause: no more decisions |
| `E` | End: keeps the agent's exits |
| `T` | Take over: also cancels the agent's exits |
| `e` | Evidence behind a decision |
| `L` | All limits |

## Decisions

Proposals that need you, with the reason and what happens if you approve.

```text
NEEDS YOU · 1                                                    expires Thu 22 Oct 10:00
› SELL 500 FIXB · limit 29.95 · today only · account AGENT_ACC · proposed by the Go rule
WHY IT PROPOSES THIS                         IF YOU APPROVE
 + The score without flow is -4 …  · for       Order     SELL 500 FIXB · limit 29.95
 × A single day's factor sum can reverse …     Proceeds  14,937,562 ₫ after costs
  ▸ Approve and review the order   A         Decline   N         Later   Esc
```

`A` opens the paper order's Review step; the checks run again and nothing is
placed until you confirm. `N` declines. A proposal that is not answered
expires.

To let the agent propose on an account, type `:agent enroll ACCOUNT`.
`:agent review ACCOUNT SYMBOL` opens the approval workspace for one stock:
`g` decides with the Go rule, `m` with the model (paid), `A` shows the
exact action. Use a paper account set aside for the agent: turning
proposals on keeps its agent records for the life of the account.

## Track record

Each agent session on the account with its result. `Enter` lists its
decisions; `l` opens lessons; `x` exports; `r` refreshes. Results are paper
fills and past results, not a forecast.

## Lessons

`l` opens one decision as a lesson: **Before** (what it chose and why,
what would prove it wrong, its limits) beside **After** (how it ended and
the stock against VN-Index over the next 5 and 20 sessions). **Did the
reasons hold** compares each reason's number then and now. It compares
saved numbers; it does not show the reasons caused the result.

## Model log

Every saved model request: explanations, scan explanations, trade coach,
decisions, Find and research briefs. `Tab` filters by feature, `/`
searches, `c` shows the spend over the last 30 days.

## Agent portfolios (experiment)

Agent portfolios are paper books the agent trades day by day as a research
experiment. They are only available when the app starts with
`vnt tui --experiment`. Each run is reviewed and then confirmed; a paid run
also needs the typed word `send`.

On Agent → Portfolios, `a` adds an existing portfolio file made by
`vnt forward init` (read-only unless you add `,write`). `Enter` opens its
dashboard, `v` compares portfolios, `x` exports. `n` creates one and `m`
manages runs. See [Command line](command-line.md#agent-portfolios-experiment).

## Ask about a stock (model, paid)

On a stock's score (`e`), `M` asks the model to explain it from the same
evidence. `Esc` cancels before it is sent. `:agent history` lists saved
answers.
