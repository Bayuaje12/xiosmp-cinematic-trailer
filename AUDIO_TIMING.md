# XIOSMP Trailer - Audio Timing & Mix Plan

Durasi: 60s | FPS: 30 | Output audio: AAC stereo 48 kHz (target)

## Musik latar (BGM)

Gaya: Epic cinematic orchestral, fantasy adventure, medieval atmosphere, powerful build-up, emotional ending.
Lisensi: **placeholder original/synthesized** yang dibuat via FFmpeg (bebas royalti, buatan project) karena aset musik sinematik berlisensi tidak disertakan di lingkungan ini. Ganti `public/audio/bgm/main.wav` dengan musik sinematik berlisensi/royalty-free pilihan Anda untuk hasil final produksi.

Struktur:
- 0.0–7.0s (Intro): atmosferik/misterius, drone rendah + pad lembut, volume naik perlahan
- 7.0–14.0s (Logo reveal): impact + swell
- 14.0–38.0s (Middle): lebih energik/megah, ritme & harmoni bertambah
- 38.0–46.0s (Edition reveal): transisi dramatis
- 46.0–55.0s (Server reveal): dramatic impact, energi tinggi
- 55.0–60.0s (Ending): epic cinematic finish, resolve & fade out 2s

Level target:
- BGM base: ~ -18 dBFS (duck ke ~ -24 dBFS saat VO aktif)
- Fade in: 0–1.5s, Fade out: 58–60s

## Sound Effects (SFX)

| Waktu (s) | Cue | File (placeholder) | Catatan |
|---:|---|---|---|
| 0.2 | Ambient wind bed start | `sfx/ambient_wind.wav` | Halus, sepanjang intro |
| 0.5 | Subtle riser | `sfx/riser_intro.wav` | Membangun misteri |
| 7.0 | Whoosh + deep bass impact | `sfx/whoosh_impact_logo.wav` | Logo reveal masuk |
| 7.3 | Logo reveal impact hit | `sfx/impact_logo.wav` | Sinkron dengan kemunculan logo |
| 7.5 | Magical sparkle/particles | `sfx/sparkle.wav` | Emerald & golden particles |
| 13.8 | Transition sweep | `sfx/transition_sweep.wav` | Scene 2 -> 3 |
| 26.8 | Transition sweep | `sfx/transition_sweep.wav` | Scene 3 -> 4 |
| 37.8 | Transition sweep | `sfx/transition_sweep.wav` | Scene 4 -> 5 |
| 38.0 | Dramatic riser | `sfx/riser_mid.wav` | Menuju split reveal |
| 45.8 | Transition sweep | `sfx/transition_sweep.wav` | Scene 5 -> 6 |
| 46.0 | Deep bass impact | `sfx/impact_server.wav` | Server reveal |
| 54.8 | Transition sweep | `sfx/transition_sweep.wav` | Scene 6 -> 7 |
| 55.0 | Final cinematic hit | `sfx/final_hit.wav` | Penutup epik |
| 59.5 | Tail reverb/fade | (bagian dari final hit/BGM) | Natural release |

## Voice Over

Lihat `VOICE_OVER_SCRIPT.md` untuk naskah, timestamp, dan status. VO ditempatkan sesuai timestamp scene (prioritas audio paling jelas). Saat file VO ditambahkan, aktifkan ducking BGM otomatis di segmen VO.

## Catatan teknis

- Sample rate: 48 kHz
- Format render audio: AAC stereo (via Remotion/ffmpeg)
- Hindari clipping: limiter/normalisasi peak <= -1 dBFS
- Semua cue SFX disinkronkan ke frame event animasi (deterministik, 30 FPS)
