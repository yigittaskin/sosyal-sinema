import React, { useEffect, useState } from 'react';
import '../styles/movie.scss';
import Back from '../images/back.svg';
import { Link, useParams } from 'react-router-dom';

const Movie = () => {
  const [movie, setMovie] = useState(null);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [yorumlar, setYorumlar] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://kodcat.com/backend-sosyal-sinema/diziById.php?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovie(data);
      })
      .catch((error) => console.error('API Hatası:', error));
    fetchComments();
  }, []);

  const fetchComments = () => {
    // Yorumları API'den çekin
    fetch(`https://kodcat.com/backend-sosyal-sinema/diziYorumlar.php?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setYorumlar(data);
      })
      .catch((error) => console.error('API Hatası:', error));
  };


  const addComment = () => {
    // Yorum göndermek için API isteği yapın
    fetch(`https://kodcat.com/backend-sosyal-sinema/diziYorumEkle.php?id=${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        id,
        name,
        comment,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Yorum gönderme işlemi başarılıysa, yorumları güncelleyin ve yeni yorumu yorumlar listesine ekleyin
        setYorumlar([data, ...yorumlar]);

        // Yeni yorum eklemeyi tamamlayınca name ve comment state'lerini sıfırlayın
        setName('');
        setComment('');
      })
      .catch((error) => console.error('API Hatası:', error));
  };

  // Türkçe ay isimleri için kısa ay isimleri eşleştirmesi
  const turkishMonths = {
    1: 'Ocak',
    2: 'Şubat',
    3: 'Mart',
    4: 'Nisan',
    5: 'Mayıs',
    6: 'Haziran',
    7: 'Temmuz',
    8: 'Ağustos',
    9: 'Eylül',
    10: 'Ekim',
    11: 'Kasım',
    12: 'Aralık',
  };

  // Tarih ve saati belirli bir formatta göstermek için fonksiyon
  const formatDate = (datetimeString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = new Date(datetimeString).toLocaleString('tr-TR', options);
    const [date, time] = formattedDate.split(' '); // Tarih ve saat bilgisini ayır

    // Tarihi ve ayı ayrıştır
    const [day, month, year] = date.split('.');
    const monthName = turkishMonths[Number(month)];

    return `${day} ${monthName} ${year} - ${time}`;
  };

  return (
    <div className='container'>
      {movie && (
        <div className='container movie p-5 text-center'>
          <div className='row'>
            <div className='col-md-12 text-left'>
              <Link to='/'>
                <p className='back' ><img className='mr-2' height='30px' src={Back} alt='Back' /> Ana Sayfaya Dön</p><br />
              </Link>
            </div>
            <div className='col-md-12'>
              <img style={{ height: '350px', width:'100%' }} src={`${movie.banner}`} alt={movie.baslik} />
            </div>
            <div className='col-md-12'>
              <h3>{movie.baslik}</h3>
            </div>
            <div className='container mt-5'>
              <div className='row'>
                <div className='col-md-6 border-right'>
                  <p><span>Puan:</span> <b>{Math.floor(movie.puan)}</b>/10</p>
                  <p><span>Yayınlanma Tarihi:</span> <b>{movie.yayinTarihi}</b></p>
                  <p><span>Tür:</span> <b>Dizi</b></p>
                  <p><span>Sezon:</span> <b>{movie.sezon}</b></p>
                  <p><span>Toplam Bölüm:</span> <b>{movie.toplamBolum}</b></p>
                  <p><span>Konu:</span> <b>{movie.konu}</b></p>
                </div>
                <div className='col-md-5'>
                  <p>{movie.aciklama}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
      <div className='container'>
        <div className='comment'>
          <h3 className='text-white mb-3'>Yorum Ekle</h3>

          {/* Yorum göndermek için gerekli input ve textarea */}
          <input
            maxLength='20'
            style={{ marginBottom: '20px', height: '40px' }}
            type='text'
            placeholder='İsminiz veya nickname'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />

          <textarea
            rows={8}
            cols={20}
            placeholder='Yorumunuz...'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <br />

          {/* Yorum Gönder düğmesi */}
          <button className='btn btn-dark' onClick={addComment}>
            Yorum Yap
          </button>
        </div>
      </div>
      <div className='container'>
        <div className='yorumlar mt-5'>
          {/* Yorumları listeleyin */}
          {yorumlar.map((yorum) => (
            <>
            <div className='p-3' key={yorum.id}>
              <h6 id='dataName'>{yorum.username}</h6>
              <p id='dataComment'>{yorum.comment}</p>
              <p id='dataCommentDate'>{formatDate(yorum.created_at)}</p>
            </div>
              <div className='cizgi'></div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movie;
