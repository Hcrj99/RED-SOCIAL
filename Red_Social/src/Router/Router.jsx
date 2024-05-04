import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PublicLayout } from '../Components/Layout/Public/PublicLayout';
import { Login } from '../Components/Users/Login';
import { Register } from '../Components/Users/Register';
// import { HeaderPrivate } from '../Components/Layout/Private/Header/Header';


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<PublicLayout />}>
                    <Route index element={<Login />} />
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                </Route>
            </Routes>

        </BrowserRouter>
    )
}

export { Router };