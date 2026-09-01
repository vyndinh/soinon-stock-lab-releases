# Support Policy

Use this repository's [issue tracker](https://github.com/vyndinh/vietnam-stock-lab-releases/issues)
for installation, upgrade, and reproducible application problems. Source access
is not required.

## Response boundaries

- Target initial triage is five business days; this is a target, not an SLA.
- Resolution timing depends on severity, reproducibility, supported-version
  status, and third-party provider availability. A fix is not guaranteed.
- Support does not cover investment decisions, provider accounts, broker
  operations, custom data repair, or guaranteed restoration of public feeds.
- Security reports must not be public issues; follow [SECURITY.md](SECURITY.md).

Before posting, remove personal information, portfolio details, database
contents, local paths, API responses, and debug logs you do not intend to make
public. Never attach a complete SQLite database to a public issue.

## Supported versions and platforms

The latest stable release is supported. Its immediate predecessor receives
rollback-only help for 30 calendar days after replacement. A prerelease is
supported until superseded, plus a 14-day transition. Revoked releases are
unsupported immediately.

Packages may be produced for macOS, Windows, and Linux on amd64 and arm64. A
target is supported only when its release notes record successful install and
smoke-test evidence; otherwise it is packaged but experimental.

Public/no-key providers are supported best effort: maintainers may investigate,
adjust, replace, or disable an integration, but do not guarantee provider
uptime, latency, completeness, historical continuity, or restoration.

## What to include

Use the appropriate issue form and provide your `vnt version` output, operating
system and architecture, installation method, minimal reproduction steps,
expected and actual behavior, sanitized error output, and the result of
`vnt doctor` when relevant.
