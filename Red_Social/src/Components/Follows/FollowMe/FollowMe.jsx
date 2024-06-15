import userEmpty from '../../../img/userempty.jpg';
import './Follows.css';
import { Global } from '../../../Helpers/Global';
import { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { NavLink, useParams } from 'react-router-dom';
import { Loading } from '../../Loading/Loading';
import ReactTimeAgo from 'react-time-ago';

export const FollowMe = () => {
    const { auth } = useAuth();
    const [users, setUsers] = useState([]);
    const [page, setpage] = useState(1);
    const [totalPage, setTotalPages] = useState();
    const [following, setFollowing] = useState([]);
    const params = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUsers();
    }, [page])

    const getUsers = async () => {
        //get user from url 
        const userId = params.userId;

        //fecth users
        const request = await fetch(Global.url + 'follow/followers/' + userId + "/" + page, {
            method: 'GET',
            headers: {
                "content-Type": "application/json",
                "Authorization": localStorage.getItem('token')
            }
        });

        const data = await request.json();

        let cleanUsers = [];

        //clean follows
        data.follows.forEach(follow => {
            cleanUsers = [...cleanUsers, follow.user];
        });

        data.users = cleanUsers;

        //state list users
        if (data.users && data.status === 'success') {
            setUsers(data.users);
            setTotalPages(data.totalpages);
            setFollowing(data.userfollowme);
            setLoading(false);
        }
    };

    const nextPage = () => {
        if (page < totalPage) {
            let next = page + 1;
            setpage(next);
        }
    };

    const prevPage = () => {
        if (page > 1) {
            let next = page - 1;
            setpage(next);
        }
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
            setFollowing([...following, userId]);
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
            let filter = following.filter(followingUser => userId !== followingUser);
            setFollowing(filter);
        }
    };
    if (loading) {
        <Loading />
    } else {
        return (
            <section className='users__container'>
                {(users.length > 0) ? users.map(user => {
                    if ((user._id != auth._id) || ((params.userId != auth._id) && (user._id == auth._id))) {
                        return (
                            <article key={user._id} className='user__container-view-2'>
                                <NavLink to={'/hs/profile/' + user._id} className='image__perfil'>
                                    {user.image !== 'Default.png' ? <img src={Global.url + 'user/avatar/' + user.image} alt='user image'></img> : <img src={userEmpty} alt='user image'></img>}
                                </NavLink>
                                <div className='user__description'>
                                    <div className='user__description-ids'>
                                        <NavLink to={'/hs/profile/' + user._id} className='nick'>@{user.nick}</NavLink>
                                        <div className='user__time'>
                                            <h4 className='name'>{user.name}</h4>
                                            <h3 className='time'>{<ReactTimeAgo date={user.createAt} />}</h3>
                                        </div>
                                        <h4 className='bio'>{user.bio}</h4>
                                    </div>
                                </div>
                                <div className='social__methods'>
                                    {(following.includes(user._id) && (user._id != auth._id)) && <button onClick={() => unFollow(user._id)}>UNFOLLOW</button>}
                                    {(!following.includes(user._id) && (user._id != auth._id)) && <button onClick={() => follow(user._id)}>FOLLOW</button>}
                                </div>
                            </article>
                        );
                    }
                }) : <h2>the user does not have followers yet</h2>}
                <div className='move__paginate-users'>
                    {page > 1 ? <button onClick={prevPage}>Prev</button> : ''}
                    {page < totalPage ? <button onClick={nextPage}>Next</button> : ''}
                </div>
            </section>
        )
    }
}
