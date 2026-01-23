-- Seed data for Mizaj Results
INSERT INTO mizaj_results (id, mizaj_type, title, description, characteristics, dietary_recommendations, lifestyle_recommendations) VALUES
('1', 'panas_lembab', 'Panas Lembab (Damawi/Sanguinis)', 
 'Anda memiliki kecenderungan tubuh yang hangat dan lembab. Tipe ini dikenal energik, sosial, mudah bergaul, namun perlu menjaga keseimbangan cairan tubuh agar tidak berlebihan.',
 'Fisik: Tubuh cenderung berisi, otot kuat, kulit hangat dan kemerahan, denyut nadi kuat. Mental: Optimis, periang, percaya diri, namun mudah bosan dan emosional sesaat.',
 'Dianjurkan (Pendingin & Pengering): Sayuran hijau segar (bayam, selada), buah-buahan asam-manis (jeruk, apel), kacang-kacangan, daging putih (ayam kampung, ikan). Hindari (Pemanas & Pelembab): Makanan terlalu manis, berlemak santan, daging merah berlebih, gorengan, dan buah-buahan yang terlalu matang/manis.',
 'Lakukan olahraga rutin namun tidak terlalu berat (seperti berenang atau jogging ringan). Lakukan bekam (hijamah) secara berkala jika kondisi fisik memungkinkan untuk membuang kelebihan darah.');

INSERT INTO mizaj_results (id, mizaj_type, title, description, characteristics, dietary_recommendations, lifestyle_recommendations) VALUES
('2', 'dingin_lembab', 'Dingin Lembab (Balghami/Phlegmatis)',
 'Karakter phlegmatis yang tenang, sabar, dan santai. Cenderung memiliki kulit pucat dan metabolisme lambat.',
 'Fisik: Tubuh cenderung gemuk, kulit halus dan dingin, metabolisme lambat. Mental: Tenang, sabar, penyabar, namun cenderung malas dan kurang inisiatif.',
 'Dianjurkan (Pemanas & Pengering): Rempah-rempah hangat (jahe, lada), sayuran seperti bawang putih, wortel, protein rendah lemak. Hindari: Makanan dingin, terlalu basah, produk susu berlebihan.',
 'Aktivitas fisik yang lebih intens untuk meningkatkan metabolisme. Hindari tidur berlebihan dan jaga kehangatan tubuh.');

INSERT INTO mizaj_results (id, mizaj_type, title, description, characteristics, dietary_recommendations, lifestyle_recommendations) VALUES
('3', 'panas_kering', 'Panas Kering (Shafrawi/Koleris)',
 'Karakter koleris yang tegas, pemimpin, dan berambisi. Cenderung memiliki tubuh kurus berotot dan aktif.',
 'Fisik: Tubuh kurus berotot, kulit hangat dan kering, sering haus. Mental: Tegas, ambisius, sering marah, namun cepat bertindak dan produktif.',
 'Dianjurkan (Pendingin & Pelembab): Buah-buahan segar berair (semangka, mentimun), sayuran hijau, yogurt, makanan yang melembabkan. Hindari: Makanan pedas, terlalu panas, kopi berlebihan.',
 'Hindari stres berlebihan, lakukan meditasi atau yoga. Istirahat yang cukup dan jaga hidrasi tubuh.');

INSERT INTO mizaj_results (id, mizaj_type, title, description, characteristics, dietary_recommendations, lifestyle_recommendations) VALUES
('4', 'dingin_kering', 'Dingin Kering (Saudawi/Melankolis)',
 'Karakter melankolis yang pemikir, analitis, dan detail. Cenderung introspektif dan menyukai kesendirian.',
 'Fisik: Tubuh kurus, kulit kering dan dingin, mudah lelah. Mental: Analitis, perfeksionis, pemikir mendalam, namun cenderung cemas dan pesimis.',
 'Dianjurkan (Pemanas & Pelembab): Makanan hangat dan bernutrisi, rempah, kaldu hangat, buah-buahan manis. Hindari: Makanan kering, terlalu dingin, kafein berlebihan.',
 'Jaga kehangatan tubuh, olahraga ringan teratur, dan cukup istirahat. Kelola stres dengan baik.');

-- Seed admin (email: admin@mizaj.com, password: admin123)
INSERT INTO admins (id, email, password_hash, name) VALUES
('admin-1', 'admin@mizaj.com', '$2a$10$rF5vZ1qX8kH9oK7pQ3mN5eYxJzV6wX4bN2cP8qW.LmE9sT7uV1wXy', 'Administrator');
