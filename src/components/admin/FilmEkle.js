import React, { useState } from 'react';

function FilmEkle() {
  const [baslik, setBaslik] = useState('');
  const [aciklama, setAciklama] = useState('');
  const [resim, setResim] = useState('');
  const [banner, setBanner] = useState('');
  const [puan, setPuan] = useState('');
  const [yayinTarihi, setYayinTarihi] = useState('');
  const [sure, setSure] = useState('');
  const [konu, setKonu] = useState('');
  const [oyuncular, setOyuncular] = useState('');
  const [originalTitle, setOriginalTitle] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Form verilerini sunucuya gönderelim
    fetch('http://kodcat.com/backend-sosyal-sinema/filmEkle.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        baslik,
        aciklama,
        resim,
        banner,
        puan,
        yayinTarihi,
        sure,
        konu,
        oyuncular,
        originalTitle,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          // Formu sıfırlayalım
          setBaslik('');
          setAciklama('');
          setResim('');
          setBanner('');
          setPuan('');
          setYayinTarihi('');
          setSure('');
          setKonu('');
          setOyuncular('');
          setOriginalTitle('');
        } else {
          alert('Film eklenirken bir hata oluştu.');
        }
      })
      .catch((error) => console.error('API Hatası:', error));
  };

  return (
    <form onSubmit={handleSubmit} className='text-white'>
      <h2 className='mb-4'>Film Ekle</h2>
      <div className='form-group'>
        <div className='mt-2'>
          <label>Başlık:</label>
          <input className="form-control" type="text" value={baslik} onChange={(e) => setBaslik(e.target.value)} required />
        </div>
        <div className='mt-2'>
          <label>Açıklama:</label>
          <input className="form-control" type="text" value={aciklama} onChange={(e) => setAciklama(e.target.value)} required />
        </div>
        <div className='mt-2'>
          <label>Resim(Link):</label>
          <input className="form-control" type="text" value={resim} onChange={(e) => setResim(e.target.value)} required />
          <small className="form-text text-muted">Bu resim, listede görüneceği için dikey/afiş şeklinde seçilmelidir.</small>
        </div>
        <div className='mt-2'>
          <label>Banner(Link):</label>
          <input className="form-control" type="text" value={banner} onChange={(e) => setBanner(e.target.value)} required />
          <small className="form-text text-muted">Bu resim, detay görüneceği için yatay/banner şeklinde seçilmelidir.</small>
        </div>
        <div className='mt-2'>
          <label>Puan:</label>
          <input className="form-control" type="text" value={puan} onChange={(e) => setPuan(e.target.value)} required />
          <small className="form-text text-muted">En yüksek puan 10'dur. IMDB üzerinden puanını girin.</small>
        </div>
        <div className='mt-2'>
          <label>Yayın Tarihi:</label>
          <input className="form-control" type="date" value={yayinTarihi} onChange={(e) => setYayinTarihi(e.target.value)} required />
        </div>
        <div className='mt-2'>
          <label>Süre:</label>
          <input className="form-control" type="text" value={sure} onChange={(e) => setSure(e.target.value)} required />
          <small className="form-text text-muted">Dakika cinsinden giriniz.</small>
        </div>
        <div className='mt-2'>
          <label>Konu:</label>
          <input className="form-control" type="text" value={konu} onChange={(e) => setKonu(e.target.value)} required />
        </div>
        <div className='mt-2'>
          <label>Oyuncular:</label>
          <input className="form-control" type="text" value={oyuncular} onChange={(e) => setOyuncular(e.target.value)} required />
        </div>
        <div className='mt-2'>
          <label>Orjinal Başlık:</label>
          <input className="form-control" type="text" value={originalTitle} onChange={(e) => setOriginalTitle(e.target.value)} required />
        </div>
        <button className='btn btn-warning mt-2' type="submit">Film Ekle</button>
      </div>
    </form>
  );
}

export default FilmEkle;
