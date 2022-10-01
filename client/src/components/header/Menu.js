import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../redux/actions/authAction';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import NotifyModal from '../NotifyModal';
import Avatar from 'react-avatar';

const Menu = () => {

    const navLinks = [
        { label: 'Accueil', icon: 'home', path: '/' },
        { label: 'Message', icon: 'near_me', path: '/message' },
        { label: 'Decouverte', icon: 'explore', path: '/decouverte' }
    ]

    const { auth, theme, notify } = useSelector(state => state);
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const isActive = (pn) => {
        if (pn === pathname) return 'active'
    }

    return (
        <div className='menu'>
            <ul className="navbar-nav d-flex flex-row">
                {
                    navLinks.map((link, index) => (
                        <li className={`nav-item mx-2 ${isActive(link.path)}`} key={index}>
                            <Link className="items-center justify-center text-center nav-link d-flex flex-column" to={link.path}>
                                <span className="material-icons">{link.icon}</span>
                            </Link>
                        </li>
                    ))
                }

                <li className="nav-item dropstart mx-2" style={{ opacity: 1 }}>
                    <span className="nav-link position-relative" id="dropdownMenuLink"
                        role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                        <span className='material-icons' style={{ color: notify.data.length > 0 ? 'crimson' : '' }}>favorite</span>
                        <span className='notify_length'>{notify.data.length}</span>
                    </span>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink"
                        style={{ transform: 'translateX(50px)' }}
                    >
                        <NotifyModal />
                    </div>

                </li>


                <li className="nav-item dropstart" style={{ opacity: 1 }}>
                    <span className="nav-link dropdown-toggle" id="navbarDropdown"
                        role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                         <Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'green', 'yellow', 'black'])} name={auth.user.username} size="30" round="20px" />
                    </span>

                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item" to={`/profil/${auth.user._id}`}>Profil</Link>

                        <label htmlFor="theme" className="dropdown-item"
                            onClick={() => dispatch({
                                type: GLOBALTYPES.THEME, payload: !theme
                            })}>

                            {theme ? 'Light mode' : 'Dark mode'}
                        </label>

                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to="/"
                            onClick={() => dispatch(logout())}>
                            Déconnexion
                        </Link>
                    </div>
                </li>
            </ul>
        </div>
    )
}



export default Menu;