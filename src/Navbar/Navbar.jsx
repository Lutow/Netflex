import React from 'react'
import './Navbar.css'
import GithubLogo from '../assets/github-logo.png';

export const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='container'>
                <div className='navbar-logo'>
                    <a href='/'>Netflex</a>
                </div>
                <ul className='navbar-links'>
                    <li>Favorites</li>
                    <li><a href='https://github.com/Lutow'><img className='github-logo' src={GithubLogo} alt='My Github'/></a></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;