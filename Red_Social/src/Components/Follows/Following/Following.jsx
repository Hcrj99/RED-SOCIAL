import userEmpty from '../../../img/userempty.jpg';
import '../../Users/UsersPanel/UsersPanel.css';
import { Global } from '../../../Helpers/Global';
import { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useParams } from 'react-router-dom';


export const Following = () => {
    const { auth } = useAuth();
    const [users, setUsers] = useState([]);
    const [page, setpage] = useState(1);
    const [totalPage, setTotalPages] = useState();
    const [following, setFollowing] = useState([]);
    const params = useParams();

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async () => {
        //get user from url 
        const userId = params.userId;


        //fecth users
        const request = await fetch(Global.url + 'follow/following/' + userId + "/" + page, {
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
            cleanUsers = [...cleanUsers, follow.followed];
        });

        data.users = cleanUsers;

        //state list users
        if (data.users && data.status === 'success') {
            setUsers(data.users);
            setTotalPages(data.totalpages);
            setFollowing(data.userfollowing);
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

    return (
        <section className='users__container'>
            {users.map(user => {
                {
                    if (user._id != auth._id) {
                        return (
                            <article key={user._id} className='user__container-view'>
                                <figure>
                                    {user.image !== 'Default.png' ? <img src={Global.url + 'user/avatar/' + user.image} alt='user image'></img> : <img src={userEmpty} alt='user image'></img>}
                                </figure>
                                <div className='user__description'>
                                    <div className='user__description-ids'>
                                        <h4 className='nick'>@{user.nick}</h4>
                                        <h4 className='name'>{user.name} date</h4>
                                        <h4 className='bio'>{user.bio}</h4>
                                    </div>
                                </div>
                                <div className='social__methods'>
                                    {following.includes(user._id) && <button onClick={() => unFollow(user._id)}>UNFOLLOW</button>}
                                    {!following.includes(user._id) && <button onClick={() => follow(user._id)}>FOLLOW</button>}
                                </div>
                            </article>
                        );
                    }
                }
            })}
            <div className='move__paginate-users'>
                {page > 1 ? <button onClick={prevPage}>Prev</button> : ''}
                {page < totalPage ? <button onClick={nextPage}>Next</button> : ''}
            </div>
        </section>
    )
}
