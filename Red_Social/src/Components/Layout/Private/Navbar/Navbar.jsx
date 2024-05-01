import { HomeSvg } from '../../../svg/HomeSvg';
import { Like } from '../../../svg/Like';
import { Message } from '../../../svg/Message';
import { Notification } from '../../../svg/Notification';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className='nav__container'>
            <ul className='nav__container-menu'>
                <li className='nav__menu-icon'><HomeSvg /></li>
                <li className='nav__menu-icon' ><Message /></li>
                <li className='nav__menu-icon'><Notification /></li>
                <li className='nav__menu-icon'><Like /></li>
            </ul>
        </nav>
    )
}

export { Navbar }