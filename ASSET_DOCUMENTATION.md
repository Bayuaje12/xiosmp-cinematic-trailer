# XIOSMP Trailer - Asset Documentation

## 1. Logo (resmi, wajib)
- **File project:** `public/assets/xiosmp-logo.jpeg`
- **Nama asli:** `5a589fa988c5022dc78687ca7a1a5a1a~tplv-tiktokx-cropcenter_1080_1080.jpeg`
- **Sumber ditemukan:** `/storage/emulated/0/Download/` dan `/sdcard/Download/` (Android), serta salinan upload sesi: `/data/data/com.termux/files/usr/tmp/opencode/uploads/2ec450d6-6d1d-4c00-a98d-c852479a964c/5a589fa988c5022dc78687ca7a1a5a1a~tplv-tiktokx-cropcenter_1080_1080.jpeg`
- **Ukuran file:** ~280 KB (1080x1080 sesuai nama sumber)
- **Perlakuan:** bentuk, warna, tulisan, dan identitas asli dipertahankan; tidak didistorsi (object-fit cover dalam frame proporsional), tidak diganti/desain ulang. Digunakan pada intro/logo reveal, branding transisi, dan ending.
- **Lisensi/kepemilikan:** aset resmi milik XIOSMP Official Server (digunakan untuk materi promosi server ini).

## 2. Musik Latar (BGM)
- **File:** `public/audio/bgm/main.wav`
- **Durasi:** 60 detik, 48 kHz, stereo, PCM (di-encode AAC saat render)
- **Gaya target:** epic cinematic orchestral, fantasy adventure, medieval atmosphere, powerful build-up, emotional ending
- **Status:** **Placeholder original/synthesized** dibuat dengan FFmpeg (drone + tonal layers + fade in/out). Bebas royalti (buatan project), namun bukan produksi orkestra sampel profesional.
- **Rekomendasi produksi:** ganti dengan musik sinematik berlisensi/royalty-free (mis. lisensi yang memperbolehkan penggunaan promosi) dan sesuaikan level/ducking di `src/components/AudioManager.tsx`.

## 3. Sound Effects (SFX)
Semua SFX placeholder synthesized (FFmpeg), original, bebas royalti, 48 kHz stereo WAV:
- `public/audio/sfx/ambient_wind.wav` — ambient wind bed
- `public/audio/sfx/riser_intro.wav` — riser atmosferik intro
- `public/audio/sfx/whoosh_impact_logo.wav` — whoosh + impact reveal
- `public/audio/sfx/impact_logo.wav` — deep bass/logo impact
- `public/audio/sfx/sparkle.wav` — magical sparkle/particles
- `public/audio/sfx/transition_sweep.wav` — transition sweep
- `public/audio/sfx/riser_mid.wav` — dramatic riser
- `public/audio/sfx/impact_server.wav` — deep bass impact server reveal
- `public/audio/sfx/final_hit.wav` — final cinematic hit

Ganti dengan library SFX berlisensi jika membutuhkan karakter sinematik lebih kuat.

## 4. Voice Over (VO)
- **Status:** **Belum dibuat sebagai file audio.**
- **Alasan:** tidak tersedia TTS laki-laki Bahasa Indonesia berkualitas tinggi yang dapat mengekspor file audio secara langsung di lingkungan ini (`termux-tts-speak` hanya pemutaran stream). Tidak ada klaim VO sudah jadi.
- **Naskah & timestamp:** `VOICE_OVER_SCRIPT.md`
- **Slot file (opsional, per scene):** `public/audio/vo/scene1.mp3` ... `scene7.mp3` (atau `.wav`)
- **Integrasi:** `src/components/VoiceOverManager.tsx` menyiapkan hook pemuatan; setelah file ditambahkan, aktifkan mapping Sequence+Audio sesuai timestamp.
- **Spesifikasi target:** laki-laki dewasa, deep/tegas/berwibawa/natural/energik, cinematic announcer, Bahasa Indonesia jelas, bukan robot/perempuan.

## 5. Visual & Grafis
- Seluruh visual dibuat sebagai motion graphics berbasis kode (React/Remotion/CSS/canvas-like elements), bukan slideshow gambar statis.
- Elemen: background gradien sinematik, fog layer, particle systems (emas/emerald), siluet dunia/lanskap/kerajaan, kartu ekonomi representatif, split-screen edisi, tipografi dinamis, glow & typing reveal IP.
- Tidak menggunakan footage Minecraft berhak cipta pihak ketiga; representasi visual bersifat generik/sinematik dan tidak mengklaim fitur server yang tidak diverifikasi.

## 6. Output & Deliverables
- `out/XIOSMP_Landscape.mp4` — 1920x1080, 16:9, 30 FPS, H.264 + AAC
- `out/XIOSMP_Vertical.mp4` — 1080x1920, 9:16, 30 FPS, H.264 + AAC (layout vertical disesuaikan)
- `out/thumbnail.png` — thumbnail (jika berhasil di-render)
- Source code: seluruh folder project
- Dokumentasi: `README.md`, `VOICE_OVER_SCRIPT.md`, `AUDIO_TIMING.md`, `ASSET_DOCUMENTATION.md`

## 7. Kepatuhan & Catatan
- Informasi server ditampilkan akurat: IP `play.xiosmp.my.id`, Port `2005`, Java + Bedrock.
- Tidak ada musik berhak cipta yang diambil secara ilegal; placeholder BGM/SFX adalah hasil sintetis original.
- Status VO dilaporkan transparan; siapkan rekaman laki-laki untuk hasil final sesuai brief.
