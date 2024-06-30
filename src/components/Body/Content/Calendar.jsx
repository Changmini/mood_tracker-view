import { useState, useEffect } from 'react';
import DailyBox from './Calendar/DailyBox'
import $common from '../../../common'
export default function Calendar(activeMenu) {

    // [
    //     {
    //         date: "20240201" //(string)
    //         , year: 2024 //(int)
    //         , month: 2 //(int)
    //         , day: 1 //(int)
    //         , title: "스터디" // (string)
    //         , content: "친구와 함께 투썸플레이스에서 공부를 했다." // (string)
    //         , picture: [
    //             {
    //                 url: "https://domain/picture/{id}"
    //                 , detail: "스터디 1일차 사진" // (string)
    //             }
                
    //         ]
    //         , mood: 30 //(int) % 
    //     }
    //     ,{
    //         date: "20240202" //(string)
    //         , year: 2024 //(int)
    //         , month: 2 //(int)
    //         , day: 2 //(int)
    //         , title: "스터디" // (string)
    //         , content: "친구와 함께 투썸플레이스에서 공부를 했다." // (string)
    //         , picture: [
    //             {
    //                 url: "https://domain/picture/{id}"
    //                 , detail: "스터디 1일차 사진" // (string)
    //             }
                
    //         ]
    //         , mood: 30 //(int) % 
    //     }
    // ]

    
    const [dailybox, setDailybox] = useState([]);

    useEffect(() => {
        const res = $common.getCalendar();
        console.log(res);
    }, []);

    return (
        <div id="calendar">

        {/* 
            달력의 박스를 하나의 컴포넌트로 제작하는 방식이 좋겠다. 
        */}
        {dailybox.map(e => (<DailyBox daily={e} key={e.date}></DailyBox>))}
        </div>
    )
}