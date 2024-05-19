import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "../../../Hooks/useForm";
import './EditUser.css';
import { Global } from "../../../Helpers/Global";
import userEmpty from '../../../img/userempty.jpg';

export const EditUser = () => {
    
    const { auth, setAuth } = useAuth();

    const { serializeForm } = useForm({});
    const [result, setResult] = useState('no sent');

    const updateUser = async(event) => {
        event.preventDefault();
        let newUser = serializeForm(event.target);
        delete newUser.file0;

        const options = {
            method: 'PUT',
            body: JSON.stringify(newUser),
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('token')
            }
        }
        
        const requestEdit = await fetch(Global.url + 'user/update', options);
        const data = await requestEdit.json();

        if(data.status === 'success') {
            delete data.user.password;
            setAuth(data.user); 
            setResult('sent');
        } 
        else {
            setResult('error'); 
        }
        //Upload images
        const fileInput = document.querySelector('#file');


        if(data.status === 'success' && fileInput.files[0]){
            //get data to upload
            const formData = new FormData();
            formData.append('file0', fileInput.files[0]);

            console.log(formData);

            //request 
            const uploadRequest = await fetch(Global.url + 'user/upload' , {
                method: 'POST',
                body: formData,
                headers: {
                    "Authorization": localStorage.getItem('token')
                }
            });

            const dataImage = await uploadRequest.json();

            console.log(dataImage);

            if (dataImage.status == 'success'){
                delete dataImage.user.password;
                setAuth(dataImage.user);
                setResult('sent');
            }else {
                setResult('error');
            }
        }
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
                    <p id='text'>Photography</p>
                    <input type='file' name='file0' id='file' />
                </div>
                
            </div>
            <input type="submit" value='Save Edition' />
            <h2>{result === 'sent'? "User Edit correct" : " "}{result === 'error'? "nick or email is in use" : " "}</h2>
        </form>
    )
}
