import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { Global } from "../../../Helpers/Global";
import userEmpty from '../../../img/userempty.jpg';
import useAuth from '../../../Hooks/useAuth';

export const Profile = () => {
    const params = useParams();
    const [user, setUser] = useState({});
    const [countFollowed, setCountFollowed] = useState();
    const [countFollowings, seCountFollowings] = useState();
    const [iFollow, setIfollow] = useState(false);

    useEffect(() => {
        getDataUser();
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

        return data;
    };

    const getDataUser = async() => {
        setIfollow(false);
        let data = await getProfile();
        console.log(data.following.followed);
        if(data.following.followed) setIfollow(true);
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

    const follow = async (userId) => {
        //fecth save follow
        const request = await fetch(Global.url + 'follow/save/', {
            method: 'POST',
            body: JSON.stringify({ followed: userId }),
            headers: {
                "content-Type": "application/json",
                "Authorization": localStorage.getItem('token')
            }
        });
        const data = await request.json();
        //add new follow
        if (data.status === 'success') {
           setIfollow(true);
        }
    };

    const unFollow = async (userId) => {
        //fecth save follow
        const request = await fetch(Global.url + 'follow/unfollow/' + userId, {
            method: 'DELETE',
            headers: {
                "contentType": "application/json",
                "Authorization": localStorage.getItem('token')
            }
        })

        const data = await request.json();
        //add  unfollow
        if (data.status === 'success') {
           setIfollow(false);
        }
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
                <div className='social__methods'>
                    {iFollow ? <button onClick={() => unFollow(user._id)}>UNFOLLOW</button> : <button onClick={() => follow(user._id)}>FOLLOW</button>}
                </div>
            </div>
            <div className='history__container'>
                <h2>Publications</h2>
            </div>
        </section>
    )
}

