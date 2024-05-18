import { NavLink } from 'react-router-dom';
import { HomeSvg } from '../../../svg/HomeSvg';
import { Like } from '../../../svg/Like';
import { Message } from '../../../svg/Message';
import { Notification } from '../../../svg/Notification';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className='nav__container'>
            <ul className='nav__container-menu'>
                <li className='nav__menu-icon'><NavLink to='/hs/feed'><HomeSvg /></NavLink></li>
                <li className='nav__menu-icon' ><NavLink to='/hs/messages'><Message /></NavLink></li>
                <li className='nav__menu-icon'><NavLink to='/hs/notifications'><Notification /></NavLink></li>
                <li className='nav__menu-icon'><NavLink to='/hs/follows'><Like /></NavLink></li>
            </ul>
        </nav>
    )
}

export { Navbar }