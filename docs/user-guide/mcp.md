# Soinon in Codex and Claude Code

Connect a local Codex or Claude Code chat to Soinon through the Model Context
Protocol (MCP). Ask about your watchlist, a stock's grade, a saved decision
or a paper-order estimate. Soinon reads the same data file as the TUI and
can run beside it.

Your chat host supplies the model through its own sign-in and usage plan.
The connection needs no OpenAI key in Soinon. Review and place paper orders
in Soinon's paper order screen.

## Connect

1. Start Soinon once with `vnt tui` so the data file is ready.
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

## If a tool is unavailable

- If `soinon` is absent from `/mcp`, check the executable path and use a
  local chat. Restart the host after a configuration change.
- If the server reports a missing or older database, open the same file
  in Soinon's TUI first and restart the connection.
- If an account is unavailable, check the exact ID and its `--account`
  entry. If a report ID expires, ask for a new briefing.
- A session allows 200 tool calls and 50 previews. Restart the connection
  to begin a new session. Public data fetches are capped at six per
  minute, so wait a minute if you reach that limit.
