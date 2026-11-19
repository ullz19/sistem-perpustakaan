const http = require('http');

const port = 3000;

// Data contoh saja — bukan data perpustakaan yang sebenarnya.
const buku = [
  { judul: 'Pengantar Cloud Computing', penulis: 'Penulis Contoh', status: 'Tersedia' },
  { judul: 'Dasar-Dasar Docker untuk Pemula', penulis: 'Penulis Contoh', status: 'Dipinjam' },
  { judul: 'Jaringan Komputer', penulis: 'Penulis Contoh', status: 'Tersedia' },
];

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', app: 'modul-web', version: '1.0.0' }));
    return;
  }
  const baris = buku.map((b) => `<tr><td>${b.judul}</td><td>${b.penulis}</td><td>${b.status}</td></tr>`).join('\n');
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<!DOCTYPE html>
<html lang="id">
<head><meta charset="utf-8"><title>Katalog Buku — Perpustakaan</title></head>
<body>
<h1>Katalog Buku Perpustakaan</h1>
<p>Semua data di bawah ini hanya contoh saja, bukan data perpustakaan yang sebenarnya.</p>
<table>
<tr><th>Judul</th><th>Penulis</th><th>Status</th></tr>
${baris}
</table>
<p>Image: modul-web:1.0 — Node.js 20-alpine — Port container: 3000.</p>
</body>
</html>`);
});

server.listen(port, () => {
  console.log(`modul-web berjalan di port ${port}`);
});
