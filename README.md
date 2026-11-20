# XIOSMP Cinematic Motion Graphics Trailer (V2)

Trailer promosi cinematic untuk server Minecraft **XIOSMP** (Economy SMP) dibuat dengan **Remotion + React + TypeScript** (code-based motion graphics), dengan BGM, SFX, dan sistem integrasi voice-over laki-laki Bahasa Indonesia.

## Informasi Server (akurat)
- **Nama:** XIOSMP
- **Kategori:** Economy SMP
- **Edisi:** Java Edition + Bedrock Edition
- **IP:** `play.xiosmp.my.id`
- **Port:** `2005`
- **Tagline:** `YOUR WORLD. YOUR ECONOMY. YOUR EMPIRE.`
- **Pesan utama:** `ONE SERVER. TWO EDITIONS. ENDLESS POSSIBILITIES.`
- **Branding:** XIOSMP Official Server

## Logo
Logo asli yang digunakan: `public/assets/xiosmp-logo.jpeg`
Sumber integrasi: file `5a589fa988c5022dc78687ca7a1a5a1a~tplv-tiktokx-cropcenter_1080_1080.jpeg` ditemukan di folder Download Android (`/storage/emulated/0/Download` / `/sdcard/Download`) dan juga tersedia dari upload sesi. Logo disalin tanpa mengubah bentuk, warna, tulisan, atau identitas; digunakan sebagai elemen utama opening/closing dan branding reveal.

## Struktur Project
- `src/Root.tsx` — komposisi Remotion (Landscape & Vertical)
- `src/Trailer.tsx` — timeline & sequencing scene + audio
- `src/theme.ts` — konstanta, timing, palet, identitas server
- `src/scenes/` — `IntroScene`/Scene1, `LogoRevealScene`/Scene2, `EconomyScene`/Scene3, `AdventureScene`/Scene4, `EditionScene`/Scene5, `ServerRevealScene`/Scene6, `OutroScene`/Scene7
- `src/components/` — `CinematicBackground`, `ParticleSystem` (fog/particles), `XiosmpLogo`, `AudioManager`, `VoiceOverManager`
- `public/assets/xiosmp-logo.jpeg` — logo resmi
- `public/audio/bgm/` — background music (placeholder synthesized)
- `public/audio/sfx/` — sound effects (placeholder synthesized)
- `public/audio/vo/` — slot untuk rekaman voice-over laki-laki (belum terisi otomatis)
- `VOICE_OVER_SCRIPT.md` — naskah VO + timestamp
- `AUDIO_TIMING.md` — timing musik, SFX, mixing
- `ASSET_DOCUMENTATION.md` — dokumentasi aset & lisensi
- `.github/workflows/render.yml` — render otomatis di Linux (GitHub Actions)

## Storyboard (60s, 30 FPS)
1. **Dark Awakening (0–7s)** — atmosfer gelap, kabut, partikel emas/emerald, reveal dunia; text: `A NEW WORLD IS WAITING.`
2. **Logo Reveal (7–14s)** — logo asli XIOSMP, light sweep, impact; `XIOSMP` + tagline.
3. **Economy Experience (14–27s)** — visual marketplace/trading/chest/resources (tanpa klaim fitur server yang tidak diverifikasi); `TRADE. EARN. BUILD YOUR EMPIRE.`
4. **Adventure and Community (27–38s)** — eksplorasi, lanskap, bangunan, interaksi pemain; `YOUR ADVENTURE STARTS HERE.`
5. **Java + Bedrock (38–46s)** — split screen & merge; `JAVA EDITION`, `BEDROCK EDITION`, `ONE COMMUNITY`.
6. **Server Reveal (46–55s)** — `JOIN XIOSMP NOW!`, IP `play.xiosmp.my.id`, PORT `2005`, `JAVA + BEDROCK` (IP dengan glow & typing reveal, mudah dibaca).
7. **Final Logo (55–60s)** — logo kembali, golden light, kamera menjauh, partikel memudar; `SEE YOU IN XIOSMP!` + tagline.

## Output
- `out/XIOSMP_Landscape.mp4` — 1920x1080, 16:9, 30 FPS
- `out/XIOSMP_Vertical.mp4` — 1080x1920, 9:16, 30 FPS (layout vertical disesuaikan)
- `out/thumbnail.png` — thumbnail (jika render still berhasil)

Keduanya ditargetkan memiliki: BGM, SFX, logo asli, IP/port benar, dan VO laki-laki jika file rekaman disediakan.

## Audio
- **BGM:** `public/audio/bgm/main.wav` — placeholder original/synthesized (FFmpeg) sepanjang 60s, struktur intro misterius → build energik → impact → ending epik, fade in/out. Ganti dengan musik sinematik royalty-free berlisensi untuk kualitas produksi akhir.
- **SFX:** `public/audio/sfx/*.wav` — whoosh, impact, sparkle, transition sweep, riser, final hit, ambient wind (synthesized placeholder).
- **VO laki-laki (Bahasa Indonesia):** **belum dibuat otomatis** (tidak ada TTS laki-laki ID berkualitas tinggi yang dapat mengekspor file audio di lingkungan ini). Naskah & timestamp lengkap ada di `VOICE_OVER_SCRIPT.md`; siapkan rekaman di `public/audio/vo/scene1.mp3`..`scene7.mp3` lalu aktifkan pemuatan di `VoiceOverManager`.
- **Mix target:** VO paling jelas, BGM di-duck saat VO, SFX sebagai aksen, tanpa clipping, fade in/out, AAC stereo 48 kHz saat render.

## Cara Pakai (lokal)
```bash
npm install
# jika esbuild postinstall diblokir: node node_modules/esbuild/install.js
npm run check
npm run render:landscape
npm run render:vertical
# atau
npm run render:all
```
Preview studio:
```bash
npm start
```

## Render di Android/Termux
Remotion memerlukan browser headless (Chromium/Chrome) untuk rendering. Pada Termux, kompatibilitas browser/compositor sering terbatas sehingga render lokal dapat gagal. **Workflow GitHub Actions** disediakan untuk merender di runner Linux dan menyimpan MP4 sebagai artifacts.

## GitHub Actions
Workflow: `.github/workflows/render.yml`
- Install dependencies, TypeScript check
- Render landscape & vertical
- Validasi file MP4 dan keberadaan stream audio (ffprobe)
- Upload artifacts (MP4, thumbnail jika ada)

## Catatan
- Jangan klaim render berhasil sebelum file MP4 tersedia dan tervalidasi.
- Fitur server tidak diarang; visual ekonomi/petualangan bersifat representasi sinematik umum.
- Ganti placeholder audio (terutama BGM & VO) dengan aset berlisensi berkualitas tinggi untuk hasil final terbaik.
