# Vietnam Stock Lab Releases

This is the public, binary-only release repository for **Vietnam Stock Lab**
(`vnt`), a local-first terminal workbench for Vietnam stock-market research.
The application source repository is private and no public source-code license
is granted here.

> No supported binary has been published yet. Do not download artifacts from
> issues, comments, forks, or unofficial mirrors. The first approved release
> will appear on this repository's Releases page with SHA-256 checksums, release
> notes, binary-use terms, and third-party notices.

## Download website

The official GitHub Pages site is prepared at
<https://vyndinh.github.io/vietnam-stock-lab-releases/>. Until an approved
release exists, it deliberately shows a no-release state and no download
buttons. `site/site-config.json` references the current canonical public terms
and notices; each release promotion adds the exact immutable `releases.json`
URL. The browser never receives a repository credential.

## Policies and notices

Free prerelease use is governed by the effective
[binary-use terms](TERMS.md). Open-source component attribution, licenses, and
the bundled-asset inventory are published in
[third-party notices](THIRD_PARTY_NOTICES.md). These policy links are live
before the first release; their presence does not mean a binary has been
published.

## Support

Use [public Issues](https://github.com/vyndinh/vietnam-stock-lab-releases/issues)
for installation problems and reproducible application defects. Read
[SUPPORT.md](SUPPORT.md) before posting and remove private data from diagnostics.

Do not report vulnerabilities publicly. Use the repository Security tab's
private **Report a vulnerability** action and follow [SECURITY.md](SECURITY.md).

## Product boundaries

- Vietnam Stock Lab is research software, not investment, financial, legal, or
  tax advice.
- Public/no-key market and news feeds may be delayed, incomplete, unavailable,
  or changed by their providers.
- The application does not place real broker orders or request broker
  credentials.
- Product data is local-first and telemetry is off by default.
- A binary is supported only when its release notes record the relevant
  platform verification.

## Release integrity

Official artifacts will use immutable version tags. Published files will never
be silently replaced at the same URL. Verify the archive against the release's
`checksums.txt` before installation. Revoked versions will be identified in the
release metadata and release notes.
