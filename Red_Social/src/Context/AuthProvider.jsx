import { createContext, useEffect, useState } from "react";
import { PropTypes } from 'prop-types';
import { Global } from "../Helpers/Global";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({});

    useEffect(() => {
        authUser()
    },[]);

    const authUser = async() => {
        //get data user loged from local storage
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        //verificate token + user
        if(!token || !user ){
            return false;
        }
        //transform object in javascript
        const userObject = JSON.parse(user);
        const userId = userObject.id;

        console.log(token);

        const options = {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "Authorization": token
            }
        }
        //ajax verificate token 
        const request = await fetch(Global.url + 'user/profile/' + userId, options);
        const data = await request.json();
        console.log(data);
        //set auth state
        setAuth(data.user);
    }

    return (
        <AuthContext.Provider
            value={{
                    auth,
                    setAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node,
}

export default AuthContext;
