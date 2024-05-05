import { useState } from "react";

export const useForm = ( objetoInicial = {}) => {

    const [formulary, setForm] = useState(objetoInicial);


    const serializeForm = (formulary) => {
        const fromData = new FormData(formulary);

        const completeObject = {};  

        for (let [name, value] of fromData) {
            completeObject[name] = value;
        }

        return completeObject;
    };


    const sent = (e) => {
        e.preventDefault();

        let data =serializeForm(e.target);

        setForm(data);
    };

    const changed = ({ target }) => {
        const { name, value } = target;

        setForm({
            ...formulary,
            [name]:value
        });
    }

    return {
        formulary,
        sent,
        changed,
    }
}