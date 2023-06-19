import axios from 'axios';
import { useState } from 'react';

export default function MainPage() {
    
    let [name, setName] = useState("ChamgMin");

    async function getName() {
        let PATH = "/users/";
        let QueryString = "1";

        const res = await axios.get(PATH + QueryString);
        if (res.data) {
            setName(res.data.username);
        }
    }

    async function getData() {
        const res = await axios.get("/users/1");
        if (res.data) {
            console.log(res.data);
        }
    }

    return (
        <>
            <div onClick={getName}>{name}</div>
            <button onClick={getData}>Button</button>
        </>
    );
};


