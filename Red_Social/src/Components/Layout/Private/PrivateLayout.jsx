import { Navigate, Outlet } from 'react-router-dom';
import { HeaderPrivate } from './Header/Header';
import { UserPanel } from '../../Users/UserPanel/UserPanel';
import { UsersPanel } from '../../Users/UsersPanel/UsersPanel';
import './PrivateLayout.css';
import useAuth from '../../../Hooks/useAuth';

export const PrivateLayout = () => {
    const { auth, loading } = useAuth();
    if(loading){
        return(
        <>
            <HeaderPrivate />
            <h1>Loading...</h1>
        </>
        )
    }else{
        return (
            <>
                <HeaderPrivate />
                {auth._id ? (<section className='private__section'>
                    <UserPanel />
                    <div className='feed__section'>
                        <div>
                            <h2>following images</h2>
                        </div>
                        <h1>Create Publication</h1>
                        <Outlet />
                    </div>
                    <UsersPanel />
                </section>) : (<Navigate to='/' />)
                }
            </>
        )
    }
}
