import { useState } from 'react';
import { Ajax } from '../../../Helpers/Ajax';
import { Global } from '../../../Helpers/Global';
import { useForm } from '../../../Hooks/useForm';
import './Register.css';

export const Register = () => {

    const { formulary, changed } = useForm({});
    const [result, setResult] = useState('no sent');

    const registerUser = async(event) => {
        event.preventDefault();
        let newUser = formulary;
        console.log(newUser);
        const { data } = await Ajax(Global.url + 'user/register', 'POST' , newUser);
        console.log(data);
        data.status === 'success' ? setResult('sent') : setResult('error');
    };

    return (
        <form className='Form__container'  onSubmit={registerUser}>
            <h2>Register Now!</h2>
            <div> <label htmlFor="name" >Name: </label>
                <input type="text" name='name' placeholder="Name" onChange={changed} />
            </div>

            <div>
                <label htmlFor="surname">Surname: </label>
                <input type="text" name='surname' placeholder="Surname" onChange={changed} />
            </div>

            <div>
                <label htmlFor="nick">Nickname: </label>
                <input type="text" name='nick' placeholder="Nickname" onChange={changed} />
            </div>

            <div>
                <label htmlFor="email">E-mail: </label>
                <input type="text" name='email' placeholder="E-mail" onChange={changed} />
            </div>

            <div>
                <label htmlFor="password">Password: </label>
                <input type="text" name='password' placeholder="Password" onChange={changed} />
            </div>
            <input type="submit" value='Register' />
            <h2>{result === 'sent'? "User regiter correct" : " "}{result === 'error'? "nick or email is in use" : " "}</h2>
        </form>
    )
}
