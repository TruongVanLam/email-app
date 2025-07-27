const FILE_NAME_DOWNLOAD = "meta_receipts.zip";

export function createFilename(fromDate, toDate) {
  return `${FILE_NAME_DOWNLOAD.replace(".zip", "")}_${fromDate}_${toDate}.zip`;
}

export function handleDownload(blob, filename) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
}

export function handleTokenExpiration() {
  localStorage.removeItem("token");
  window.location.reload();
}
