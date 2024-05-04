
import { LoginUser } from '../../../svg/LoginUser';
import { RegisterUser } from '../../../svg/RegisterUser';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className='nav__container'>
            <ul className='nav__container-menu-public'>
                <li className='nav__menu-icon' ><LoginUser />Login</li>
                <li className='nav__menu-icon'><RegisterUser />Register</li>
            </ul>
        </nav>
    )
}

export { Navbar }