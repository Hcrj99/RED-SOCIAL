import { Outlet } from 'react-router-dom';
import { HeaderPublic } from './Header/Header';

export const PublicLayout = () => {
    return (
        <>
            <HeaderPublic />

            <section >
                <Outlet />
            </section>
        </>
    )
}
