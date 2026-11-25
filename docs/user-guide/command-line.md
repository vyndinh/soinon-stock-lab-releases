# Command line

The app is used mainly in the full-screen terminal (`vnt`). The `vnt`
commands below add scripting, checks and recovery. Every command takes
`--db PATH` to use another data file, and `--help` for its options.

While the full-screen app is open it owns the data file. Commands that
change data then stop with "database is already open"; reading commands
such as `paper positions`, `journal ls`, `watch ls`, `alert ls` and
`brief` still work. Close the app before a restore.

## Checks and recovery

| Command | Does |
|---|---|
| `vnt version` | Print the version |
| `vnt doctor` | Check the data file and the four public feeds; the same checks as Records → Health |
| `vnt backup create FILE` | Save a checked copy of the data file to a new file |
| `vnt backup verify FILE` | Check a copy; changes nothing |
| `vnt backup restore FILE NEW.db` | Restore a copy to a new file; the original is unchanged |
| `vnt legal` | Where the terms, notices, support and security documents are |
| `vnt --debug` | Write a local debug log (also `VNT_DEBUG=1`) |

## Market data

| Command | Does |
|---|---|
| `vnt quote FPT,VCB` | Latest quotes; `--json` or `--csv` for scripts |
| `vnt history FPT --days 30` | Daily bars from Entrade |
| `vnt news FPT` | Headlines matched to codes |
| `vnt news rescore` | Recompute saved news relevance; fetches nothing |
| `vnt watch add FPT` / `rm` / `ls` | Edit the watchlist |
| `vnt sectors import` | Load the bundled sector tags, or `--file` your own CSV |

## Research

| Command | Does |
|---|---|
| `vnt score FPT` | The seven grade factors from daily bars. Foreign flow counts as zero here, so the grade can differ from the app |
| `vnt scan` | Scan codes, a code file or a saved group for daily signals, with filters and export |
| `vnt brief` | The daily briefing from saved data. `--refresh` fetches daily prices first; `--account` includes a paper account; `--json`; `--mark-reviewed` saves the next baseline |
| `vnt brief --agent` | A saved research brief; a new one needs `--provider-consent` and typed confirmation |
| `vnt mcp serve` | Connect [Codex or Claude Code](mcp.md) to stock research and paper-order previews |
| `vnt alert ls` | Alert rules and their fired history; `ack`, `rearm`, `rm`, `export` |

## Testing on past prices

| Command | Does |
|---|---|
| `vnt backtest FPT ma-cross` | Run one rule and save the run; `--from` and `--to` set the period. Rules: `ma-cross`, `bb-reversion`, `breakout`, `rsi-reversal` |
| `vnt backtest history` | Saved runs |
| `vnt replay …` | A day-by-day replay with its own paper account: `step`, `action`, `run`, `report`, `list`; `replay practice` records your answer before a saved agent decision is revealed |

## Paper trading

| Command | Does |
|---|---|
| `vnt paper account …` | Create and manage paper accounts |
| `vnt paper buy` / `sell` | Submit an order |
| `vnt paper cancel` | Cancel a waiting order |
| `vnt paper orders` / `positions` / `cash` | Inspect an account |
| `vnt paper trades` / `review` / `performance` | Review closed trades and equity |
| `vnt paper valuation` | Save a valuation now |
| `vnt journal …` | Add and list notes |
| `vnt portfolio real …` | Real holdings records |
| `vnt dividends …` | Read corporate-action notices for review in the app |

Orders submitted here follow the same checks as the app.

## Agent portfolios (experiment)

`vnt forward` runs the daily agent portfolio experiment. `forward init`
creates a portfolio file; `forward status` and `forward report` show it;
`forward run` commits the finished sessions and saves the next decisions;
`forward schedule` prints a scheduler entry for each trading morning. Model
runs are paid. Open portfolios in the app with `vnt tui --experiment`.

## Settings

| Setting | Default | Does |
|---|---|---|
| `--db PATH` | the system application-data folder | Which data file to use |
| `--board` | off | Open on the board instead of Today |
| `VNT_POLL_INTERVAL` | `1s` | How often live quotes are polled |

Model settings are in [Safety and your data](safety-and-data.md#model-features).
