import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Star from '../images/star.svg'
import Nav from './Nav';

const Tv = () => {
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        fetch('https://kodcat.com/backend-sosyal-sinema/diziler.php')
            .then((response) => response.json())
            .then((data) => setMovies(data))
            .catch((error) => console.error('API Hatası:', error));
    }, []);
    return (
        <>
            <Nav section='tv' />
            <div className='container'>
                <h2 className='text-white m-5'>DİZİLER</h2>
                {movies && (
                    <div className='row justify-content-between'>
                        {movies.map(movies => (
                            <div className='col-md-3 mt-3' key={movies.id}>
                                <div className='movieCard p-3'>
                                    <div>
                                        <Link to={`${movies.id}`}>
                                            <img style={{ height: '320px' }} src={`${movies.resim}`} alt={movies.baslik} />
                                            <h3 className='mt-2' id='movieTitle'>{movies.baslik}</h3>
                                        </Link>
                                        <p><img style={{ width: '18px', marginTop: '-5px' }} src={Star} alt='Star' />{movies.puan}</p>
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

export default Tv
