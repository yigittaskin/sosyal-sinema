import React, { useEffect, useState } from 'react';

const FilmYorumSil = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    // Yorumları API'den çekin
    fetch('http://kodcat.com/backend-sosyal-sinema/filmTumYorumlar.php')
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => console.error('API Hatası:', error));
  };

  const deleteComment = (commentId) => {
    fetch(`http://kodcat.com/backend-sosyal-sinema/filmYorumSil.php`, {
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
          setComments(comments.filter((yorum) => yorum.id !== commentId));
        }
        alert(data.message);
      })
      .catch((error) => console.error('API Hatası:', error));
  };


  return (
    <div className='container text-white'>
      <div className='container text-white'>
        <h3>Film Yorumları</h3>
        <table class="table table-dark table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">Kullanıcı Adı</th>
              <th scope="col">Yorum</th>
              <th scope="col">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr>
                <td>{comment.username}</td>
                <td>{comment.comment}</td>
                <td><button className='btn btn-danger ml-2' onClick={() => deleteComment(comment.id)}>Sil</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FilmYorumSil;
