# Soinon Stock Lab user guide

Soinon Stock Lab (`vnt`) is a terminal app for following Vietnamese stocks on
HOSE, HNX and UPCoM, practising with paper money, and testing ideas on past
prices. It runs on your computer, keeps its data in one local file and needs
no account or key for market data.

This guide is for someone new to the app and new to stock terms. It covers
every place in the current build: what each page is for, how to get there,
its keys, and what its numbers mean.

**Paper only.** Orders in this app are simulated. Nothing is ever sent to a
broker. The app gives no investment advice.

## How to read it

Start with [Getting started](getting-started.md). It explains the screen,
how to move between places and how to find help. Then read the chapter for
the place you want. Unfamiliar words are in [Stock terms](stock-terms.md).

Keys are shown like `Enter` or `F3`. A letter key is case-sensitive: `a` and
`A` do different things. Commands typed after `:` are shown like `:brief`.

## Contents

| Chapter | What it covers |
|---|---|
| [Getting started](getting-started.md) | Install, first launch, the screen, moving around, Help, the command bar, themes |
| [1 Today](today.md) | What changed, your book, the agent, what to do next |
| [2 Market](market.md) | The board, watchlists, news, foreign flow, alerts, the daily briefing |
| [3 Stock](stock.md) | One stock: summary, chart, order book, technicals, trades, backtest |
| [4 Find](find.md) | Ready-made ideas, describing a screen in words, picking signals |
| [5 Paper](paper.md) | Paper accounts, orders, positions, journal, performance, review |
| [6 Lab](lab.md) | Backtests, Replay, Chart study and guided practice on past prices |
| [7 Agent](agent.md) | Auto paper, approvals, decisions, track record, lessons, model log |
| [8 Records](records.md) | Real holdings, dividends, backup, exports, health, theme, about |
| [Soinon in Codex and Claude Code](mcp.md) | Connect a local chat for stock research and paper-order previews |
| [Stock terms](stock-terms.md) | Plain-language glossary |
| [Command line](command-line.md) | `vnt` commands for scripting, checks and recovery |
| [Safety and your data](safety-and-data.md) | What stays local, what goes out, model costs, limits |

## Two words used everywhere

- **Saved** means read from the app's local file. Most pages read saved data
  and say how old it is.
- **Live** means a quote from the public feed in the last few seconds,
  shown only while the market is open.
