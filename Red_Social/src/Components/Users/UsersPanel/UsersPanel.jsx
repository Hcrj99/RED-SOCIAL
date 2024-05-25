import userEmpty from '../../../img/userempty.jpg';
import './UsersPanel.css';
import { Global } from '../../../Helpers/Global';
import { useEffect, useState } from 'react';

export const UsersPanel = () => {

    const [users, setUsers] = useState([]);
    const [page, setpage] = useState(1);
    const [totalPage, setTotalPages] = useState();
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        getUsers();
    }, [page])

    const getUsers = async () => {
        //fecth users
        const request = await fetch(Global.url + 'user/listprofiles/' + page, {
            method: 'GET',
            headers: {
                "contentType": "application/json",
                "Authorization": localStorage.getItem('token')
            }
        });

        const data = await request.json();
        //state list users
        if (data.users && data.status === 'success') {
            setUsers(data.users);
            setTotalPages(data.totalpages);
            setFollowing(data.following);
        }
    };

    const nextPage = () => {
        if (page < totalPage) {
            let next = page + 1;
            setpage(next);
        }
    }

    const prevPage = () => {
        if (page > 1) {
            let next = page - 1;
            setpage(next);
        }
    }

    return (
        <section className='users__container'>
            {users.map(user => {
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
                            {following.includes(user._id) ? <button>UNFOLLOW</button> : <button>FOLLOW</button>}        
                        </div>
                    </article>
                );
            })}
            <div className='move__paginate-users'>
                {page > 1 ? <button onClick={prevPage}>Prev</button> : ''}
                {page < totalPage ? <button onClick={nextPage}>Next</button> : ''}
            </div>
        </section>
    )
}
