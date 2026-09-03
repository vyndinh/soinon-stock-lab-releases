window.__APP_LOADED__ = true;

import {
  firstLaunchCommands,
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
  navTag: document.querySelector("#nav-release-tag"),
  platformFilter: document.querySelector("#platform-filter"),
};

function getOSIconSVG(os) {
  if (os === "darwin") {
    return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.98.6-2.61 1.34-.56.63-1.05 1.68-.92 2.7.99.08 2-.45 2.61-1.19z"/>
    </svg>`;
  }
  if (os === "windows") {
    return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4h-13.051M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.951-1.951"/>
    </svg>`;
  }
  return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.002 0c-2.44 0-4.417 2.115-4.417 4.724 0 .43.055.848.156 1.246C6.73 6.46 5.86 7.55 5.51 8.87c-.66 2.5.58 4.69 1.13 5.48-.06.4-.1.81-.1 1.23 0 3.32 2.46 6.01 5.46 6.01s5.46-2.69 5.46-6.01c0-.42-.04-.83-.1-1.23.55-.79 1.79-2.98 1.13-5.48-.35-1.32-1.22-2.41-2.23-2.9.1-.4.16-.82.16-1.25 0-2.609-1.977-4.724-4.417-4.724zM8.9 9.3c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6.2 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
  </svg>`;
}

function detectUserOS() {
  const ua = navigator.userAgent || "";
  const platform = navigator.platform || "";
  if (/Macintosh|MacIntel|MacPPC|Mac68K|iPad|iPhone/i.test(ua) || /Mac/i.test(platform)) {
    return "darwin";
  }
  if (/Win32|Win64|Windows|WinCE/i.test(ua) || /Win/i.test(platform)) {
    return "windows";
  }
  if (/Linux|X11/i.test(ua) || /Linux/i.test(platform)) {
    return "linux";
  }
  return null;
}

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
  card.dataset.os = artifact.os;

  const headerGroup = document.createElement("div");
  headerGroup.className = "card-header-group";

  const iconWrapper = document.createElement("div");
  iconWrapper.className = "os-icon-wrapper";
  iconWrapper.innerHTML = getOSIconSVG(artifact.os);

  const titleGroup = document.createElement("div");
  titleGroup.className = "card-title-group";

  const heading = document.createElement("h3");
  heading.textContent = platformLabel(artifact.os, artifact.arch);
  titleGroup.append(heading);

  headerGroup.append(iconWrapper, titleGroup);

  const metadata = document.createElement("p");
  metadata.className = "file-meta";
  metadata.textContent = `${artifact.filename} · ${formatBytes(artifact.size_bytes)}`;

  const checksumContainer = document.createElement("div");
  checksumContainer.className = "checksum-container";

  const checksum = document.createElement("code");
  checksum.textContent = `SHA-256 ${artifact.sha256}`;

  const copyHashBtn = document.createElement("button");
  copyHashBtn.className = "copy-hash-btn";
  copyHashBtn.type = "button";
  copyHashBtn.textContent = "Copy";
  copyHashBtn.title = "Copy SHA-256 hash";
  copyHashBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(artifact.sha256);
      copyHashBtn.textContent = "Copied!";
      window.setTimeout(() => {
        copyHashBtn.textContent = "Copy";
      }, 1800);
    } catch {
      copyHashBtn.textContent = "Failed";
    }
  });
  checksumContainer.append(checksum, copyHashBtn);

  const link = document.createElement("a");
  link.className = "download-link";
  link.href = artifact.download_url;
  link.setAttribute("aria-label", `Download ${platformLabel(artifact.os, artifact.arch)} archive`);
  link.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
    <span>Download archive</span>
  `;

  const sbomRow = document.createElement("div");
  sbomRow.className = "sbom-row";
  const sbomLink = document.createElement("a");
  sbomLink.className = "sbom-link";
  sbomLink.href = artifact.sbom_url;
  sbomLink.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
    </svg>
    View SBOM
  `;
  sbomRow.append(sbomLink);

  const install = document.createElement("details");
  install.className = "install-steps";
  const installSummary = document.createElement("summary");
  installSummary.textContent = "First-launch commands";

  const terminalFrame = document.createElement("div");
  terminalFrame.className = "terminal-frame";

  const terminalHeader = document.createElement("div");
  terminalHeader.className = "terminal-header-bar";
  terminalHeader.innerHTML = `
    <div class="terminal-dots">
      <span class="terminal-dot dot-red"></span>
      <span class="terminal-dot dot-yellow"></span>
      <span class="terminal-dot dot-green"></span>
    </div>
    <span class="terminal-shell-badge">${artifact.os === "windows" ? "PowerShell" : "zsh / bash"}</span>
  `;

  const commands = firstLaunchCommands(artifact);
  const commandBlock = document.createElement("pre");
  const commandCode = document.createElement("code");
  commandCode.textContent = commands;
  commandBlock.append(commandCode);

  terminalFrame.append(terminalHeader, commandBlock);

  const copyButton = document.createElement("button");
  copyButton.className = "copy-button";
  copyButton.type = "button";
  copyButton.textContent = "Copy commands";
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(commands);
      copyButton.textContent = "Copied";
      window.setTimeout(() => {
        copyButton.textContent = "Copy commands";
      }, 1800);
    } catch (error) {
      console.error(error);
      copyButton.textContent = "Copy failed — select the commands";
    }
  });

  install.append(installSummary, terminalFrame, copyButton);

  card.append(headerGroup, metadata, checksumContainer, link, sbomRow, install);
  return card;
}

function initPlatformFilter() {
  if (!elements.platformFilter) return;
  const buttons = elements.platformFilter.querySelectorAll(".filter-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      const platform = btn.dataset.platform;
      const cards = elements.downloads.querySelectorAll(".download-card");
      cards.forEach((card) => {
        if (platform === "all" || card.dataset.os === platform) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

function highlightUserPlatform() {
  const userOS = detectUserOS();
  if (!userOS) return;

  const cards = elements.downloads.querySelectorAll(".download-card");
  for (const card of cards) {
    if (card.dataset.os === userOS) {
      card.classList.add("recommended");
      break;
    }
  }
}

function renderManifest(manifest) {
  elements.version.textContent = manifest.tag;
  elements.channel.textContent = manifest.channel;
  elements.date.textContent = new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
    new Date(manifest.published_at),
  );
  elements.notes.href = manifest.release_notes_url;
  elements.checksums.href = manifest.checksums_url;

  if (elements.navTag) {
    elements.navTag.textContent = `${manifest.tag} · ${manifest.channel}`;
  }

  elements.downloads.replaceChildren(...manifest.artifacts.map(renderArtifact));
  highlightUserPlatform();
  initPlatformFilter();

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
function initThemeToggle() {
  const toggleBtn = document.querySelector("#theme-toggle");
  if (!toggleBtn) return;
  toggleBtn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", current);
    localStorage.setItem("theme", current);
  });
}

initThemeToggle();
start();

