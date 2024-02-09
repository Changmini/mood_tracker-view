import commonAPI from '../../common';
import { useEffect, useState } from 'react';

export default function Context({menu}) {

    console.assert(menu > 0);

    // let [name, setName] = useState("ChamgMin");
    // let [userId, setUserId] = useState(1);

    // useEffect(() => {
    //     setUserId(userId === 1 ? 2 : 1);
    // }, [name]);

    // async function getName() {
    //     const user = await commonAPI.getUser(userId);
    //     if (user) { 
    //         setName(user.username);
    //     } else {
    //         setName("호출된 번호에 맞는 사용자가 없습니다.");
    //     }
    // }
    
    return (
        <div className='content-main'>
            {/* 달력의 박스를 하나의 컴포넌트로 제작하는 방식이 좋겠다. */}
            {/* <div onClick={getName}>{name}</div>
            <button onClick={getName}>Button</button> */} 
        </div>
    );
};


