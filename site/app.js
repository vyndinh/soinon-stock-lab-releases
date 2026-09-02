import {
  formatBytes,
  platformLabel,
  validateManifest,
  validateManifestURL,
  validateRepositoryURL,
} from "./releases.js";

const elements = {
  status: document.querySelector("#release-status"),
  details: document.querySelector("#release-details"),
  version: document.querySelector("#release-version"),
  channel: document.querySelector("#release-channel"),
  date: document.querySelector("#release-date"),
  notes: document.querySelector("#release-notes-link"),
  checksums: document.querySelector("#checksums-link"),
  downloads: document.querySelector("#downloads"),
  terms: document.querySelector("#terms-item"),
  notices: document.querySelector("#notices-item"),
};

function setStatus(message, error = false) {
  elements.status.textContent = message;
  elements.status.classList.toggle("error", error);
  elements.status.hidden = false;
  elements.details.hidden = true;
}

function setPolicyLink(item, label, url) {
  if (!url) return;
  const link = document.createElement("a");
  link.href = validateRepositoryURL(url, label);
  link.textContent = label;
  item.replaceChildren(link);
}

function renderArtifact(artifact) {
  const card = document.createElement("article");
  card.className = "download-card";

  const heading = document.createElement("h3");
  heading.textContent = platformLabel(artifact.os, artifact.arch);

  const metadata = document.createElement("p");
  metadata.textContent = `${artifact.filename} · ${formatBytes(artifact.size_bytes)}`;

  const checksum = document.createElement("code");
  checksum.textContent = `SHA-256 ${artifact.sha256}`;

  const link = document.createElement("a");
  link.className = "download-link";
  link.href = artifact.download_url;
  link.textContent = "Download archive";
  link.setAttribute("aria-label", `Download ${platformLabel(artifact.os, artifact.arch)} archive`);

  const sbom = document.createElement("p");
  const sbomLink = document.createElement("a");
  sbomLink.href = artifact.sbom_url;
  sbomLink.textContent = "View SBOM";
  sbom.append(sbomLink);

  card.append(heading, metadata, checksum, link, sbom);
  return card;
}

function renderManifest(manifest) {
  elements.version.textContent = manifest.tag;
  elements.channel.textContent = manifest.channel;
  elements.date.textContent = new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
    new Date(manifest.published_at),
  );
  elements.notes.href = manifest.release_notes_url;
  elements.checksums.href = manifest.checksums_url;
  elements.downloads.replaceChildren(...manifest.artifacts.map(renderArtifact));
  elements.status.hidden = true;
  elements.details.hidden = false;
}

async function loadJSON(url) {
  const response = await fetch(url, { cache: "no-store", credentials: "omit" });
  if (!response.ok) throw new Error(`request failed with HTTP ${response.status}`);
  return response.json();
}

async function start() {
  try {
    const config = await loadJSON("./site-config.json");
    setPolicyLink(elements.terms, "Binary-use terms", config.terms_url);
    setPolicyLink(elements.notices, "Third-party notices", config.notices_url);

    if (!config.manifest_url) {
      setStatus("No approved binary has been published yet. Check back after the first release candidate is verified.");
      return;
    }

    const manifestURL = validateManifestURL(config.manifest_url, "manifest_url");
    const manifest = validateManifest(await loadJSON(manifestURL));
    renderManifest(manifest);
  } catch (error) {
    console.error(error);
    setStatus(
      "The approved release information is temporarily unavailable. Use the public Releases page and verify checksums before installing.",
      true,
    );
  }
}

start();
