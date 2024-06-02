import { Global } from "../../../Helpers/Global";
import useAuth from "../../../Hooks/useAuth";
import userEmpty from '../../../img/userempty.jpg';
import './CreatePublication.css';

export const CreatePublication = () => {

    const { auth } = useAuth();

    return (
        <section className="publicater">
            <figure>
                {auth.image !== 'Default.png' ? <img src={Global.url + 'user/avatar/' + auth.image} alt='user image'></img> : <img src={userEmpty} alt='user image'></img>}
            </figure>
            <form>
                <div className="title__publication">
                    <label>Share us your history</label>
                    <input type="text" name='namepublication' placeholder='What do you think?' />
                </div>
                <div className="send__publication">
                    <div id='file__publication'>
                        <p id='text__button'>Image</p>
                        <input type='file' name='file0' id='filep' />
                    </div>
                    <input type='submit' value='Publicate' />
                </div>
            </form>
        </section>
    )
}
