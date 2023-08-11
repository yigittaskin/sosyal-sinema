import React from 'react'
import '../styles/nav.scss'
import Sinema from '../images/sinema.svg'
//import Search from './Search'
import { Link } from 'react-router-dom';

const Nav = (props) => {
    return (
        <div className='container navSection'>
            <div className='row'>
                <div className='col-md-6'>
                    <h1 className='text-white'>SosyalSinema</h1>
                    <p style={{ color: '#A0A0A0' }}>Sosyal Sinema ile istediğin filme, diziye puan ver ve yorumunu herkesle paylaşarak seyirciler için fikir oluştur!</p>
                    {/* <Search /> */}
                    <div className='kategori d-flex justify-content-around align-items-center'>
                        <Link
                            to='/'
                            className={props.section === 'default' ? 'btn activeTab' : 'btn'}>
                            En Yeniler
                        </Link>
                        <Link
                            to='/movies'
                            className={props.section === 'movies' ? 'btn activeTab' : 'btn'}>
                            Filmler
                        </Link>
                        <Link
                            to='/tv'
                            className={props.section === 'tv' ? 'btn activeTab' : 'btn'}>
                            Diziler
                        </Link>
                    </div>
                </div>
                <div className='col-md-6 d-flex justify-content-start align-items-center'>
                    <img id='imgSinema' src={Sinema} alt='sinema' />
                </div>
            </div>
        </div>
    )
}

export default Nav
