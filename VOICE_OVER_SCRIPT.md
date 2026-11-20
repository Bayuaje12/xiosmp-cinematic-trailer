# XIOSMP Trailer - Voice Over Script (Male Indonesian)

Karakter suara target:
- Laki-laki dewasa
- Deep, tegas, berwibawa, natural, energik
- Cinematic announcer
- Pengucapan Bahasa Indonesia jelas
- Bukan suara robot, bukan suara perempuan

Status saat ini: **file audio VO laki-laki (Bahasa Indonesia) telah dibuat** menggunakan TTS `edge-tts` dengan suara **id-ID-ArdiNeural** (Male), penyesuaian cinematic (`--rate=-8% --pitch=-10Hz`), dan disimpan di `public/audio/vo/scene1.mp3`–`scene7.mp3`. File ini juga sudah dicampurkan ke `XIOSMP_Landscape.mp4` di folder Download. Untuk kualitas announcer manusia yang lebih natural/berwibawa, Anda dapat mengganti file-file tersebut dengan rekaman suara laki-laki asli (nama file & timestamp tetap).

## Naskah dan Timestamp

Durasi video: 60 detik, 30 FPS (total 1800 frame)

| Scene | Waktu (s) | Frame (mulai–selesai) | Teks Voice Over |
|---|---:|---:|---|
| 01 - Dark Awakening | 0.5 – 6.5 | 15 – 195 | "Di sebuah dunia, setiap petualangan memiliki awal..." |
| 02 - Logo Reveal | 7.3 – 11.5 | 219 – 345 | "Selamat datang di... XIOSMP!" |
| 03 - Economy Experience | 14.5 – 26.0 | 435 – 780 | "Rasakan pengalaman Economy Survival Multiplayer. Kumpulkan sumber daya, kembangkan kekayaan, dan bangun kerajaan impianmu." |
| 04 - Adventure and Community | 27.5 – 37.0 | 825 – 1110 | "Jelajahi dunia yang luas, ciptakan cerita, dan nikmati petualangan bersama pemain lainnya." |
| 05 - Java + Bedrock | 38.3 – 45.2 | 1149 – 1356 | "Mainkan bersama Java maupun Bedrock. Satu server, lebih banyak petualangan." |
| 06 - Server Reveal | 46.3 – 53.5 | 1389 – 1605 | "Jangan tunggu lebih lama. Bergabunglah sekarang di XIOSMP!" |
| 07 - Final Logo | 55.3 – 59.5 | 1659 – 1785 | "XIOSMP... dunia, ekonomi, dan kerajaanmu dimulai di sini!" |

## Cara memasukkan rekaman VO

1. Rekam audio laki-laki sesuai naskah di atas (disarankan WAV/MP3 mono atau stereo, 48 kHz).
2. Simpan file per-scene ke folder `public/audio/vo/` dengan nama:
   - `scene1.mp3`
   - `scene2.mp3`
   - `scene3.mp3`
   - `scene4.mp3`
   - `scene5.mp3`
   - `scene6.mp3`
   - `scene7.mp3`
3. Alternatif: satu file penuh `public/audio/vo/full.mp3` (mulai dari 0s, selaraskan manual dengan timestamp).
4. `AudioManager`/`VoiceOverManager` akan otomatis memuat file yang tersedia saat render.

## Catatan mixing

- VO target level: paling jelas di mix (sekitar -6 dBFS puncak, hindari clipping)
- Musik latar: dukung suasana, ducking ringan saat VO aktif
- SFX: aksen transisi/impact, tidak menutupi narasi
- Fade-in/out musik: 1.5s awal dan 2s akhir
