import { useForm } from '../../../Hooks/useForm';
import './Register.css';

export const Register = () => {

    const { formulary, changed } = useForm({});

    const registerUser = (event) => {
        event.preventDefault();
        let newUser = formulary;

        

    };

    return (
        <form className='Form__container'  onSubmit={registerUser}>
            <h2>Register Now!</h2>
            <div> <label htmlFor="Name" >Name: </label>
                <input type="text" name='Name' placeholder="Name" onChange={changed} />
            </div>

            <div>
                <label htmlFor="Surname">Surname: </label>
                <input type="text" name='Surname' placeholder="Surname" onChange={changed} />
            </div>

            <div>
                <label htmlFor="Nickname">Nickname: </label>
                <input type="text" name='Nickname' placeholder="Nickname" onChange={changed} />
            </div>

            <div>
                <label htmlFor="E-mail">E-mail: </label>
                <input type="text" name='E-mail' placeholder="E-mail" onChange={changed} />
            </div>

            <div>
                <label htmlFor="password">Password: </label>
                <input type="text" name='password' placeholder="Password" onChange={changed} />
            </div>
            <input type="submit" value='Register' />
        </form>
    )
}
