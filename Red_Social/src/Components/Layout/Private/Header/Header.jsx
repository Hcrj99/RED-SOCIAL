import { Navbar } from "../Navbar/Navbar";
import './Header.css';
import { UserPhoto } from '../../../svg/UserPhoto';
import { NavLink } from "react-router-dom";
import useAuth from "../../../../Hooks/useAuth";

export const HeaderPrivate = () => {

    const { auth } = useAuth();

    return (
        <header className="header__container">
            <div className="left__container">
                <h1>HS</h1>
                <form className='Seacrh'>
                    <input type="text" placeholder="Explorer" />
                </form>
            </div>
            <Navbar />
            <ul className="menu__user">
                <li className="menu__user-config">
                    <UserPhoto />
                    <ul>
                        <li>{'@' + auth.nick}</li>
                        <li><NavLink to='/hs/edituser'>Edit {auth.name}</NavLink></li>
                        <li><NavLink to='/hs/logout'>
                            <span>Sign Out</span>
                            </NavLink>
                        </li>
                    </ul>
                </li>
            </ul>
        </header>
    );
}