import { createContext, useEffect, useState } from "react";
import { PropTypes } from 'prop-types';
import { Global } from "../Helpers/Global";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({});
    const [countFollowed , setCountFollowed] = useState();
    const [countFollowings, seCountFollowings] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        authUser()
    },[]);

    const authUser = async() => {
        //get data user loged from local storage
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        //verificate token + user
        if(!token || !user ){
            setLoading(false);
            return false;
        }
        //transform object in javascript
        const userObject = JSON.parse(user);
        const userId = userObject.id;

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
        //set auth state
        setAuth(data.user);

        //get followed + followers
        const requestFollowers = await  fetch(Global.url + 'follow/followers/' + userId, options);
        const countFollowers = await requestFollowers.json();
        //set count followers
        setCountFollowed(countFollowers.total);

        const requestFollowing = await  fetch(Global.url + 'follow/following', options);
        const countFollowing = await requestFollowing.json();
        //set count following
        seCountFollowings(countFollowing.total);

        setLoading(false);
    }

    return (
        <AuthContext.Provider
            value={{
                    auth,
                    countFollowed,
                    countFollowings,
                    loading,
                    setAuth,
                    setCountFollowed,
                    seCountFollowings
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
