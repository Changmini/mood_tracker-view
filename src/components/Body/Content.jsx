import commonAPI from '../../common';
import { useEffect, useState } from 'react';

export default function Context() {
    
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
            {/* <div onClick={getName}>{name}</div>
            <button onClick={getName}>Button</button> */}
            
        </div>
    );
};


