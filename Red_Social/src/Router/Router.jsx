import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PublicLayout } from '../Components/Layout/Public/PublicLayout';
import { Login } from '../Components/Users/Login/Login';
import { Register } from '../Components/Users/Register/Register';
import { PrivateLayout } from '../Components/Layout/Private/PrivateLayout';
import { Publications } from '../Components/Publications/Publications';
import { Message } from '../Components/Follows/Message/Message';
import { Notifications } from '../Components/Follows/Notifications/Notifications';
import { Following } from '../Components/Follows/Following/Following';
import { ErrorRoute } from '../Components/Errors/Error/ErrorRoute';
import { AuthProvider } from '../Context/AuthProvider';
import { LogOut } from '../Components/Users/Login/LogOut';
import { EditUser } from '../Components/Users/EditUser/EditUser';
import { FollowMe } from '../Components/Follows/FollowMe/FollowMe';
import { Profile } from '../Components/Users/Profile/Profile';
import { PublicationsFollows } from '../Components/Publications/PublicationsFollows';

const Router = () => {
    return (
        <BrowserRouter>
            <AuthProvider >
                <Routes>
                    <Route path='/' element={<PublicLayout />}>
                        <Route index element={<Login />} />
                        <Route path='login' element={<Login />} />
                        <Route path='register' element={<Register />} />
                    </Route>

                    <Route path='/hs' element={<PrivateLayout />}>
                        <Route index element={<Publications />} />
                        <Route path='publications' element={<Publications />} />
                        <Route path='feed' element={<PublicationsFollows />} />
                        <Route path='messages' element={<Message />} />
                        <Route path='notifications' element={<Notifications />} />
                        <Route path='following/:userId' element={<Following />} />
                        <Route path='followme/:userId' element={<FollowMe />} />
                        <Route path='logout' element={<LogOut />} />
                        <Route path='edituser' element={<EditUser />} />
                        <Route path='profile/:userId' element={<Profile />} />
                    </Route>

                    <Route path='*' element={<ErrorRoute />} />

                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export { Router };