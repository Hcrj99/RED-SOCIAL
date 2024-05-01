import { Navbar } from "../Navbar/Navbar";
import './Header.css';
import { UserPhoto } from '../../../svg/UserPhoto';

export const Header = () => {
    return (
        <header className="header__container">
            <div className="left__container">
                <h1>HS</h1>
                <form className='Seaacrh'>
                    <input type="text" placeholder="Explorer"/>
                </form>
            </div>
            <Navbar />
            <figure>
                <UserPhoto />
            </figure>
        </header>
    );
}