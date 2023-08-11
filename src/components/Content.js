import React, { useEffect, useState } from 'react'
import '../styles/content.scss'
import { Link } from 'react-router-dom';
import Star from '../images/star.svg'

const Content = (props) => {

  const [movies, setMovies] = useState([]);
  const [diziler, setDiziler] = useState([]);


  useEffect(() => {
    fetch('http://kodcat.com/backend-sosyal-sinema/sonFilmler.php')
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('API Hatası:', error));
    fetch('http://kodcat.com/backend-sosyal-sinema/sonDiziler.php')
      .then((response) => response.json())
      .then((data) => setDiziler(data))
      .catch((error) => console.error('API Hatası:', error));
  }, []);


  return (
    <div className='container'>
      {movies && (
        <div className='row justify-content-between'>
          {movies.map((movies) => (
            <div className='col-md-3 mt-3' key={movies.id}>
              <div className='movieCard p-3'>
                <div>
                  <Link to={`movies/${movies.id}`}>
                    <img style={{ height: '320px' }} src={`${movies.resim}`} alt={movies.baslik} />
                    <h3 className='mt-2' id='movieTitle'>{movies.baslik}</h3>
                  </Link>
                  <p><img style={{ width: '18px', marginTop: '-5px' }} src={Star} alt='Star' />{movies.puan}</p>
                </div>
              </div>
            </div>
          ))}
          {diziler.map((dizi) => (
            <div className='col-md-3 mt-3' key={dizi.id}>
              <div className='movieCard p-3'>
                <div>
                  <Link to={`tv/${dizi.id}`}>
                    <img style={{ height: '320px' }} src={`${dizi.resim}`} alt={dizi.baslik} />
                    <h3 className='mt-2' id='movieTitle'>{dizi.baslik}</h3>
                  </Link>
                  <p><img style={{ width: '18px', marginTop: '-5px' }} src={Star} alt='Star' />{dizi.puan}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Content
