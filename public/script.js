const form = document.getElementById('ogrenciForm');
const tabloGovdesi = document.querySelector('#ogrenciTablosu tbody'); 

async function stajyerleriGetir() {
    const response = await fetch('/api/stajyerler');
    const stajyerler = await response.json();
    
    tabloGovdesi.innerHTML = ''; 
    
    stajyerler.forEach(stajyer => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${stajyer.isim}</td>
            <td>${stajyer.meslek}</td>
            <td>${stajyer.departman}</td>
            <td><button onclick="stajyerSil(${stajyer.id})">Sil</button></td>
        `;
        tabloGovdesi.appendChild(tr);
    });
}

// silme işlemleri için
async function stajyerSil(id) {
    await fetch(`/api/stajyerler/${id}`, {
        method: 'DELETE'
    });
    stajyerleriGetir(); // Silindikten sonra tabloyu güncelleme 
}

form.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const isim = document.getElementById('isim').value;
    const meslek = document.getElementById('meslek').value;
    const departman = document.getElementById('departman').value;

    await fetch('/api/stajyerler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isim, meslek, departman })
    });

    form.reset();
    stajyerleriGetir();
});

stajyerleriGetir();