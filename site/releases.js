const repositoryBase = "https://github.com/vyndinh/soinon-stock-lab-releases/";
const releaseBase = `${repositoryBase}releases/`;
const sha256Pattern = /^[a-f0-9]{64}$/;

function validateURLWithBase(value, field, base) {
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error(`${field} is not a valid URL`);
  }

  if (parsed.protocol !== "https:" || !parsed.href.startsWith(base)) {
    throw new Error(`${field} must use the official HTTPS repository`);
  }
  return parsed.href;
}

export function validateRepositoryURL(value, field) {
  return validateURLWithBase(value, field, repositoryBase);
}

export function validatePublicURL(value, field) {
  return validateURLWithBase(value, field, releaseBase);
}

export function validateManifest(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new Error("manifest must be an object");
  }
  if (input.schema_version !== 1) {
    throw new Error("unsupported manifest schema");
  }
  if (input.product?.slug !== "vietnam-stock-lab" || input.product?.command !== "vnt") {
    throw new Error("unexpected product identity");
  }
  if (typeof input.version !== "string" || !input.version) {
    throw new Error("manifest version is missing");
  }
  if (typeof input.tag !== "string" || !input.tag.startsWith("v")) {
    throw new Error("manifest tag is invalid");
  }
  if (!['prerelease', 'stable'].includes(input.channel)) {
    throw new Error("manifest channel is invalid");
  }
  if (Number.isNaN(Date.parse(input.published_at))) {
    throw new Error("manifest publication time is invalid");
  }

  const releaseNotesURL = validatePublicURL(input.release_notes_url, "release_notes_url");
  const checksumsURL = validatePublicURL(input.checksums_url, "checksums_url");
  const tagPath = encodeURIComponent(input.tag);
  if (!releaseNotesURL.includes(`/releases/tag/${tagPath}`)) {
    throw new Error("release_notes_url does not match the manifest tag");
  }
  if (!checksumsURL.includes(`/releases/download/${tagPath}/`)) {
    throw new Error("checksums_url does not match the manifest tag");
  }
  if (!Array.isArray(input.artifacts) || input.artifacts.length === 0) {
    throw new Error("manifest has no downloadable artifacts");
  }

  const artifacts = input.artifacts.map((artifact, index) => {
    if (!artifact || typeof artifact !== "object") {
      throw new Error(`artifact ${index + 1} is invalid`);
    }
    if (!['darwin', 'windows', 'linux'].includes(artifact.os)) {
      throw new Error(`artifact ${index + 1} has an unsupported OS`);
    }
    if (!['amd64', 'arm64'].includes(artifact.arch)) {
      throw new Error(`artifact ${index + 1} has an unsupported architecture`);
    }
    if (typeof artifact.filename !== "string" || !artifact.filename) {
      throw new Error(`artifact ${index + 1} has no filename`);
    }
    if (!Number.isSafeInteger(artifact.size_bytes) || artifact.size_bytes <= 0) {
      throw new Error(`artifact ${index + 1} has an invalid size`);
    }
    if (!sha256Pattern.test(artifact.sha256)) {
      throw new Error(`artifact ${index + 1} has an invalid SHA-256 value`);
    }

    const downloadURL = validatePublicURL(artifact.download_url, `artifact ${index + 1} download_url`);
    const sbomURL = validatePublicURL(artifact.sbom_url, `artifact ${index + 1} sbom_url`);
    if (!downloadURL.includes(`/releases/download/${tagPath}/`) || !sbomURL.includes(`/releases/download/${tagPath}/`)) {
      throw new Error(`artifact ${index + 1} URL does not match the manifest tag`);
    }

    return {
      ...artifact,
      download_url: downloadURL,
      sbom_url: sbomURL,
    };
  });

  return { ...input, release_notes_url: releaseNotesURL, checksums_url: checksumsURL, artifacts };
}

export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes;
  let unit = "B";
  for (const candidate of units) {
    value /= 1024;
    unit = candidate;
    if (value < 1024) break;
  }
  return `${value.toFixed(value >= 10 ? 1 : 2)} ${unit}`;
}

export function platformLabel(os, arch) {
  const operatingSystems = { darwin: "macOS", windows: "Windows", linux: "Linux" };
  const architectures = { arm64: "Apple Silicon / ARM64", amd64: "Intel / x64" };
  return `${operatingSystems[os] ?? os} — ${architectures[arch] ?? arch}`;
}
