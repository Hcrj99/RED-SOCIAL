import { useEffect, useState } from 'react';
import userEmpty from '../../img/userempty.jpg';
import { NavLink } from 'react-router-dom';
import { Global } from '../../Helpers/Global';
import './Publications.css';
import useAuth from '../../Hooks/useAuth';
import ReactTimeAgo from 'react-time-ago';

export const Publications = () => {
  const [publications, setPublications] = useState([]);
  const [page, setpage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const { auth } = useAuth();
  const [newPublication, setNewPublications] = useState(false);

  useEffect(() => {
    getPublications();
  }, []);

  useEffect(() => {
    getPublications();
    setNewPublications(false);
  }, [page, newPublication]);

  const getPublications = async () => {
    const request = await fetch(Global.url + 'publication/publications/' + page, {
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    });

    const data = await request.json();

    if (data.status == 'success' && data.publications) {
      setPublications(data.publications);
      setTotalPage(data.totalpages);
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

  const newPublications = () => {
    setPublications([]);
    setNewPublications(true);
  };

  return (
    <div className='publications'>
      <button className='new__publications' onClick={newPublications}>New publications</button>
      {publications.map(publication => {
        return (
          <article key={publication._id} className='publication__container-card'>
            <div className='user__panel'>
              <NavLink to={'/hs/profile/' + publication.user._id}>
                {publication.user.image !== 'Default.png' ? <img src={Global.url + 'user/avatar/' + publication.user.image} alt='user image'></img> : <img src={userEmpty} alt='user image'></img>}
              </NavLink>
              <div className='user__identifications'>
                <div className='profile__pub'>
                  <h3>@{publication.user.nick}</h3>
                  <div className='profile__pub-text'>
                    <h2>{publication.user.name}</h2>
                    <h4 className='time'>{<ReactTimeAgo date={publication.createat} />}</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="text__publication">
              <h3 className="description">{publication.text}</h3>
            </div>
            {publication.file ? (
              <figure className='publication__image'>
                {publication.file ? <img src={Global.url + 'publication/media/' + publication.file} alt='user image'></img> : ""}
              </figure>
            ) : ''}
            <div className='interactuation__user-loged'>
              <figure className='image__user-loged' to={'/hs/profile/' + publication.user._id}>
                {auth.image !== 'Default.png' ? <img src={Global.url + 'user/avatar/' + auth.image} alt='user image'></img> : <img src={userEmpty} alt='user image'></img>}
              </figure>
              <input type='text' placeholder='Write your comment'></input>
            </div>
          </article>
        );
      })}
      <div className='move__paginate-users'>
        {publications.length > 0 && page > 1 ? <button onClick={prevPage}>Prev</button> : ''}
        {publications.length > 0 && page < totalPage ? <button onClick={nextPage}>More</button> : ''}
      </div>
    </div>
  )
}
