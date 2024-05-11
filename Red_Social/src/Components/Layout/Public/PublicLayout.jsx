import { Outlet } from 'react-router-dom';
import { HeaderPublic } from './Header/Header';
import './Public.css';
import useAuth from "../../../Hooks/useAuth";

export const PublicLayout = () => {

    const {auth} = useAuth();

    console.log(auth);

    return (
        <>
            <HeaderPublic />

            <section className='Public'>
                <Outlet />
            </section>
        </>
    )
}
