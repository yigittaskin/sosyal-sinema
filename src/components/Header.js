import React from 'react'
import '../styles/header.scss'
import Linkedin from '../images/linkedin.svg'
import Github from '../images/github.svg'
import Instagram from '../images/instagram.svg'
import Twitter from '../images/twitter.svg'

const Header = () => {
    return (
        <div className='header container-fluid'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 text-center'>
                        <h1 className='text-white'>SosyalSinema</h1>
                    </div>
                    <div className='col-md-6 text-center'>
                        <a href='https://www.linkedin.com/in/taskinygt/' target='blank'><img src={Linkedin} alt='Linkedin' /></a>
                        <a href='https://github.com/yigittaskin' target='blank'><img src={Github} alt='Github' /></a>
                        <a href='https://www.instagram.com/taskinygt/' target='blank'><img src={Instagram} alt='Instagram' /></a>
                        <a href='https://twitter.com/taskinYGT' target='blank'><img src={Twitter} alt='Twitter' /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
