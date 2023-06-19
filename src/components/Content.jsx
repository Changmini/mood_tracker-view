import common from '../common';
import { useState } from 'react';

export default function MainPage() {
    
    let [name, setName] = useState("ChamgMin");
    let userId = 1;

    async function getName() {
        userId = userId === 1 ? 2 : 1;
        const user = await common.getUser(userId);
        if (user) { console.log(user);
            setName(user.username);
        } else {
            setName("호출된 번호에 맞는 사용자가 없습니다.");
        }
    }


    return (
        <>
            <div onClick={getName}>{name}</div>
            <button onClick={getName}>Button</button>
        </>
    );
};


