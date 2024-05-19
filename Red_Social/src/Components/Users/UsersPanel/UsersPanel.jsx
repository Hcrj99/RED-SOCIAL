import userEmpty from '../../../img/userempty.jpg';
import './UsersPanel.css';

export const UsersPanel = () => {
    return (
        <section className='users__container'>
            <article className='user__container-view'>
                <figure>
                    <img src={ userEmpty }/>
                </figure>
                <div className='user__description'>
                    <div>nick | name | date</div>
                    <div>Biography</div>
                </div>
                <div className='social__methods'>
                    <button>FOLLOW</button>
                    <button>UNFOLLOW</button>
                </div>
            </article>
        </section>
    )
}
