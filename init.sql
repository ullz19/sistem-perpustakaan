CREATE TABLE buku (
  id SERIAL PRIMARY KEY,
  judul TEXT,
  penulis TEXT,
  status TEXT
);

INSERT INTO buku (judul, penulis, status) VALUES
  ('Pengantar Cloud Computing', 'Penulis Contoh', 'Tersedia'),
  ('Dasar-Dasar Docker untuk Pemula', 'Penulis Contoh', 'Dipinjam'),
  ('Jaringan Komputer', 'Penulis Contoh', 'Tersedia');
