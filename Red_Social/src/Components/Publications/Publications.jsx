import { useEffect, useState } from 'react';
import userEmpty from '../../img/userempty.jpg';
import { useParams } from 'react-router-dom';
import publicationEmpty from '../../img/publicationempty.jpg';
import { Global } from '../../Helpers/Global';

export const Publications = () => {
  const params = useParams();
  const [publications, setPublications] = useState([]);
  const [page, setpage] = useState(1);
  const [totalPage, setTotalPage] = useState();

  useEffect(() => {
    getPublications();
  }, [page]);

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
      setTotalPage(data.totalPages);
    } else if (data.status === 'success' && !data.publications) {
      setPublications([]);
    }
  };

  return (
    <div className='history__container'>
      {publications.map(publication => {
        return (
          <article key={publication._id} className='publication__container'>
            <figure>
              {publication.file ? <img src={Global.url + 'publication/media/' + publication.file} alt='user image'></img> : <img src={publicationEmpty} alt='publication image'></img>}
            </figure>
            <div className="title__publication">
              <div className="text">
                <h3>{publication.user.name}</h3>
                <h3 className="description">{publication.text}</h3>
              </div>
              <h4>{publication.createat}</h4>
            </div>
          </article>
        );
      })}
    </div>
  )
}
