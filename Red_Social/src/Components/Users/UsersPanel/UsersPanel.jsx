import userEmpty from '../../../img/userempty.jpg';
import './UsersPanel.css';
import { Global } from '../../../Helpers/Global';
import { useEffect, useState } from 'react';

export const UsersPanel = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async () => {
        //fecth users
        const request = await fetch(Global.url + 'user/listprofiles', {
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

            console.log(users)  //paginate
        }
    };

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
                            </div>
                            <div>{user.bio}</div>
                        </div>
                        <div className='social__methods'>
                            <button>FOLLOW</button>
                            <button>UNFOLLOW</button>
                        </div>
                    </article>
                );
            })}
        </section>
    )
}
