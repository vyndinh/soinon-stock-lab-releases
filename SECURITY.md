# Security Policy

## Supported versions

The latest stable release receives security updates. The current prerelease is
handled best effort until superseded. Older, end-of-support, and revoked
releases are unsupported unless an announcement says otherwise.

## Report privately

Use the Security tab's private **Report a vulnerability** action. Do not open a
public issue for a suspected vulnerability. Include the affected version and
platform, impact, prerequisites, reproduction or proof of concept, and any
suggested mitigation. Remove credentials, personal data, portfolio information,
and unrelated local files.

Target acknowledgement is three business days and target initial assessment is
seven business days. These are targets, not remediation guarantees. Disclosure
timing will be coordinated according to impact and fix readiness.

In scope are artifact/download integrity, install or update paths, local
sensitive-data exposure, code execution, access-control bypass, dependency
vulnerabilities, and security-relevant log leakage. Provider downtime or
inaccurate market data is a support issue unless it creates security impact.

For a compromised artifact or credential, maintainers will stop recommending
the affected version, warn users, revoke it in release metadata, remove an
unsafe download when necessary, rotate credentials, and publish a new immutable
version. Existing artifact bytes and tags will never be silently replaced.
