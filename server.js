const express = require('express');
const mongoose = require('mongoose'); // Veritabanı paketimiz
const app = express();

app.use(express.json());

// Veritabanı Bağlantısı
const mongoDB_Link = "mongodb+srv://erensoguktas8_db_user:CADzv8TasRAc0KK3@cluster0.1sw8nc3.mongodb.net/?appName=Cluster0";

mongoose.connect(mongoDB_Link)
  .then(() => console.log("Harika! Veritabanına başarıyla bağlanıldı! 🚀"))
  .catch((err) => console.log("Veritabanı bağlantı hatası:", err));

// stajyerlerin nasıl görünceği
const stajyerSchema = new mongoose.Schema({
  isim: String,
  meslek: String,
  departman: String
});

// Modeli oluşturdum
const Stajyer = mongoose.model('Stajyer', stajyerSchema);



// Tüm stajyerleri getir
app.get('/api/stajyerler', async (req, res) => {
  const veritabanindakiStajyerler = await Stajyer.find();
  
  // id formatı ie bağdaştırma
  // (MongoDB otomatik olarak '_id' ismiyle ID oluşturur)
  const formatliVeriler = veritabanindakiStajyerler.map(s => ({
    id: s._id,
    isim: s.isim,
    meslek: s.meslek,
    departman: s.departman
  }));
  
  res.json(formatliVeriler);
});

// Yeni stajyer eklemek için
app.post('/api/stajyerler', async (req, res) => {
  const yeniStajyer = new Stajyer({
    isim: req.body.isim,
    meslek: req.body.meslek,
    departman: req.body.departman
  });
  
  await yeniStajyer.save(); // Veritabanına kaydet
  res.status(201).send("Stajyer başarıyla buluta kaydedildi!");
});

// Stajyer sil
app.delete('/api/stajyerler/:id', async (req, res) => {
  await Stajyer.findByIdAndDelete(req.params.id); // ID'ye göre bul ve sil
  res.send("Stajyer silindi.");
});

app.listen(3000, () => {
  console.log("Arka uç sunucusu çalışıyor: http://localhost:3000");
});