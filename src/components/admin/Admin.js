import React, { useState } from 'react';
import DiziEkle from './DiziEkle';
import FilmEkle from './FilmEkle';
import FilmYorumSil from './FilmYorumSil';
import DiziYorumSil from './DiziYorumSil';
import FilmSil from './FilmSil';
import DiziSil from './DiziSil';

const Admin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await fetch('https://kodcat.com/backend-sosyal-sinema/adminLogin.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
            });

            const data = await response.json();

            if (data.success) {
                setLoginError(false);
                setIsLogin(true)
            } else {
                setLoginError(true);
                setIsLogin(false)
            }
        } catch (error) {
            console.error('API Hatası:', error);
        }
    };

    if (isLogin) {
        return (
            <div>
                <div className='container p-5 mb-5'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <FilmEkle />
                        </div>
                        <div className='col-md-6'>
                            <DiziEkle />
                        </div>
                    </div>
                    <div className='cizgi'></div>
                    <div className='row mt-5 mb-5'>
                        <div className='col-md-6'>
                            <FilmSil />
                        </div>
                        <div className='col-md-6'>
                            <DiziSil />
                        </div>
                    </div>
                    <div className='cizgi'></div>
                    <div className='row mt-5 mb-5'>
                        <div className='col-md-6'>
                            <FilmYorumSil />
                        </div>
                        <div className='col-md-6'>
                            <DiziYorumSil />
                        </div>
                    </div>
                    <div className='cizgi'></div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className='container '>
                <div className='m-5 p-5 d-flex flex-column justify-content-center align-items-center'>
                    <h2 className='text-center text-white m-2'>Admin Girişi</h2>
                    {loginError && <p style={{ color: 'red' }}>Kullanıcı adı veya şifre hatalı!</p>}
                    <input className='m-2' type="text" placeholder="Kullanıcı Adı" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input className='m-2' type="password" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className='btn btn-primary m-2 w-25' onClick={handleLogin}>Giriş Yap</button>
                </div>
            </div>
        );
    }
};

export default Admin;
