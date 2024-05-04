import { Navbar } from "../Navbar/Navbar";
import './Header.css';

export const HeaderPublic = () => {
    return (
        <header className="header__container">
            <div className="left__container">
                <h1>HS</h1>
                <form className='Seacrh'>
                    <input type="text" placeholder="Explorer"/>
                </form>
            </div>
            <Navbar />
        </header>
    );
}