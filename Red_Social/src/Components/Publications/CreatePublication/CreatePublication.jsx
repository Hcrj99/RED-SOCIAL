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
        //get data from
        let newPublication = formulary;

        newPublication.user = auth._id;

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

        if (data.status === 'success') {
            setPublicated('publicated');
        } else {
            setPublicated('error');
        }

        //load image
        const fileInput = document.querySelector('#filep');

        if (data.status === 'success' && fileInput.files[0]) {

            const formData = new FormData();
            formData.append('file0', fileInput.files[0]);

            const requestUpload = await fetch(Global.url + 'publication/upload/' + data.publicationStore._id, {
                method: 'POST',
                body: formData,
                headers: {
                    "Authorization": localStorage.getItem('token')
                }
            });

            const dataUpload = await requestUpload.json();

            if (dataUpload.status === 'success') {
                setPublicated('publicated');
            }
            else{
                setPublicated('error');
            }

            if(data.status === 'success' || dataUpload.status === 'sucess'){
                const myForm = document.querySelector('#form__publication');
                myForm.reset();
            }
        }
    }

    return (
        <section className="publicater">
            <figure>
                {auth.image !== 'Default.png' ? <img src={Global.url + 'user/avatar/' + auth.image} alt='user image'></img> : <img src={userEmpty} alt='user image'></img>}
            </figure>
            <form onSubmit={savePublication} id='form__publication'>
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
                    <h2>{publicated === 'publicated' ? "publication made" : " "}{publicated === 'error' ? "The publication could not be made" : " "}</h2>
                </div>
            </form>
        </section>
    )
}
