import React from 'react';
import Menu from './Menu';
import Search from './Search';
import { Link } from 'react-router-dom';
import Logo from'../../images/logo.png'

const Header = () => {

    return (
        <div className="header bg-light">
            <nav className=" container navbar navbar-expand-lg navbar-light 
            bg-light justify-content-between align-middle">

                <Link to="/" className="logo">
                    <h1 className="navbar-brand p-0 m-0"
                        onClick={() => window.scrollTo({ top: 0 })}>
                       <img src={Logo} alt="logo" />
                       <span style={{ color: '#122556' }}>Horeb Chat</span>
                    </h1>
                </Link>

                <Search />

                <Menu />
            </nav>
        </div>


    )
}

export default Header;