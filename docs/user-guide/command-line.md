# Command line

The primary way to use Soinon Stock Lab is the full-screen terminal interface (`vnt` or `vnt tui`). Alongside it, `vnt` provides fast CLI subcommands for **morning automation, scripting, health checks, database recovery, and MCP hosting**.

Every command accepts `--db PATH` to target a custom SQLite database and `--help` to inspect exact flags.

> **Database ownership rule:** While `vnt tui` is open, it holds the write lock on your SQLite database. Write commands (`watch add`, `paper buy`, `backup restore`, `sectors import`) stop safely with `"database is already open"` instead of risking corruption. **Read commands** (`quote`, `paper positions`, `journal ls`, `watch ls`, `alert ls`, `brief`, and `vnt mcp serve`) work concurrently beside an open TUI. Close the TUI first before running write or restore commands.

---

## 1. Everyday worked CLI workflows

### Morning check & offline briefing script (`5 seconds`)
Check database/feed health, pull fresh daily bars into SQLite, print quotes as JSON, and output a briefing without opening the full-screen TUI:

```sh
vnt doctor
vnt brief --refresh --account DEMO_01
vnt quote FPT,VCB,GEX --json
```

*(Append `--mark-reviewed` to `vnt brief` once you finish reviewing to save today's baseline for tomorrow.)*

### Safe SQLite backup & non-destructive restore
Verify integrity and restore into a **new** file cleanly so your original database stays untouched:

```sh
vnt backup create ~/vnt-backup-2026-11.db
vnt backup verify ~/vnt-backup-2026-11.db
# Close any running `vnt tui` window first:
vnt backup restore ~/vnt-backup-2026-11.db ~/vnt-restored.db
vnt --db ~/vnt-restored.db doctor
```

### Scanning & exporting backtest history
Run rules or custom scans straight from shell pipelines:

```sh
vnt backtest FPT ma-cross --from 2024-11-01 --to 2026-11-01
vnt backtest history
vnt scan --help
```

*(Note on `vnt score FPT`: CLI scoring computes the 7 technical factors purely from daily bars, setting foreign flow to `0`, so its letter grade can differ slightly from the live TUI when recent foreign flow is active.)*

---

## 2. Full command reference

### Checks and recovery

| Command | Does |
|---|---|
| `vnt version` | Print the installed version |
| `vnt doctor` | Check SQLite health and public market feeds (same checks as **Records → Health**) |
| `vnt backup create FILE` | Save a verified snapshot copy of your SQLite file |
| `vnt backup verify FILE` | Integrity-check a backup file without modifying anything |
| `vnt backup restore FILE NEW.db` | Restore into `NEW.db` cleanly (original files stay untouched) |
| `vnt legal` | Show paths to terms, notices, support, and security docs |
| `vnt --debug` | Enable structured JSON debug logging (`VNT_DEBUG=1`) |

### Market data

| Command | Does |
|---|---|
| `vnt quote FPT,VCB` | Latest quotes (`--json` or `--csv` for scripts) |
| `vnt history FPT --days 30` | Fetch/display daily bars from Entrade |
| `vnt news FPT` | News headlines matched to stock symbols |
| `vnt news rescore` | Recompute saved news relevance locally (no network) |
| `vnt watch add FPT` / `rm` / `ls` | Add, remove, or list watchlist symbols |
| `vnt sectors import` | Load bundled sector classifications (or `--file` custom CSV) |

### Research & MCP

| Command | Does |
|---|---|
| `vnt score FPT` | 7-factor score from saved daily bars (foreign flow = `0` on CLI) |
| `vnt scan` | Scan stock codes, files, or watchlist groups with filters and export |
| `vnt brief` | Print daily briefing (`--refresh`, `--account`, `--json`, `--mark-reviewed`) |
| `vnt brief --agent` | Show saved research brief (`--provider-consent` + typed confirmation for new model calls) |
| `vnt mcp serve` | Launch local STDIO MCP server for [Codex or Claude Code](mcp.md) |
| `vnt alert ls` | List alerts & trigger history (`ack`, `rearm`, `rm`, `export`) |

### Testing on past prices (`Lab`)

| Command | Does |
|---|---|
| `vnt backtest FPT ma-cross` | Run & save one rule (`ma-cross`, `bb-reversion`, `breakout`, `rsi-reversal`; `--from`, `--to`) |
| `vnt backtest history` | List saved backtest runs |
| `vnt replay …` | Manage daily replays (`step`, `action`, `run`, `report`, `list`, plus `replay practice`) |

### Paper trading & records

| Command | Does |
|---|---|
| `vnt paper account …` | Create, list (`ls`), inspect, or reset paper accounts |
| `vnt paper buy` / `sell` | Submit simulated day-limit orders (enforces the same Go checks & guards as the TUI) |
| `vnt paper cancel` | Cancel a waiting paper order |
| `vnt paper orders` / `positions` / `cash` | Inspect open orders, settled vs settling shares, and cash |
| `vnt paper trades` / `review` / `performance` | Inspect closed round-trips and portfolio performance |
| `vnt paper valuation` | Save a current equity snapshot |
| `vnt journal …` | Add and list journal notes |
| `vnt portfolio real …` | Manage read-only real holdings records |
| `vnt dividends …` | Read corporate-action notices |

---

## 3. Experimental daily forward portfolios (`vnt forward`)

In addition to **Auto paper**, `vnt` includes an experimental **`forward`** ledger workflow for comparing how three books behave side-by-side one real trading session at a time over saved daily-bar fills:
1. **The Model book** (paid AI decisions when configured)
2. **The `r4` Go-rule benchmark** (deterministic free rule baseline)
3. **Equal-weight Buy-and-Hold**

It runs from dedicated ledger files (often under `~/vnt-ledgers/`):
- `vnt forward init --ledger FILE` creates an isolated forward portfolio ledger.
- `vnt forward run --ledger FILE` commits finished sessions and records the next session's decisions.
- `vnt forward status`, `vnt forward report`, and `vnt forward dashboard` inspect comparisons and claims.
- `vnt forward schedule` prints an OS scheduler helper for morning runs.
- Pass **`vnt tui --experiment`** to unlock option **`6`** on **Agent Home** and view those daily forward books inside the terminal UI.

*(Results from `vnt forward` use simulated daily-bar fills for longitudinal research and never constitute investment advice.)*

---

## 4. Environment & startup flags

| Setting | Default | Does |
|---|---|---|
| `--db PATH` | OS application-data folder | Target a specific SQLite file |
| `--board` | off | Launch straight into **Market** board instead of **Today** |
| `--experiment` | off | Show experimental forward daily portfolios on **Agent Home** |
| `VNT_POLL_INTERVAL` | `1s` | Live quote polling interval during open sessions |

Model keys (`OPENAI_API_KEY`, `VNT_OPENAI_MODEL`) are documented in [Safety and your data](safety-and-data.md#model-features).
