import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '../Components/Layout/Private/Header/Header';

const Router = () => {
    return (
        <BrowserRouter>
            <Header />

            <Routes>
                <Route />
            </Routes>

        </BrowserRouter>
    )
}

export { Router };