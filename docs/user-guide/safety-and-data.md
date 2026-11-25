# Safety and your data

## Paper only

- Every order in the app is simulated. Nothing is sent to a broker, and the
  app holds no broker login.
- Paper fills use real quotes and the exchange rules: lots, ticks, price
  bands, sessions, T+2 settlement, fees and tax. They are still
  simulations. A real order can face a queue or fill at a different price,
  and a stop can fill below its price when the market gaps.
- Paper orders, stops and alerts are checked **only while the app is
  running**. Price moves while it is closed are not replayed.
- The app gives no investment advice. Grades, signals, backtests and agent
  decisions describe data; they are not forecasts or recommendations.

## Limits that cannot be skipped

Each paper account has limits checked by the app's own code on every order,
yours and the agent's alike: the daily loss limit, the number of open
positions, and the guards you turn on (a stop on every buy, a cap per
stock, a pause on drawdown). Agent sessions add their own limits on buy
size, holdings, stock count, daily loss and the number of actions. A model
cannot change or bypass them.

## Where your data lives

| Stays on this computer | Comes from the internet | Goes out only if you agree |
|---|---|---|
| Watchlists, paper accounts, orders, journal and notes, real holdings, decisions, replays, backtests | Prices (VPS), daily bars (Entrade), trades (KBS), news (CafeF RSS), corporate actions; no account or key | A model request, with your consent or inside a session you authorised |

All of it is in one SQLite file in your application-data folder, or the file
you name with `--db`. Records → Backup saves a checked copy.

Data from public feeds can be late, missing or wrong. Pages say how old
their data is and name gaps instead of filling them in.

## Model features

Market data, charts, Find ideas and Pick signals, backtests, Replay,
guided practice, paper trading and the Go-rule agent need **no key and
cost nothing**. These optional features call a language model and are
**paid per request**:

| Feature | Where |
|---|---|
| Explain a stock's score | `M` on a stock's score or Technicals |
| Describe a screen in words | Find → Describe, `:find` |
| Research brief | `a` in the daily briefing, `:brief agent` |
| Trade coach | `M` on a closed trade under Paper → Performance or Review |
| Model decisions | Agent: Auto paper or approvals with the model; agent practice |

Before a request, the app shows what will be sent and its estimated cost,
and waits for you to confirm. Some requests need the typed word `send`.
News and notes included in a request are sent as quoted data. Agent → Model
log lists every request with its cost.

To turn model features on, set `OPENAI_API_KEY` in your shell or in a `.env`
file in the folder you start `vnt` from. Never put the key in a command argument
or in a file you share. Without a key the model features say they are
unavailable and everything else works.

`VNT_OPENAI_MODEL` chooses the model. Find → Describe and model decisions
in the approval workspace run only with the model they were tested with.
With any other model selected they refuse and say so; they never switch
models on their own.

The [local MCP connection](mcp.md) uses the chat host's model and usage
plan. Requested quotes, paper holdings, notes and decisions can enter the
host's conversation and reach its model provider.

## Reporting a problem

Records → About links the issues page and saves a report (`x`) with the
version, terminal size and Health results, and no account data. Remove
anything private before you post.
