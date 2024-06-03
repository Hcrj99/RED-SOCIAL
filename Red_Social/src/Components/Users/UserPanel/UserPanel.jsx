import './UserPanel.css';
import useAuth from "../../../Hooks/useAuth";
import { Global } from '../../../Helpers/Global';
import userEmpty from '../../../img/userempty.jpg';
import { NavLink } from 'react-router-dom';

export const UserPanel = () => {

    const { auth , countFollowed , countFollowings } = useAuth();

    return (
        <section className='section__user-profile'>
            <div className='profile__container'>
                <div className='profile1'>
                    <NavLink to={'/hs/followme/' + auth._id}>
                        <h2>{countFollowed}</h2>
                        <h4>Followers</h4>
                    </NavLink>
                    <figure>
                        {auth.image !== 'Default.png' ? <img src={Global.url + 'user/avatar/' + auth.image} alt='user image'></img> : <img src={userEmpty} alt='user image'></img>}
                    </figure>
                    <NavLink to={'/hs/following/' + auth._id}>
                        <h2>{countFollowings}</h2>
                        <h4>Following</h4>
                    </NavLink>
                </div>
                <div className='profile2'>
                    <h2>{auth.name}</h2>
                    <h3>@{auth.nick}</h3>
                    <h4>{auth.bio}</h4>
                </div>
            </div>
            <div className='history__container'>
                <h2>My publication</h2>
            </div>
        </section>
    )
}
