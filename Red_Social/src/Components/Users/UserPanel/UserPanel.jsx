import './UserPanel.css';
import useAuth from "../../../Hooks/useAuth";
import { Global } from '../../../Helpers/Global';
import userEmpty from '../../../img/userempty.jpg';

export const UserPanel = () => {

    const { auth } = useAuth();

    return (
        <section className='section__user-profile'>
            <div className='profile__container'>
                <div className='profile1'>
                    <div>
                        <h2>24243</h2>
                        <h4>followers</h4>
                    </div>
                    <figure>
                        {auth.image !== 'Default.png' ? <img src={Global.url + 'user/avatar/' + auth.image} alt='user image'></img> : <img src={userEmpty} alt='user image'></img>}
                    </figure>
                    <div>
                        <h2>24243</h2>
                        <h4>following</h4>
                    </div>
                </div>
                <div className='profile2'>
                    <h2>{auth.name}</h2>
                    <h3>@{auth.nick}</h3>
                    <h2>{auth.bio}</h2>
                </div>
            </div>
            <div className='history__container'>
                <h2>My publication</h2>
            </div>
        </section>
    )
}
