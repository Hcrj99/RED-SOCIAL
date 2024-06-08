import { useEffect, useState } from 'react';
import userEmpty from '../../img/userempty.jpg';
import { useParams } from 'react-router-dom';
import publicationEmpty from '../../img/publicationempty.jpg';
import { Global } from '../../Helpers/Global';
import useAuth from '../../Hooks/useAuth';

export const PublicationsFollows = () => {
    const params = useParams();
    const [publications, setPublications] = useState([]);
    const [page, setpage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const { auth } = useAuth();

    useEffect(() => {
        getPublications();
    }, [page]);

    const getPublications = async () => {
        const request = await fetch(Global.url + 'publication/feed/' + page, {
            method: 'GET',
            headers: {
                'content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        });

        const data = await request.json();

        if (data.status == 'success' && data.publications) {
            setPublications(data.publications);
            setTotalPage(data.totalPages);
        } else if (data.status === 'success' && !data.publications) {
            setPublications([]);
        }
    };

    return (
        <div className='publications'>
            {publications.map(publication => {
                return (
                    <article key={publication._id} className='publication__container-card'>
                        <div className='user__panel'>
                            <NavLink to={'/hs/profile/' + publication.user._id}>
                                {auth.image !== 'Default.png' ? <img src={Global.url + 'user/avatar/' + auth.image} alt='user image'></img> : <img src={userEmpty} alt='user image'></img>}
                            </NavLink>
                            <div className='user__identifications'>
                                <div className='profile__pub'>
                                    <h3>@{auth.nick}</h3>
                                    <div className='profile__pub-text'>
                                        <h2>{auth.name}</h2>
                                        <h4>date</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text">
                            <h3 className="description">{publication.text}</h3>
                        </div>
                        <figure className='publication__image'>
                            {publication.file ? <img src={Global.url + 'publication/media/' + publication.file} alt='user image'></img> : <img src={publicationEmpty} alt='publication image'></img>}
                        </figure>
                    </article>
                );
            })}
        </div>
    )
}
