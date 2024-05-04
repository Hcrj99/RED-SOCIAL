import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HeaderPrivate } from '../Components/Layout/Private/Header/Header';
import { HeaderPublic } from '../Components/Layout/Public/Header/Header';

const Router = () => {
    let stateLogin = false;

    return (
        <BrowserRouter>
            {stateLogin ? <HeaderPrivate /> : <HeaderPublic />}
            <Routes>
                <Route />
            </Routes>

        </BrowserRouter>
    )
}

export { Router };