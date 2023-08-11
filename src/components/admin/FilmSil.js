import React, { useEffect, useState } from 'react';

const FilmSil = () => {
    const [film, setFilm] = useState([]);

    useEffect(() => {
        fetchFilm();
    }, []);

    const fetchFilm = () => {
        // Yorumları API'den çekin
        fetch('http://kodcat.com/backend-sosyal-sinema/filmler.php')
            .then((response) => response.json())
            .then((data) => {
                setFilm(data);
            })
            .catch((error) => console.error('API Hatası:', error));
    };

    const deleteFilm = (commentId) => {
        fetch(`http://kodcat.com/backend-sosyal-sinema/filmSil.php`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `commentId=${commentId}`,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    // Yorum silme işlemi başarılıysa, yorumları güncelleyin ve silinen yorumu yorumlar listesinden kaldırın
                    setFilm(film.filter((yorum) => yorum.id !== commentId));
                }
                alert(data.message);
            })
            .catch((error) => console.error('API Hatası:', error));
    };


    return (
        <div className='container text-white'>
            <h3>Filmler</h3>
            <table class="table table-dark table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Film Adı</th>
                        <th scope="col">İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {film.map((film) => (
                        <tr>
                            <th scope="row">{film.id}</th>
                            <td>{film.baslik}</td>
                            <td><button className='btn btn-danger ml-2' onClick={() => deleteFilm(film.id)}>Sil</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FilmSil;
