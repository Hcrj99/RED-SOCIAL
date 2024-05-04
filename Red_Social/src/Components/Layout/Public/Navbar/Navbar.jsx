
import { NavLink } from 'react-router-dom';
import { LoginUser } from '../../../svg/LoginUser';
import { RegisterUser } from '../../../svg/RegisterUser';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className='nav__container'>
            <ul className='nav__container-menu-public'>
                <li className='nav__menu-icon' ><NavLink to='login'><LoginUser />Login</NavLink></li>
                <li className='nav__menu-icon'><NavLink to='register'><RegisterUser />Register</NavLink></li>
            </ul>
        </nav>
    )
}

export { Navbar }