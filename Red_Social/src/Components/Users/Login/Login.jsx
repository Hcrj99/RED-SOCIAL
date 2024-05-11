import { useState } from "react";
import { Ajax } from "../../../Helpers/Ajax";
import { Global } from "../../../Helpers/Global";
import { useForm } from "../../../Hooks/useForm";

export const Login = () => {
    const { formulary, changed } = useForm({});
    const [result, setResult] = useState('no sent');

    const loginUser = async (event) => {
        event.preventDefault();
        let loginUser = formulary;
        console.log(loginUser);
        const { data } = await Ajax(Global.url + 'user/login', 'POST', loginUser);
        console.log(data);
        if (data.status === 'success') {
            //keep sesions
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            setResult('sent')
        } else {
            setResult('error');
        }
    }

    return (
        <form className='Form__container' onSubmit={loginUser}>
            <h2>Welcome!...</h2>
            <div>
                <label htmlFor="email">E-mail: </label>
                <input type="email" name='email' placeholder="E-mail" onChange={changed} />
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input type="password" name='password' placeholder="Password" onChange={changed} />
            </div>
            <input type="submit" value='Login' />
            <h2>{result === 'sent' ? "Loged" : " "}{result === 'error' ? "wrong email or password" : " "}</h2>
        </form>
    )
}
