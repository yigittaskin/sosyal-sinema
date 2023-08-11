import React, { useEffect, useState } from 'react'
import Star from '../images/star.svg'
import Nav from './Nav';

const Movies = () => {
    const [filmler, setFilmler] = useState(null);

    useEffect(() => {
        fetch('https://kodcat.com/backend-sosyal-sinema/filmler.php')
            .then((response) => response.json())
            .then((data) => setFilmler(data))
            .catch((error) => console.error('API Hatası:', error));
    }, []);

    return (
        <>
            <Nav section='movies'/>
            <div className='container'>
                <h2 className='text-white m-5'>FİLMLER</h2>
                {filmler && (
                    <div className='row justify-content-between'>
                        {filmler.map(filmler => (
                            <div className='col-md-3 mt-3' key={filmler.id}>
                                <div className='movieCard p-3'>
                                    <div>
                                        <a href={`movies/${filmler.id}`}>
                                            <img style={{ height: '320px' }} src={`${filmler.resim}`} alt={filmler.baslik} />
                                            <h3 className='mt-2' id='movieTitle'>{filmler.baslik}</h3>
                                        </a>
                                        <p><img style={{ width: '18px', marginTop: '-5px' }} src={Star} alt='Star' />{filmler.puan}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default Movies
