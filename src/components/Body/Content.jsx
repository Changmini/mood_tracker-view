import React from 'react';

export default function Context({components}) {

    // console.log(sideMenu[menuNumber].name);

    // let [name, setName] = useState("ChamgMin");
    // let [userId, setUserId] = useState(1);

    // useEffect(() => {
    //     setUserId(userId === 1 ? 2 : 1);
    // }, [name]);

    // async function getName() {
    //     const user = await commonAPI.getUser(userId);
    //     if (user) { 
    //         setName(user.username)
    //     } else {
    //         setName("호출된 번호에 맞는 사용자가 없습니다.");
    //     }
    // }
    
    return (
        <div className='content-main'>
            {
                components
            }
        </div>
    );
};


