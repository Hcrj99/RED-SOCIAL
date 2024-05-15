import { Navigate, Outlet } from 'react-router-dom';
import { HeaderPublic } from './Header/Header';
import './Public.css';
import useAuth from '../../../Hooks/useAuth';


export const PublicLayout = () => {
    const { auth } = useAuth();
    return (
        <>
            <HeaderPublic />

            <section className='Public'>
                {!auth._id ? <Outlet /> : <Navigate to='/hs' />}
            </section>
        </>
    )
}
