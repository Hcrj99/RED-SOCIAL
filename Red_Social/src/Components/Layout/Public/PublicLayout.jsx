import { Outlet } from 'react-router-dom';
import { HeaderPublic } from './Header/Header';
import './Public.css';


export const PublicLayout = () => {
    return (
        <>
            <HeaderPublic />

            <section className='Public'>
                <Outlet />
            </section>
        </>
    )
}
