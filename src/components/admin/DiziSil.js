import React, { useEffect, useState } from 'react';

const DiziSil = () => {
    const [dizi, setDizi] = useState([]);

    useEffect(() => {
        fetchDizi();
    }, []);

    const fetchDizi = () => {
        // Yorumları API'den çekin
        fetch('http://kodcat.com/backend-sosyal-sinema/diziler.php')
            .then((response) => response.json())
            .then((data) => {
                setDizi(data);
            })
            .catch((error) => console.error('API Hatası:', error));
    };

    const deleteDizi = (commentId) => {
        fetch(`http://kodcat.com/backend-sosyal-sinema/diziSil.php`, {
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
                    setDizi(dizi.filter((yorum) => yorum.id !== commentId));
                }
                alert(data.message);
            })
            .catch((error) => console.error('API Hatası:', error));
    };


    return (
        <div className='container text-white'>
        <h3>Diziler</h3>
        <table class="table table-dark table-striped table-bordered table-hover">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">Film Adı</th>
                    <th scope="col">İşlemler</th>
                </tr>
            </thead>
            <tbody>
                {dizi.map((dizi) => (
                    <tr>
                        <th scope="row">{dizi.id}</th>
                        <td>{dizi.baslik}</td>
                        <td><button className='btn btn-danger ml-2' onClick={() => deleteDizi(dizi.id)}>Sil</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
};

export default DiziSil;
