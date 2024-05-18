import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../../Hooks/useAuth";

export const LogOut = () => {

    const navigate = useNavigate();
    const { setAuth } = useAuth();

    useEffect(()=>{
        //clean localstoreage
        localStorage.clear();
        //set status global to empty
        setAuth({});
        //navilink to login
        navigate('/login');
    },[])

    return (
        <h1>Close session...</h1>
    )
}
