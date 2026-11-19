# Tutorial: Membuka Sistem Perpustakaan di Localhost, dari Nol (Selaras Modul)

Aplikasi katalog buku perpustakaan sekolah untuk Modul Pembelajaran Cloud
Computing dengan Docker (PjBL, Kelompok 6). Kode `server.js` dan `init.sql`
di folder ini sama persis dengan yang tertulis di Bab VII modul. Dockerfile
sama persis dengan contoh di brief. Semua data buku hanya contoh.

Isi folder:

- `server.js` — aplikasi Node.js (modul bawaan `http`, tanpa dependensi).
  Halaman katalog di `/`, jawaban JSON di `/health`. Port 3000.
- `package.json` + `package-lock.json` — identitas aplikasi (`modul-web`,
  versi 1.0.0).
- `Dockerfile` — sama persis dengan contoh brief, image `modul-web:1.0`.
- `docker-compose.yml` — layanan `web` (modul-web:1.0, port 8080:3000)
  dan `db` (postgres:16-alpine, volume `db-data`, healthcheck, `web`
  menunggu `db` siap).
- `init.sql` — perintah SQL pembuat tabel `buku` beserta tiga buku contoh,
  sama persis dengan Bab VII modul.
- `README.md` — tutorial ini.

## Cara membaca tutorial ini

- Tutorial ini mengikuti modul: Bab III (instalasi dan verifikasi), Bab IV
  (build dan run), Bab VI dan Bab VII (Compose), serta Job Sheet 1 dan 3.
  Perintah dan hasil yang diharapkan diambil dari modul. Langkah yang
  TIDAK ada di modul ditandai [DI LUAR MODUL].
- Perintah yang harus diketik ditulis di dalam kotak kode. Ketik persis
  seperti itu, termasuk titik, tanda hubung, dan spasi. Setelah mengetik,
  tekan Enter.
- "Terminal" adalah jendela tempat mengetik perintah. Di Windows, terminal
  yang dipakai di sini bernama PowerShell.
- "Contoh tampilan" berarti kira-kira seperti itu tampilannya di layar.
  Angka versi, ID, dan ukuran bisa berbeda di laptopmu — itu normal. Yang
  penting adalah kata-kata kuncinya sama.
- **localhost** berarti "komputer ini sendiri". Alamat
  `http://localhost:8080` berarti "buka aplikasi yang sedang jalan di
  laptop ini, di port 8080". Membuka localhost tidak perlu internet;
  internet hanya perlu saat mengunduh Docker, Node.js, dan image pertama
  kali.
- Kerjakan tahap demi tahap, berurutan. Jangan loncat ke Tahap 4 sebelum
  Tahap 2 berhasil. Setiap tahap diakhiri "Tanda tahap ini berhasil" —
  pastikan tandanya muncul sebelum lanjut.

## Tahap 1 — Pasang Docker (Bab III E, Windows)

Tahap ini paling lama karena mengunduh dan memasang. Sekali pasang, tidak
perlu diulang.

Syarat menurut modul: Windows 10/11 64-bit, WSL 2.1.5+, prosesor 64-bit
dengan SLAT, RAM 8 GB, dan virtualisasi yang aktif di BIOS/UEFI.

Langkah 1.1 — Buka PowerShell sebagai Administrator. Caranya: klik kanan
tombol Start (ikon Windows di kiri bawah layar), lalu pilih "Terminal
(Admin)" atau "Windows PowerShell (Admin)". Kalau muncul pertanyaan izin
("Do you want to allow...?"), klik Yes. Jendela PowerShell terbuka dengan
judul yang mengandung kata "Administrator".

Langkah 1.2 — Aktifkan WSL 2. Ketik perintah ini di PowerShell
Administrator itu, lalu tekan Enter:

```
wsl --install
```

Tunggu sampai prosesnya selesai. Layar akan menampilkan proses pengunduhan
dan pemasangan. Kalau PowerShell meminta restart, restart laptop, lalu
buka lagi PowerShell (Administrator) seperti Langkah 1.1.

Langkah 1.3 — Periksa WSL 2. Ketik perintah ini, lalu tekan Enter:

```
wsl --version
```

Contoh tampilan (angka versinya bisa berbeda):

```
WSL version: 2.5.10.0
Kernel version: 6.6.87.1-1
```

Kalau tampil nomor versi seperti di atas, WSL 2 sudah aktif.

Langkah 1.4 — Unduh Docker Desktop. Buka peramban (Chrome/Edge), klik
kolom alamat, ketik alamat ini, tekan Enter:

```
https://www.docker.com/products/docker-desktop
```

Di halaman itu, klik tombol unduh untuk Windows ("Download for Windows").
Tunggu sampai berkasnya selesai terunduh.

Langkah 1.5 — Pasang Docker Desktop. Buka berkas installer yang baru
terunduh (klik dua kali). Saat pemasangan, akan ada pilihan
"Use WSL 2 instead of Hyper-V" — pastikan pilihan itu TERCENTANG, lalu
klik OK/Install. Tunggu sampai pemasangan selesai, lalu klik Close/Finish.
Kalau diminta restart, restart laptop.

Langkah 1.6 — Jalankan Docker Desktop. Klik ikon Docker di desktop atau
taskbar, atau klik Start lalu ketik "Docker Desktop" dan buka. Tunggu
sampai tertulis "Running" di kiri bawah jendela Docker Desktop dan ikon
pausnya tidak lagi berputar. Proses ini bisa memakan waktu satu-dua menit
pada pertama kali. JANGAN lanjut ke Tahap 2 sebelum tertulis "Running".

Tanda tahap ini berhasil: Docker Desktop terbuka dan tertulis "Running".

## Tahap 2 — Periksa instalasi (Bab III F–H, Job Sheet 1)

Langkah 2.1 — Buka terminal biasa (tidak harus Administrator). Caranya:
klik Start, ketik "PowerShell", lalu buka "Windows PowerShell" yang
muncul. Jendela terminal terbuka.

Langkah 2.2 — Periksa versi Docker. Ketik perintah ini, lalu tekan Enter:

```
docker version
```

Contoh tampilan (angka versinya bisa berbeda):

```
Client:
 Version:           27.4.0
 ...
Server: Docker Desktop
 Engine:
  Version:          27.4.0
 ...
```

Hasil yang diharapkan menurut modul: versi client DAN daemon tampil di
layar. Kalau hanya bagian Client yang muncul dan bagian Server tidak ada,
artinya daemon belum berjalan. Solusinya: buka Docker Desktop, tunggu
sampai "Running", lalu ulangi perintah ini.

Catat versi Docker itu di lembar kerja (modul menulisnya
[VERSI DOCKER PEMBACA, contoh: 24.0.7]).

Langkah 2.3 — Periksa versi singkat (Job Sheet 1, langkah 2). Ketik:

```
docker --version
```

Contoh tampilan (angka versinya bisa berbeda):

```
Docker version 27.4.0, build 1234567
```

Catat keluarannya apa adanya.

Langkah 2.4 — Jalankan container pertama. Ketik:

```
docker run hello-world
```

Contoh tampilan (bagian awalnya):

```
Hello from Docker!
This message shows that your installation appears to be working correctly.
```

Hasil yang diharapkan menurut modul: Docker mengunduh image hello-world
jika belum ada (perlu internet), container berjalan, menampilkan
"Hello from Docker!", dan berhenti sendiri. Berhenti sendiri itu NORMAL,
bukan rusak. Jika pesan "Hello from Docker!" tampil, instalasi berhasil.
Simpan tangkapan layar pesan itu sebagai bukti.

Langkah 2.5 — Periksa daftar container dan image. Ketik tiga perintah ini
satu per satu, dan catat hasilnya:

```
docker ps
docker ps -a
docker images
```

Hasil yang diharapkan:

- `docker ps` menampilkan daftar kosong. Ini normal, karena hello-world
  sudah berhenti sendiri dan `docker ps` hanya menampilkan container yang
  sedang berjalan.
- `docker ps -a` menampilkan hello-world, karena perintah ini menampilkan
  semua container, termasuk yang sudah berhenti.
- `docker images` menampilkan hello-world di daftar image.

Jika muncul pesan galat di tahap ini, catat pesan itu apa adanya. Lalu
periksa tiga hal: Docker Desktop (sudah "Running"?), internet, dan ketikan
perintah (sudah persis?). Jika `docker run hello-world` gagal mengunduh
image, periksa koneksi internet, lalu coba lagi.

Tanda tahap ini berhasil: pesan "Hello from Docker!" tampil di Langkah
2.4.

## Tahap 3 — Siapkan folder dan uji tanpa Docker, opsional (Bab IV I)

Langkah 3.1 — Siapkan folder. Unduh berkas `sistem-perpustakaan.zip`,
lalu ekstrak: klik kanan berkas zip itu, pilih "Extract All...", lalu klik
"Extract". Hasilnya adalah folder bernama `sistem-perpustakaan`.

Langkah 3.2 — Buka terminal DI DALAM folder itu.

[DI LUAR MODUL] Modul hanya menulis "buka folder itu di terminal" tanpa
merinci caranya. Cara praktis di Windows: buka folder
`sistem-perpustakaan` di File Explorer, klik kolom alamat di bagian atas
jendela (tempat tertulis nama folder), hapus isinya, ketik `powershell`,
lalu tekan Enter. Jendela PowerShell terbuka, dan baris perintahnya
menunjukkan folder itu. Cara lain: klik kanan di ruang kosong di dalam
folder, lalu pilih "Open in Terminal".

Langkah 3.3 — Periksa isi folder. Di terminal yang baru terbuka itu,
ketik:

```
dir
```

Hasil yang diharapkan: terlihat `Dockerfile`, `server.js`,
`package.json`, `docker-compose.yml`, `init.sql`, dan `README.md`. Kalau
berkas-berkas itu tidak terlihat, terminalmu berada di folder yang salah
— ulangi Langkah 3.2.

Langkah 3.4 — (Opsional) Jalankan aplikasi tanpa Docker. Ketik dua
perintah ini satu per satu:

```
npm install
npm start
```

Tunggu sampai tampil baris:

```
modul-web berjalan di port 3000
```

JANGAN tutup terminal ini selama aplikasi berjalan — menutupnya mematikan
aplikasi.

Catatan: modul tidak menulis cara memasang Node.js. Langkah ini butuh
Node.js terpasang di laptop. [DI LUAR MODUL] Jika perintah `npm` tidak
dikenali (pesan galat bahwa `npm` bukan perintah), Node.js belum
terpasang. Pasang dulu Node.js LTS dari nodejs.org, tutup SEMUA terminal,
buka lagi terminal di dalam folder seperti Langkah 3.2, lalu ulangi
Langkah 3.4.

Langkah 3.5 — Buka aplikasi di peramban. Buka peramban (Chrome/Edge),
klik kolom alamat, hapus isinya, ketik persis alamat ini (pakai `http`,
bukan `https`), lalu tekan Enter:

```
http://localhost:3000
```

Hasil yang diharapkan: halaman "Katalog Buku Perpustakaan" tampil dengan
tiga buku contoh. Coba juga alamat ini:

```
http://localhost:3000/health
```

Hasil yang diharapkan: tampil jawaban JSON persis seperti ini:

```
{"status":"ok","app":"modul-web","version":"1.0.0"}
```

Perbedaan dengan Bab IV modul: Bab IV menulis halaman "Halo dari Docker!"
karena contohnya repo awal. Untuk sistem perpustakaan (Bab VII), yang
tampil adalah halaman katalog tiga buku.

Langkah 3.6 — Hentikan aplikasi. Klik jendela terminalnya, lalu tekan
tombol `Ctrl+C`. Baris perintah muncul lagi, artinya aplikasi sudah
berhenti.

Tanda tahap ini berhasil: katalog tiga buku tampil di
`http://localhost:3000` dan JSON tampil di `/health`. (Tahap ini opsional;
kalau dilewati, langsung ke Tahap 4.)

## Tahap 4 — Bangun image dan jalankan container (Bab IV E–H, Job Sheet 3)

Langkah 4.1 — Pastikan terminal masih berada di dalam folder
`sistem-perpustakaan`. Kalau terminal sudah tertutup, buka lagi seperti
Langkah 3.2, lalu periksa lagi dengan `dir` seperti Langkah 3.3.

Langkah 4.2 — Bangun image. Ketik perintah ini, lalu tekan Enter:

```
docker build -t modul-web:1.0 .
```

Perhatikan tiga hal:

- Titik (`.`) di akhir perintah WAJIB ada. Artinya: "pakai folder ini
  sebagai tempat build". Tanpa titik, build gagal.
- Jangan memakai tag `latest`. Tag-nya harus `1.0`.
- Build pertama perlu internet untuk mengunduh image dasar
  `node:20-alpine`, dan bisa memakan waktu beberapa menit. Tunggu sampai
  selesai, jangan tutup terminal.

Hasil yang diharapkan menurut modul: layar menampilkan tiap langkah build
(FROM, WORKDIR, COPY, RUN, dan seterusnya). Di akhir tampil nama image
`modul-web:1.0` dan pesan build selesai. Langkah yang tidak berubah
menampilkan `CACHED`.

Langkah 4.3 — Periksa image yang terbentuk. Ketik:

```
docker images
```

Contoh tampilan (ID dan ukuran bisa berbeda):

```
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
modul-web     1.0       a1b2c3d4e5f6   2 minutes ago   135MB
hello-world   latest    8d25c3a6e0d9   2 weeks ago     18.5kB
```

Hasil yang diharapkan: baris `modul-web` dengan tag `1.0` tampil.
Perhatikan kolom REPOSITORY, TAG, dan SIZE, lalu catat ukurannya di lembar
kerja.

Langkah 4.4 — Jalankan container. Ketik:

```
docker run -d --name web -p 8080:3000 modul-web:1.0
```

Arti tiap bagian (menurut modul):

- `-d`: jalankan container di belakang layar agar terminal bisa dipakai
  lagi.
- `--name web`: beri nama `web` pada container. Tanpa nama, Docker memberi
  nama acak.
- `-p 8080:3000`: hubungkan port 8080 di laptop ke port 3000 di container.
  Karena itu alamatnya nanti memakai 8080, bukan 3000.

Hasil yang diharapkan: layar menampilkan satu baris kode panjang (ID
container), misalnya:

```
9f8e7d6c5b4a1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5
```

Satu baris kode itu cukup — tidak ada pesan lain yang perlu ditunggu.

Langkah 4.5 — Periksa container yang berjalan. Ketik:

```
docker ps
```

Contoh tampilan (ID dan waktu bisa berbeda):

```
CONTAINER ID   IMAGE           COMMAND            STATUS         PORTS                    NAMES
9f8e7d6c5b4a   modul-web:1.0   "node server.js"   Up 2 minutes   0.0.0.0:8080->3000/tcp   web
```

Hasil yang diharapkan: baris `web` tampil, image `modul-web:1.0`, status
`Up`, dan port `0.0.0.0:8080->3000/tcp`.

Langkah 4.6 — Periksa log container. Ketik:

```
docker logs web
```

Hasil yang diharapkan: tampil baris ini:

```
modul-web berjalan di port 3000
```

Jika baris itu tidak ada, baca log dari bawah ke atas untuk mencari pesan
galatnya.

Langkah 4.7 — Buka aplikasi di peramban. Klik kolom alamat peramban,
ketik persis alamat ini, tekan Enter:

```
http://localhost:8080
```

Hasil yang diharapkan: halaman "Katalog Buku Perpustakaan" tampil dengan
tiga buku contoh. Perhatikan portnya: **8080**, bukan 3000. Port 3000
hanya dipakai di Tahap 3 (tanpa Docker).

Periksa juga alamat ini:

```
http://localhost:8080/health
```

Hasil yang diharapkan: tampil JSON
`{"status":"ok","app":"modul-web","version":"1.0.0"}`. Simpan tangkapan
layar halaman katalog sebagai bukti.

Langkah 4.8 — Hentikan dan hapus container. Urutan yang benar menurut
modul: stop dulu, baru remove. Ketik dua perintah ini satu per satu:

```
docker stop web
docker rm web
```

Hasil yang diharapkan: setelah `docker stop web`, perintah `docker ps`
tidak lagi menampilkan `web`. Setelah `docker rm web`, perintah
`docker ps -a` juga tidak lagi menampilkannya. Image `modul-web:1.0`
masih ada — menghapus container tidak menghapus image. Periksa dengan
`docker images` kalau ragu.

Langkah 4.9 — (Opsional, Job Sheet 3 langkah 9) Ulangi build tanpa
mengubah berkas apa pun:

```
docker build -t modul-web:1.0 .
```

Hasil yang diharapkan: build kedua lebih cepat dari build pertama, karena
layer yang tidak berubah dipakai ulang dan menampilkan `CACHED`.

Tanda tahap ini berhasil: katalog tiga buku tampil di
`http://localhost:8080` dan JSON tampil di `/health`.

## Tahap 5 — Web + basis data dengan Compose (Bab VI, Bab VII F–G)

Langkah 5.1 — Jalankan semua layanan. Pastikan terminal berada di dalam
folder `sistem-perpustakaan` (lihat Langkah 4.1), lalu ketik:

```
docker compose up -d
```

Hasil yang diharapkan menurut modul: dua container berjalan di latar
belakang. Layar menampilkan container `db` dan `web` dibuat dan
dijalankan.

Langkah 5.2 — Periksa status layanan. Ketik:

```
docker compose ps
```

Contoh tampilan (nama dan waktu bisa berbeda):

```
NAME   IMAGE               COMMAND                  SERVICE   STATUS              PORTS
db     postgres:16-alpine  "docker-entrypoint.s…"   db        Up (healthy)        0.0.0.0:5432->5432/tcp
web    modul-web:1.0       "node server.js"         web       Up                  0.0.0.0:8080->3000/tcp
```

Hasil yang diharapkan: layanan `web` dan `db` berstatus berjalan (Up),
dan `db` yang sehat menampilkan `(healthy)`. Kalau `(healthy)` belum
muncul, tunggu beberapa detik, lalu ulangi perintah ini.

Langkah 5.3 — Periksa log aplikasi. Ketik:

```
docker compose logs web
```

Hasil yang diharapkan: log menampilkan `modul-web berjalan di port 3000`.
Jika ada pesan galat, cocokkan dengan Job Sheet 3 (lihat bagian "Kalau
gagal" di bawah).

Langkah 5.4 — Buka aplikasi di peramban. Buka `http://localhost:8080`
(halaman katalog tampil dengan tiga buku contoh), lalu
`http://localhost:8080/health` (jawaban JSON tampil).

Langkah 5.5 — [DI LUAR MODUL] Bentuk tabel `buku` di basis data. Modul
hanya menampilkan SQL tabel `buku` untuk dibaca dan dipahami; modul tidak
menulis perintah untuk menjalankannya. Agar tabel `buku` benar-benar
terbentuk di basis data untuk simulasi ini, jalankan perintah ini SEKALI
saja:

```
Get-Content init.sql | docker compose exec -T db psql -U modul -d modul_db
```

Perintah ini memakai Get-Content karena PowerShell tidak mendukung tanda < (tanda < di PowerShell memicu galat "reserved for future use"). Hasil yang diharapkan: tampil CREATE TABLE dan INSERT 0 3.

Lalu periksa isinya dengan perintah ini:

```
docker compose exec db psql -U modul -d modul_db -c "SELECT * FROM buku;"
```

Contoh tampilan (lebar kolom bisa berbeda):

```
 id |             judul              |    penulis     |  status
----+--------------------------------+----------------+----------
  1 | Pengantar Cloud Computing      | Penulis Contoh | Tersedia
  2 | Dasar-Dasar Docker untuk Pemula| Penulis Contoh | Dipinjam
  3 | Jaringan Komputer              | Penulis Contoh | Tersedia
(3 rows)
```

Hasil yang diharapkan: tiga baris buku tampil. Katalog di halaman web
menampilkan data contoh dari kode aplikasi, sedangkan basis data menyimpan
data buku yang sama. Menghubungkan kode aplikasi ke basis data tidak
termasuk dalam modul ini.

Langkah 5.6 — Uji retensi data (bukti volume bekerja). Ketik:

```
docker compose down
```

Perintah ini menghentikan container dan menghapusnya, tetapi volume
`db-data` tetap ada. Lalu jalankan lagi:

```
docker compose up -d
```

Buka lagi `http://localhost:8080`. Hasil yang diharapkan: semuanya tampil
seperti semula. Jangan memakai `down -v` untuk data yang belum
dicadangkan, karena `-v` menghapus volume beserta datanya.

Langkah 5.7 — Untuk berhenti, ketik:

```
docker compose down
```

Tanda tahap ini berhasil: katalog tampil di `http://localhost:8080`,
`docker compose ps` menampilkan `web` dan `db` berstatus Up, dan setelah
uji retensi (Langkah 5.6) semuanya tampil seperti semula.

## Kalau gagal (pemecahan masalah dari modul)

Aturan modul: catat pesan galat apa adanya SEBELUM mencoba memperbaikinya.
Jangan menebak-nebak penyebabnya.

- **Hanya Client yang tampil di `docker version`** (Bab III F): daemon
  belum berjalan. Buka Docker Desktop, tunggu sampai "Running", lalu
  ulangi perintahnya.
- **`docker run hello-world` gagal mengunduh image** (Job Sheet 1):
  periksa koneksi internet, lalu coba lagi. Jika memakai proxy sekolah,
  tanyakan ke Teknisi Docker / guru.
- **Build gagal** (Bab IV E): baca pesan galat dari bawah ke atas, lalu
  periksa tiga hal: (1) apakah terminal berada di folder yang berisi
  Dockerfile?; (2) apakah titik (`.`) di akhir perintah ditulis?;
  (3) apakah isi Dockerfile persis seperti di Bab IV bagian D?
- **Port sudah dipakai** (Bab IV H, misalnya pesan
  `port is already allocated`): port 8080 dipakai aplikasi atau container
  lain. Solusi: hentikan pemakai port itu, atau pakai port lain (misalnya
  `-p 8081:3000`, lalu buka `http://localhost:8081`). Jika port 5432 sudah
  dipakai PostgreSQL lain di laptop, matikan dulu PostgreSQL itu sebelum
  `docker compose up`.
- **Image tidak ditemukan** (Bab IV H, misalnya pesan
  `Unable to find image 'modul-web:1.0' locally`): `docker run` dijalankan
  sebelum `docker build`. Solusi: bangun dulu image-nya (Langkah 4.2),
  lalu jalankan lagi.
- **Container sudah ada dengan nama yang sama** (Bab IV H, misalnya pesan
  `The container name "/web" is already in use`): container `web` dari
  latihan sebelumnya belum dihapus. Solusi: `docker stop web`, lalu
  `docker rm web`, atau jalankan container baru dengan nama lain.
- **`http://localhost:8080` tidak menampilkan apa-apa** (Job Sheet 3):
  periksa `docker ps` (apakah `web` berstatus Up?) dan `docker logs web`
  (apakah ada pesan galat?); periksa juga apakah port di `server.js`
  benar 3000.
- **Galat tidak ada di daftar ini**: catat pesan galat dan perintahnya
  apa adanya. Lalu tanyakan kepada teman sekelompok atau guru.

## Catatan keamanan

Nilai `POSTGRES_PASSWORD` di `docker-compose.yml` hanya contoh untuk
latihan. Jangan pakai kata sandi, token, atau kunci akses asli di
repositori maupun di berkas Compose.
