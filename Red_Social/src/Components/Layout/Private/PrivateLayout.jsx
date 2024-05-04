import { Outlet } from 'react-router-dom';
import { HeaderPrivate } from './Header/Header';
import { UserPanel } from '../../Users/UserPanel/UserPanel';
import { UsersPanel } from '../../Users/UsersPanel/UsersPanel';

export const PrivateLayout = () => {
    return (
        <>
            <HeaderPrivate />

            <section >
                <UserPanel />
                <Outlet />
                <UsersPanel />
            </section>

            
        </>
    )
}
