import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  formatBytes,
  platformLabel,
  validateManifest,
  validatePublicURL,
  validateRepositoryURL,
} from "../releases.js";

const fixtureURL = new URL("./fixtures/releases.json", import.meta.url);
const validManifest = JSON.parse(await readFile(fixtureURL, "utf8"));

test("accepts the versioned public release manifest", () => {
  const manifest = validateManifest(validManifest);
  assert.equal(manifest.schema_version, 1);
  assert.equal(manifest.artifacts.length, 1);
  assert.equal(manifest.artifacts[0].os, "darwin");
});

test("accepts the Soinon distribution slug while retaining the historical candidate", () => {
  const changed = structuredClone(validManifest);
  changed.product.slug = "soinon-stock-lab";
  const manifest = validateManifest(changed);
  assert.equal(manifest.product.slug, "soinon-stock-lab");
  assert.equal(validateManifest(validManifest).product.slug, "vietnam-stock-lab");
});

test("rejects unrelated product slugs", () => {
  const changed = structuredClone(validManifest);
  changed.product.slug = "untrusted-product";
  assert.throws(() => validateManifest(changed), /unexpected product identity/);
});

test("rejects an unsupported schema", () => {
  assert.throws(() => validateManifest({ ...validManifest, schema_version: 2 }), /unsupported manifest schema/);
});

test("rejects artifacts outside the official release repository", () => {
  const changed = structuredClone(validManifest);
  changed.artifacts[0].download_url = "https://example.com/untrusted.tar.gz";
  assert.throws(() => validateManifest(changed), /official HTTPS repository/);
});

test("rejects malformed checksums", () => {
  const changed = structuredClone(validManifest);
  changed.artifacts[0].sha256 = "not-a-checksum";
  assert.throws(() => validateManifest(changed), /invalid SHA-256/);
});

test("rejects non-HTTPS policy and manifest links", () => {
  assert.throws(() => validatePublicURL("http://github.com/example", "manifest"), /official HTTPS repository/);
  assert.throws(() => validateRepositoryURL("https://example.com/TERMS.md", "policy"), /official HTTPS repository/);
  assert.equal(
    validateRepositoryURL("https://github.com/vyndinh/soinon-stock-lab-releases/blob/main/TERMS.md", "policy"),
    "https://github.com/vyndinh/soinon-stock-lab-releases/blob/main/TERMS.md",
  );
});

test("rejects release assets from a different tag", () => {
  const changed = structuredClone(validManifest);
  changed.artifacts[0].download_url = changed.artifacts[0].download_url.replace("v0.1.0-rc.1", "v0.2.0");
  assert.throws(() => validateManifest(changed), /does not match the manifest tag/);
});

test("formats platform names and file sizes", () => {
  assert.equal(platformLabel("darwin", "arm64"), "macOS — Apple Silicon / ARM64");
  assert.equal(platformLabel("windows", "amd64"), "Windows — Intel / x64");
  assert.equal(formatBytes(12345678), "11.8 MB");
});

test("the page keeps required public trust and fallback surfaces", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  assert.match(html, /id="release-status"/);
  assert.match(html, /SHA-256/);
  assert.match(html, /Not investment/);
  assert.match(html, /SUPPORT\.md/);
  assert.match(html, /security\/policy/);
  assert.match(html, /name="viewport"/);
});

test("publishes effective policies with the approved release manifest", async () => {
  const config = JSON.parse(await readFile(new URL("../site-config.json", import.meta.url), "utf8"));
  const terms = await readFile(new URL("../../TERMS.md", import.meta.url), "utf8");
  const notices = await readFile(new URL("../../THIRD_PARTY_NOTICES.md", import.meta.url), "utf8");

  assert.equal(
    validatePublicURL(config.manifest_url, "manifest_url"),
    "https://github.com/vyndinh/soinon-stock-lab-releases/releases/download/v0.1.0-rc.2/releases.json",
  );
  assert.equal(validateRepositoryURL(config.terms_url, "terms_url"), config.terms_url);
  assert.equal(validateRepositoryURL(config.notices_url, "notices_url"), config.notices_url);
  assert.match(terms, /Status: Effective for free prerelease distribution/);
  assert.match(terms, /Effective date: 2026-09-02/);
  assert.match(notices, /^# Third-Party Notices/m);
  assert.doesNotMatch(notices, /owner provenance confirmation remains a public-release gate/);
});
