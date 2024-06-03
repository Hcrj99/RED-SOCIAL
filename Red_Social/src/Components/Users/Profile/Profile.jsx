import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { Global } from "../../../Helpers/Global";
import userEmpty from '../../../img/userempty.jpg';

export const Profile = () => {
    const params = useParams();
    const [user, setUser] = useState({});
    const [countFollowed, setCountFollowed] = useState();
    const [countFollowings, seCountFollowings] = useState();

    useEffect(() => {
        getProfile();
        getCounters();
    }, [params.userId]);

    const getProfile = async () => {
        const userId = params.userId;

        const request = await fetch(Global.url + 'user/profile/' + userId, {
            method: 'GET',
            headers: {
                "content-Type": "application/json",
                "Authorization": localStorage.getItem('token')
            }
        });

        const data = await request.json();

        if (data.status === 'success') {
            setUser(data.user);
        }
    };

    const getCounters = async () => {
        const userId = params.userId;

        const options = {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('token')
            }
        }
        //get followed + followers
        const requestFollowers = await fetch(Global.url + 'follow/followers/' + userId, options);
        const countFollowers = await requestFollowers.json();
        //set count followers
        setCountFollowed(countFollowers.total);

        const requestFollowing = await fetch(Global.url + 'follow/following/' + userId, options);
        const countFollowing = await requestFollowing.json();
        //set count following
        seCountFollowings(countFollowing.total);
    };

    return (
        <section className='section__user-profile'>
            <div className='profile__container'>
                <div className='profile1'>
                    <Link to={'/hs/followme/' + user._id}>
                        <h2>{countFollowed}</h2>
                        <h4>Followers</h4>
                    </Link>
                    <figure>
                        {user.image !== 'Default.png' ? <img src={Global.url + 'user/avatar/' + user.image} alt='user image'></img> : <img src={userEmpty} alt='user image'></img>}
                    </figure>
                    <Link to={'/hs/following/' + user._id}>
                        <h2>{countFollowings}</h2>
                        <h4>Following</h4>
                    </Link>
                </div>
                <div className='profile2'>
                    <h2>{user.name}</h2>
                    <h3>@{user.nick}</h3>
                    <h4>{user.bio}</h4>
                </div>
            </div>
            <div className='history__container'>
                <h2>My publication</h2>
            </div>
        </section>
    )
}

