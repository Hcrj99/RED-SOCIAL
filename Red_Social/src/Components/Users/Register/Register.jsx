import './Register.css';

export const Register = () => {
    return (
        <form className='Form__container'>
            <h2>Register Now!</h2>
            <div> <label htmlFor="Name" >Name: </label>
                <input type="text" name='Name' placeholder="Name" />
            </div>

            <div>
                <label htmlFor="Surname">Surname: </label>
                <input type="text" name='Surname' placeholder="Surname" />
            </div>

            <div>
                <label htmlFor="Nickname">Nickname: </label>
                <input type="text" name='Nickname' placeholder="Nickname" />
            </div>

            <div>
                <label htmlFor="E-mail">E-mail: </label>
                <input type="text" name='E-mail' placeholder="E-mail" />
            </div>

            <div>
                <label htmlFor="password">Password: </label>
                <input type="text" name='password' placeholder="Password" />
            </div>
            <input type="submit" value='Register'/>
        </form>
    )
}
