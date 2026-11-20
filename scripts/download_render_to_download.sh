#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

REPO="${REPO:-Bayuaje12/xiosmp-cinematic-trailer}"
WORKFLOW="${WORKFLOW:-render.yml}"
ARTIFACT="${ARTIFACT:-xiosmp-trailer}"
DOWNLOAD_DIR="${DOWNLOAD_DIR:-/storage/emulated/0/Download}"
TMP_DIR="${TMPDIR:-/data/data/com.termux/files/usr/tmp}/xiosmp-render-download-$$"

if ! command -v gh >/dev/null 2>&1; then
  echo "Error: gh CLI tidak ditemukan." >&2
  exit 1
fi

mkdir -p "$TMP_DIR"

if [ "${1:-}" != "" ]; then
  RUN_ID="$1"
else
  echo "Mencari run workflow '$WORKFLOW' terbaru yang berhasil di $REPO ..."
  RUN_ID=$(gh run list --repo "$REPO" --workflow "$WORKFLOW" --status success --limit 1 --json databaseId --jq '.[0].databaseId')
fi

if [ -z "${RUN_ID:-}" ] || [ "$RUN_ID" = "null" ]; then
  echo "Tidak ada run yang berhasil ditemukan. Jika render masih berjalan, tunggu selesai lalu jalankan:" >&2
  echo "  gh run list --repo $REPO --workflow $WORKFLOW" >&2
  echo "  bash $0 <run-id>" >&2
  exit 1
fi

echo "Mengunduh artifact '$ARTIFACT' dari run $RUN_ID ..."
gh run download "$RUN_ID" --repo "$REPO" -n "$ARTIFACT" -D "$TMP_DIR/artifact"

echo "Menyalin hasil ke $DOWNLOAD_DIR ..."
found=0
while IFS= read -r -d '' f; do
  cp -f "$f" "$DOWNLOAD_DIR/"
  echo "  -> $DOWNLOAD_DIR/$(basename "$f")"
  found=1
done < <(find "$TMP_DIR/artifact" -type f \( -name 'XIOSMP_Landscape.mp4' -o -name 'XIOSMP_Vertical.mp4' -o -name 'thumbnail.png' \) -print0)

if [ "$found" -eq 0 ]; then
  echo "MP4 tidak ditemukan di artifact. Isi artifact:" >&2
  find "$TMP_DIR/artifact" -type f >&2 || true
  exit 1
fi

echo "Selesai. Video tersedia di folder Download."
