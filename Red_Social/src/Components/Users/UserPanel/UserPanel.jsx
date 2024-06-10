import './UserPanel.css';
import useAuth from "../../../Hooks/useAuth";
import { Global } from '../../../Helpers/Global';
import userEmpty from '../../../img/userempty.jpg';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import publicationEmpty from '../../../img/publicationempty.jpg';
import ReactTimeAgo from 'react-time-ago';

export const UserPanel = () => {

    const { auth , countFollowed , countFollowings } = useAuth();
    const [publications, setPublications] = useState([]);
    const [page, setpage] = useState(1);
    const [totalPage, setTotalPage] = useState();

    useEffect(() => {
        getPublications();
        if(page === 0)setpage(1);
    }, [page]);

    const getPublications = async () => {
        const userId = auth._id;

        const request = await fetch(Global.url + 'publication/getpublications/' + userId + '/' + page, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        });

        const data = await request.json();

        if (data.status === 'success' && data.publications) {
            setPublications(data.publications);
            setTotalPage(data.totalPages);
        } else if (data.status === 'success' && !data.publications) {
            setPublications([]);
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

    const deletePublication = async(publicationId) => {
        const request = await fetch(Global.url + 'publication/delete/' + publicationId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        });

        const data = await request.json();

        if(data.status === 'success'){
            setpage(0);
        }
    };

    return (
        <section className='section__user-profile'>
            <div className='profile__container'>
                <div className='profile1'>
                    <NavLink to={'/hs/followme/' + auth._id}>
                        <h2>{countFollowed}</h2>
                        <h4>Followers</h4>
                    </NavLink>
                    <figure>
                        {auth.image !== 'Default.png' ? <img src={Global.url + 'user/avatar/' + auth.image} alt='user image'></img> : <img src={userEmpty} alt='user image'></img>}
                    </figure>
                    <NavLink to={'/hs/following/' + auth._id}>
                        <h2>{countFollowings}</h2>
                        <h4>Following</h4>
                    </NavLink>
                </div>
                <div className='profile2'>
                    <h2>{auth.name}</h2>
                    <h3>@{auth.nick}</h3>
                    <h4>{auth.bio}</h4>
                </div>
                <Link to={'profile/' + auth._id} className='my__profile'>
                    <h2>My profile</h2>
                </Link>
            </div>
            <div className='history__container-user'>
                {publications.map(publication => {
                    return (
                        <article key={publication._id} className='publication__container-user'>
                            <figure>
                                {publication.file ? <img src={Global.url + 'publication/media/' + publication.file} alt='user image'></img> : <img src={publicationEmpty} alt='publication image'></img>}
                            </figure>
                            <div className="title__publication">
                                <div className="text">
                                    <h3>{publication.user.name}</h3>
                                    <h3 className="description">{publication.text}</h3>
                                </div>
                                <h4 className='time'>{<ReactTimeAgo date={publication.createat}/>}</h4> 
                            </div>
                            <div className='button__publication'>
                                <button onClick={() => deletePublication(publication._id)}>Delete</button>
                            </div>
                        </article>
                    );
                })}
            </div>
            <div className='move__paginate-users'>
                {publications.length > 0 && page > 1 ? <button onClick={prevPage}>Prev</button> : ''}
                {publications.length > 0 && page < totalPage ? <button onClick={nextPage}>More</button> : ''}
            </div>
        </section>
    )
}
