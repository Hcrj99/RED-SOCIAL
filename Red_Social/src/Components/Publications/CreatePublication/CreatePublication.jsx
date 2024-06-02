import { useState } from "react";
import { Global } from "../../../Helpers/Global";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "../../../Hooks/useForm";
import userEmpty from '../../../img/userempty.jpg';
import './CreatePublication.css';

export const CreatePublication = () => {

    const { auth } = useAuth();
    const { formulary, changed } = useForm({});
    const [publicated, setPublicated] = useState('notpublicated');

    const savePublication = async (event) => {
        event.preventDefault();

        console.log(auth._id);
        //get data from
        let newPublication = formulary;

        console.log(newPublication);

        newPublication.user = auth._id;

        console.log(newPublication);
        //request save in bd
        const request = await fetch(Global.url + 'publication/save', {
            method: 'POST',
            body: JSON.stringify(newPublication),
            headers: {
                "content-Type": "application/json",
                "Authorization": localStorage.getItem('token')
            }
        });

        const data = await request.json();

        console.log(data);

        if (data.status === 'success') {
            setPublicated('publicated');
        }else {
            setPublicated('error');
        }

        //load image
    }

    return (
        <section className="publicater">
            <figure>
                {auth.image !== 'Default.png' ? <img src={Global.url + 'user/avatar/' + auth.image} alt='user image'></img> : <img src={userEmpty} alt='user image'></img>}
            </figure>
            <form onSubmit={savePublication}>
                <div className="title__publication">
                    <label htmlFor="text">Share us your history</label>
                    <input type="text" name='text' placeholder='What do you think?' onChange={changed} />
                </div>
                <div className="send__publication">
                    <div id='file__publication'>
                        <p id='text__button'>Image</p>
                        <input type='file' name='file0' id='filep' />
                    </div>
                    <input type='submit' value='Publicate' />
                    <h2>{publicated === 'publicated'? "publication made" : " "}{publicated === 'error'? "The publication could not be made" : " "}</h2>
                </div>
            </form>
        </section>
    )
}
