import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "../../../Hooks/useForm";
import './EditUser.css';
import { Global } from "../../../Helpers/Global";
import userEmpty from '../../../img/userempty.jpg';

export const EditUser = () => {
    
    const { auth } = useAuth();

    const { formulary, changed } = useForm({});
    const [result, setResult] = useState('no sent');

    const updateUser = (event) => {
        event.preventDefault();
    }
    
    return (
        <form className='Form__container'  onSubmit={updateUser}>
            <h2>Edit {auth.name}</h2>
            <div> <label htmlFor="name" >Name: </label>
                <input type="text" name='name' defaultValue={auth.name}  />
            </div>

            <div>
                <label htmlFor="surname">Surname: </label>
                <input type="text" name='surname' defaultValue={auth.surname} />
            </div>

            <div>
                <label htmlFor="bio">Biography: </label>
                <textarea type="text" name='bio' defaultValue={auth.bio}  />
            </div>

            <div>
                <label htmlFor="nick">Nickname: </label>
                <input type="text" name='nick' defaultValue={auth.nick} />
            </div>

            <div>
                <label htmlFor="email">E-mail: </label>
                <input type="email" name='email' defaultValue={auth.email} />
            </div>

            <div>
                <label htmlFor="password">Password: </label>
                <input type="password" name='password' placeholder="Password" />
            </div>


            <div className="edit__pothography">
                <label htmlFor="file0">Picture</label>
                <div className="edit__image">{auth.image !== 'Default.png' ? <img src={Global.url + 'user/avatar/' + auth.image} alt='user image'></img> : <img src={  userEmpty } alt='user image'></img>}</div>
                <div id='divfile'>
                    <p id='text'>Pothography</p>
                    <input type='file' name='file0' id='file' />
                </div>
                
            </div>
            <input type="submit" value='Save Edition' />
            <h2>{result === 'sent'? "User register correct" : " "}{result === 'error'? "nick or email is in use" : " "}</h2>
        </form>
    )
}
