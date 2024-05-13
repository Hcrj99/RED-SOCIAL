import { Navbar } from "../Navbar/Navbar";
import './Header.css';
import { UserPhoto } from '../../../svg/UserPhoto';

export const HeaderPrivate = () => {
    return (
        <header className="header__container">
            <div className="left__container">
                <h1>HS</h1>
                <form className='Seacrh'>
                    <input type="text" placeholder="Explorer"/>
                </form>
            </div>
            <Navbar />
            <UserPhoto />
        </header>
    );
}