# Soinon in Codex and Claude Code

Connect a local Codex or Claude Code chat to Soinon through the Model Context
Protocol (MCP). Ask about your watchlist, a stock's grade, a saved decision
or a paper-order estimate. Soinon reads the same data file as the TUI and
can run beside it.

Your chat host supplies the model through its own sign-in and usage plan.
The connection needs no OpenAI key in Soinon. A chat can ask for a paper
order, but only you place it, in Soinon's paper order screen.

## Connect

1. Start Soinon once with `vnt tui` so the data file is ready. After an
   upgrade, do this before reconnecting the chat host; MCP opens the data
   file read-only and cannot migrate it.
2. Replace `/absolute/path/to/vnt` with the full path to your executable.
   On macOS or Linux, `command -v vnt` shows the path if the command is installed.
3. Run the command for your local chat host.

**Codex**

```sh
codex mcp add soinon -- "/absolute/path/to/vnt" mcp serve
```

In the Codex desktop app, the equivalent is **Settings → MCP servers →
Add server → STDIO**. Use `soinon` as the name, the executable path as the
command, and `mcp` and `serve` as separate arguments.

**Claude Code**

```sh
claude mcp add --transport stdio --scope local soinon -- "/absolute/path/to/vnt" mcp serve
```

Run the Claude Code command in the project where you want to use Soinon.
The local setting is private to that project and user.

If you launch Soinon with `--db`, give the chat host the same absolute
database path. Put `--db "/absolute/path/to/data.db"` after the executable
path and before `mcp serve`.

[Codex MCP setup](https://learn.chatgpt.com/docs/extend/mcp?surface=app) ·
[Claude Code MCP setup](https://code.claude.com/docs/en/mcp)

## Include a paper account

The default connection reads the watchlist and stock data. For account
briefings and order previews, add `--account MAIN` after `mcp serve`.
Replace `MAIN` with your account ID from `vnt paper account ls`. Repeat
`--account` for each ordinary paper account you want to share, then
restart the host.

Your host and its model provider can receive requested quotes, paper
holdings, notes and decisions in the conversation. Allow only the paper
accounts you want available in that chat.

## Try it

Open a new local chat and type `/mcp` to check the connection. Ask for
Soinon by name.

| Task | Example prompt |
| --- | --- |
| Watchlist | Use `soinon` to brief me on my watchlist. Flag missing and stale prices. |
| Missing price | Explain why VNM's price is unavailable. Give me the expected session and latest saved close date. |
| Stock | Look up FPT in `soinon`. Show the quote time, grade and scoring factors. |
| Saved decisions | Show recent saved FPT decision notes for `MAIN`, with their dates and recorded reasons. |
| Paper preview | Preview buying 100 FPT at a day limit of 100,000 VND per share in `MAIN`. Show the estimated cost and whether the checks pass. |

A stock lookup can fetch a quote or daily history from public feeds when
the local data is missing or stale. The response labels the source and
time. The quote's source time is included when known. A briefing uses the
saved data. In the TUI, open `:brief` and press
`f` to refresh the daily cache, then ask the host for a fresh briefing.

When the current quote supplies both daily price-band limits, a paper order
preview includes the floor and ceiling in VND per share.

A preview is an estimate and a check of the paper order. A refusal lists
the checks that need attention. Prices in the preview are in VND per
share, so 100,000 VND is 100.00 on a screen that uses thousands of VND.

## Ask chat for a paper order

A chat can ask to place a paper limit order for today. The request waits
in Soinon until you place or decline it. Nothing is placed from the chat.

1. In the TUI, choose the paper account, open **Agent**, press `o`, then
   `y`. Chat order requests stay off until you do this, and turn off again
   if the account is reset. The account also needs its `--account` entry.
2. Ask the chat, for example: *Ask Soinon to buy 100 FPT in `MAIN` at a day
   limit of 100,000 VND with a stop-loss at 95,000 VND.* Use a price within
   the current daily band. If your chat host asks you to approve the tool
   call, that approval allows the request to queue only; it does not
   confirm the paper order.
3. The request appears under **Needs you** on Agent Home. Your current
   screen does not change. Select it and press Enter to open the paper order
   Review with the exact terms.
4. Read the Review. Press **Tab** to select Place, then **Enter**. Press
   `N` to decline, or Esc to leave it waiting.

A request waits five minutes by this computer's clock, and at most three
wait per account. Soinon checks everything again when you press Place:
the account, the setting, today's session, prices, cash and settled shares.
If a check fails, the request is refused and no order is placed. To change
the terms, ask the chat for a new request.

The chat can check a request by its ID. It reports `pending_review`,
`declined`, `expired`, `refused` or `submitted`. A submitted request shows
the paper order number and whether it is waiting, partly filled or filled.
Asking again with the same request returns the same result; it never places
a second order.

Requests wait in a private folder beside the data file. Its name ends in
`.mcp-inbox`. Only your user account can open it. Pending requests are
not part of a database backup; their recorded outcomes are. After restoring
an older backup, ask for new requests as needed.

## If a tool is unavailable

- If `soinon` is absent from `/mcp`, check the executable path and use a
  local chat. Restart the host after a configuration change.
- If the server reports a missing or older database, open the same file
  in Soinon's TUI first and restart the connection.
- If an account is unavailable, check the exact ID and its `--account`
  entry. If a report ID expires, ask for a new briefing.
- If an order request is refused as off, turn on chat order requests for
  that account in **Agent** (`o`). If it reports a full queue, place,
  decline or wait for one of the three waiting requests.
- A session allows 200 tool calls and 50 previews. Restart the connection
  to begin a new session. Public data fetches are capped at six per
  minute, so wait a minute if you reach that limit.
