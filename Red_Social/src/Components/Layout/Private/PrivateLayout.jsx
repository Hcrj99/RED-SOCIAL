import { Outlet } from 'react-router-dom';
import { HeaderPrivate } from './Header/Header';
import { UserPanel } from '../../Users/UserPanel/UserPanel';
import { UsersPanel } from '../../Users/UsersPanel/UsersPanel';
import './PrivateLayout.css';

export const PrivateLayout = () => {
    return (
        <>
            <HeaderPrivate />

            <section className='private__section'>
                <UserPanel />
                <div className='feed__section'>
                    <div>
                        <h2>following images</h2>
                    </div>
                    <h1>Create Publication</h1>
                    <Outlet />
                </div>
                <UsersPanel />
            </section>


        </>
    )
}
