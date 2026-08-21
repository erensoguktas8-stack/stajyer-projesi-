import { useState, useEffect } from 'react';
import './App.css'; 

function App() {
  
  const [stajyerler, setStajyerler] = useState([]);
  const [isim, setIsim] = useState('');
  const [meslek, setMeslek] = useState('');
  const [departman, setDepartman] = useState('Yazılım');

  
  const stajyerleriGetir = async () => {
    const response = await fetch('/api/stajyerler');
    if (response.ok) {
      const data = await response.json();
      setStajyerler(data);
    }
  };

  useEffect(() => {
    stajyerleriGetir();
  }, []);

  // Yeni Kayıt Ekleme
  const kaydet = async (e) => {
    e.preventDefault();
    const yeniStajyer = { isim, meslek, departman };

    await fetch('/api/stajyerler', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(yeniStajyer)
    });

    // Formu temizle ve listeyi yenile
    setIsim('');
    setMeslek('');
    setDepartman('Yazılım');
    stajyerleriGetir();
  };

  // Kayıt Silme
  const sil = async (id) => {
    await fetch(`/api/stajyerler/${id}`, { method: 'DELETE' });
    stajyerleriGetir();
  };

  return (
    <div className="container">
      <h1>Stajyer Yönetim Sistemi (React)</h1>
      
      {/* Form Alanı */}
      <section>
        <h2>Yeni Stajyer Ekle</h2>
        <form onSubmit={kaydet}>
          <label>İsim:</label>
          <input type="text" value={isim} onChange={(e) => setIsim(e.target.value)} required />

          <label>Meslek:</label>
          <input type="text" value={meslek} onChange={(e) => setMeslek(e.target.value)} required />

          <label>Departman:</label>
          <select value={departman} onChange={(e) => setDepartman(e.target.value)}>
            <option value="Yazılım">Yazılım</option>
            <option value="Tasarım">Tasarım</option>
            <option value="Sistem">Sistem</option>
          </select>

          <button type="submit">Kaydet</button>
        </form>
      </section>

      {/* Tablo Alanı */}
      <section>
        <h2>Kayıtlı Stajyerler</h2>
        <table>
          <thead>
            <tr>
              <th>İsim</th>
              <th>Meslek</th>
              <th>Departman</th>
              <th>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {/* Eskiden innerHTML ile yaptığımız listelemeyi React'te map ile çok daha şık yapıyoruz */}
            {stajyerler.map((stajyer) => (
              <tr key={stajyer.id}>
                <td>{stajyer.isim}</td>
                <td>{stajyer.meslek}</td>
                <td>{stajyer.departman}</td>
                <td><button onClick={() => sil(stajyer.id)}>Sil</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;