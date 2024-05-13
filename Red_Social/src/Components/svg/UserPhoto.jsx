import { Global } from '../../Helpers/Global';
import useAuth from '../../Hooks/useAuth';
import './UserPhoto.css';

export const UserPhoto = () => {
    const { auth } = useAuth();

    return (
        <figure className='figure__user'>
            {auth.image != 'Default.png ' && <img src={Global.url + 'user/avatar/' + auth.image} alt='user image'></img>}
            {auth.image === 'Default.png ' && <img src='../../..//img/userempty.jpg' alt='user image'></img>}
        </figure>
    )
}
