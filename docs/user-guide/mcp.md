# Soinon in Codex and Claude Code (MCP)

Connect a local **Codex** or **Claude Code** chat directly to Soinon Stock Lab (`vnt`) through the **Model Context Protocol (MCP)**. You can ask natural-language questions across your watchlist, troubleshoot missing quotes, check 7-factor grades against your saved trading notes, run exact Vietnam-rule paper order previews, and even send a time-limited draft order to `vnt`'s TUI for final human confirmation — all while your TUI remains open beside the chat.

Your chat host supplies the AI model through its own sign-in and usage plan (requiring **no OpenAI API key inside `vnt`**). MCP opens your SQLite database **read-only**, **never exposes credentials, real holdings, SQL, or file paths**, and **never places an order from chat** without you pressing **Place** inside `vnt`.

---

## 1. Why use Soinon with Codex or Claude Code? (Use cases & benefits)

| Real situation | How chat + MCP helps | What stays strictly protected |
|---|---|---|
| **Morning market triage** | Summarize your whole watchlist + paper book in one conversational prompt, highlighting missing sessions, price jumps, and Grade shifts. | Reads saved SQLite + optional bounded public fetches; **real broker holdings are never exposed**. |
| **Thesis reality-check** | Pull today's live/saved bars + 7-factor grade right beside your *own past decision note* (quoted verbatim) so hindsight never rewrites why you bought. | Past notes return as **`quoted_*` untrusted data**, not instructions or rewritten history. |
| **Risk-checked sizing math** | Test buy/sell share counts against Vietnam `100`-share lots, `floor_vnd` / `ceiling_vnd` daily bands, fees/sell tax, and `T+2` sellable shares before submitting anything. | `preview_paper_order` creates **no order, reservation, or draft**; identical Go rules as TUI Review. |
| **Chat-assisted order workflow** | Queue a day-limit paper order (with stop/target bracket protection) straight into `vnt`'s **`Agent → Needs you`** inbox while keeping your hands free to verify the chart visually in the TUI. | Off by default per account; requires TUI `o` opt-in, expires in **5 minutes**, max **3 waiting**, and **cannot submit without manual TUI `Place`**. |

---

## 2. What the chat AI can actually see and do (The 7 MCP tools)

Behind the scenes, Codex and Claude Code talk to `vnt mcp serve` through seven tightly scoped tools:

1. **`get_briefing`:** Captures one frozen briefing (`report_id`) of your watchlist and permitted `--account` paper holdings from saved local data.
2. **`get_stock_review`:** Inspects one stock inside that `report_id` — expected session vs latest saved session, `price_status` (`current`, `behind_expected_session`, or `unavailable`), 60-session coverage, and gap/limitation reasons.
3. **`get_stock`:** Reads the latest quote (plus timestamp), the last **30 daily bars**, the Go-computed grade & 7-factor breakdown, and coverage. If saved bars are stale/missing for a valid listed stock, performs a bounded single fetch from public feeds (labelled with fetch time, never altering SQLite).
4. **`get_saved_decision`:** Looks up a specific decision note (`decision_id`) or recent list for a stock (`symbol`), returning your recorded timestamp, saved close, evidence references, and **verbatim quoted note**.
5. **`preview_paper_order`:** Runs the **exact same dry-run check** as TUI Paper Review (`buy`/`sell`, quantity, day limit in `VND`, optional `stop_loss_vnd`, `target_vnd`, `place_protection`), returning `floor_vnd`, `ceiling_vnd`, fees/tax, remaining cash/sellable shares, or exact refusal reasons.
6. **`request_paper_order`:** Re-runs the preview and, only if every check passes, writes a signed request into the owner-only `.mcp-inbox` folder with an `idempotency_key` (`pending_review`, valid **5 minutes**, max **3 waiting per account**).
7. **`get_request_status`:** Checks whether a queued `request_id` is `pending_review`, `declined`, `expired`, `refused`, or `submitted` (along with the Paper Order ID and waiting/partial/filled status).

---

## 3. Real-world stock trading situations & worked MCP examples

### Situation 1 · Morning pre-market check & stale-price triage (`08:45 ICT`)
**Context:** Before HOSE opens at `09:00 ICT`, you want a 30-second health summary of your watchlist and active paper book (`MAIN`), including spotting any stock missing yesterday's close.

- **Prompt to Codex / Claude Code:**
  > *"Use `soinon` to brief me on my watchlist and paper account `MAIN`. List any holdings near a stop or big mover, and if any stock is missing the latest close, run `get_stock_review` to tell me its exact `price_status`, latest retained session, and limitation reason."*
- **What happens:**
  1. Chat calls `get_briefing(account: "MAIN")`, receiving a frozen `report_id` and compact change list.
  2. For any stock marked behind expected session (say `VNM`), chat calls `get_stock_review(report_id, symbol: "VNM")` and reports whether yesterday's close wasn't fetched yet (`behind_expected_session`), plus exact `coverage` (`saved_closes` out of `60`).
  3. You see immediately in plain English whether `VNM` just needs a quick refresh (`f` inside TUI `:brief`) before the bell rings.

---

### Situation 2 · Checking a live pullback against your own past thesis (`10:30 ICT`)
**Context:** `FPT` dips `-2.4%` in the morning session. Instead of panicking or chasing blindly, you want to check today's price/grade context alongside the exact reason you noted two weeks earlier.

- **Prompt to Codex / Claude Code:**
  > *"Look up `FPT` in `soinon`. Show the quote observation time, current price, last 5 daily bars vs volume, and the 7-factor grade breakdown. Also pull my recent saved decision notes for `FPT` in `MAIN` so I can compare today's market action against what I originally wrote."*
- **What happens:**
  1. Chat calls `get_stock(symbol: "FPT")` for the dated quote, 30 daily bars, and factor contributions (whether `MA20`, `MA50`, `RSI14`, `MACD`, `Volume`, and `Foreign flow` help or hurt).
  2. Chat calls `get_saved_decision(account: "MAIN", symbol: "FPT")` and quotes your old decision timestamp, close at that time, and verbatim note (for example: *"Entry above MA20; invalid if close drops below 53.90 (MA50)"*).
  3. You get an objective side-by-side comparison free of hindsight bias — and since `soinon` passes units cleanly, remember **`100,000 VND` in MCP equals `100.00` on `vnt`'s `kVND` screen**.

---

### Situation 3 · Testing position size, price bands & stop math before placing (`13:45 ICT`)
**Context:** `VCB` looks constructive near `62,000 VND` (`62.00` kVND). You want to buy `200` shares with a `59,500 VND` stop and `67,000 VND` target using bracket protection — and check whether trying `500` shares would trigger your account concentration guard.

- **Prompt to Codex / Claude Code:**
  > *"In paper account `MAIN`, preview buying `200 VCB` at a day limit of `62,000 VND` with `stop_loss_vnd: 59,500`, `target_vnd: 67,000`, and `place_protection: true`. Then also preview `500 VCB` at the same prices so I can compare fees, daily price bands, and whether any risk limit blocks the larger size. Do not queue an order request yet."*
- **What happens:**
  1. Chat calls `preview_paper_order` twice (`quantity: 200`, then `quantity: 500`).
  2. Notice MCP requires **exact `VND` per share** (`62000`, not `62.00`).
  3. For `200 VCB`, Soinon returns `floor_vnd`, `ceiling_vnd`, estimated broker commission, total cash reserved, and confirms bracket stop/target checks pass. For `500 VCB`, if your single-stock weight cap or cash balance would be exceeded, Soinon returns the exact TUI refusal message — costing you `0 ₫` and leaving zero unwanted drafts.

---

### Situation 4 · Avoiding a `T+2` settlement lock or limit-band mistake on a rally sell (`10:15 ICT`)
**Context:** You bought `300 GEX` two sessions ago at `25,000 VND`. Today `GEX` spikes `+5.5%` in the morning, and you ask chat to preview selling everything right now.

- **Prompt to Codex / Claude Code:**
  > *"Preview selling `300 GEX` in `MAIN` at `28,000 VND` (`day` limit) and tell me right away if `T+2` settlement or today's price band stops the order."*
- **What happens:**
  1. `preview_paper_order(account: "MAIN", symbol: "GEX", side: "sell", quantity: 300, limit_price_vnd: 28000)` inspects real settled share counts in SQLite (`T+2 13:00` settlement clock) and today's `ceiling_vnd` / `floor_vnd`.
  2. If shares bought on `T` settle today at **`13:00 ICT`**, Soinon immediately catches why selling `300` at `10:15 ICT` is blocked right now and prints the exact sellable share count (`0`) vs settling shares (`300`), preventing guesswork until `13:00 ICT`.

---

### Situation 5 · End-to-end chat-to-TUI paper trade execution (`request_paper_order` → `Needs you`)
**Context:** Your `200 VCB` preview passed cleanly, and you want the AI chat to send the draft to your open `vnt` window so you can glance at the candlestick chart and confirm with one action.

1. **One-time setup per account in TUI:** Open **Agent**, choose `MAIN`, press `o`, then `y` to allow chat order requests (stays off after an account reset).
2. **Ask the chat to queue the request:**
   > *"Ask `soinon` to queue a paper buy request for `200 VCB` in `MAIN` at limit `62,000 VND`, stop `59,500 VND`, target `67,000 VND`, with bracket protection on."*
   - Chat calls `request_paper_order` with a unique `idempotency_key` and returns `request_id` (`mcp_...`), `status: "pending_review"`, and the **5-minute expiration time**. *(If your chat host asks you to confirm running the tool, approving the tool call only queues `.mcp-inbox`; no order is placed yet.)*
3. **Review and place inside `vnt` TUI:**
   - Your open screen stays undisturbed, while **`Needs you`** on **Agent Home** shows the waiting request.
   - Select it → `Enter` opens the exact **Paper order Review** ticket → verify fees/stop/chart → press **`Tab`** to **Place** → **`Enter`** (or **`N`** to decline).
   - Soinon re-checks session state, cash, price bands, and limits at the moment you press **Place**.
4. **Follow up from chat:**
   > *"Check the status of `VCB` request `mcp_...` in `MAIN`."*
   - Chat calls `get_request_status`, reporting `pending_review`, `declined`, `expired`, `refused`, or `submitted` — plus the created paper order ID and live fill state (`waiting`, `partly filled`, or `filled`).

---

## 4. Connect Codex or Claude Code

1. **Start `vnt` once first (`vnt tui`):** After any upgrade, launch the TUI once before reconnecting MCP so the SQLite schema is migrated (MCP opens the database read-only and never runs migrations).
2. **Find your absolute `vnt` path:** Run `command -v vnt` on macOS/Linux (or full `C:\...\vnt.exe` path on Windows).
3. **Register the local STDIO server:**

**Codex**

```sh
codex mcp add soinon -- "/absolute/path/to/vnt" mcp serve
```

In the Codex desktop app: **Settings → MCP servers → Add server → STDIO** (`name`: `soinon`, `command`: `/absolute/path/to/vnt`, `args`: `mcp`, `serve`).

**Claude Code**

```sh
claude mcp add --transport stdio --scope local soinon -- "/absolute/path/to/vnt" mcp serve
```

Run from your project folder (`--scope local` keeps the config private to you and that project).

- **Using a custom database (`--db`)?** Place `--db "/absolute/path/to/data.db"` **after** the executable path and **before** `mcp serve`.
- [Codex MCP setup](https://learn.chatgpt.com/docs/extend/mcp?surface=app) · [Claude Code MCP setup](https://code.claude.com/docs/en/mcp)

### Allowing a paper account (`--account`)

Without `--account`, MCP reads watchlists and stock data only. To allow briefings, saved decisions, previews, and order requests for a paper account, append `--account MAIN` after `mcp serve` (check IDs with `vnt paper account ls`; repeat `--account` for multiple ordinary accounts, then restart Codex / Claude Code).

> **Data disclosure:** Permitted quotes, paper holdings, decision notes, and news summaries (`quoted_*`) enter the chat conversation and its provider. Keep `--account` restricted strictly to accounts you want visible in that chat.

---

## 5. Rules, rate limits, privacy & troubleshooting

- **Private inbox mechanics:** Queued requests sit in `.mcp-inbox` beside your SQLite file with owner-only folder permissions. Pending requests expire in **5 minutes** (max **3 waiting per account**) and are **not** carried inside SQLite backups (`Records → Backup`), though finalized/recorded outcomes are.
- **Session budgets:** Up to **200 tool calls** and **50 paper order previews** per MCP server connection, and **6 public provider fetches per minute** across `get_stock` and live quote verification for `preview_paper_order`. Restart the MCP host connection if a session cap is reached.
- **Troubleshooting quick fixes:**
  - `soinon` missing from `/mcp` → check the absolute binary path and restart your chat host.
  - Older or missing database error → open `vnt tui` against that same database path once, then reconnect.
  - `requests_off` → open **Agent** in TUI, select the paper account, press `o` → `y`, and confirm `--account ID` is configured.
  - `queue_full` → confirm, decline, or let one of the 3 waiting requests expire (5 minutes).
  - `idempotency_conflict` → tell the AI to use a fresh `idempotency_key` whenever order price, shares, or stop terms change.
