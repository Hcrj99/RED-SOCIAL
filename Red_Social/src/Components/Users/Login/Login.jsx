export const Login = () => {
    return (
        <form className='Form__container' >
            <h2>Welcome!...</h2>
            <div>
                <label htmlFor="E-mail">E-mail: </label>
                <input type="text" name='E-mail' placeholder="E-mail" />
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input type="text" name='password' placeholder="Password" />
            </div>
            <input type="submit" value='Login'/>
        </form>
    )
}
