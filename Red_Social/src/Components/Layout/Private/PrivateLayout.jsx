import { Navigate, Outlet } from 'react-router-dom';
import { HeaderPrivate } from './Header/Header';
import { UserPanel } from '../../Users/UserPanel/UserPanel';
import { UsersPanel } from '../../Users/UsersPanel/UsersPanel';
import './PrivateLayout.css';
import useAuth from '../../../Hooks/useAuth';
import { Loading } from '../../Loading/Loading';
import { CreatePublication } from '../../Publications/CreatePublication/CreatePublication';

export const PrivateLayout = () => {
    const { auth, loading } = useAuth();
    if (loading) {
        return (
            <>
                <HeaderPrivate />
                <section className='loading__state'>
                    <Loading></Loading>
                </section>
            </>
        )
    } else {
        return (
            <>
                <HeaderPrivate />
                {auth._id ? (<section className='private__section'>
                    <UserPanel />
                    <div className='feed__section'>
                        <CreatePublication />
                        <Outlet />
                    </div>
                    <UsersPanel />
                </section>) : (<Navigate to='/' />)
                }
            </>
        )
    }
}
