import { useState, useEffect } from 'react';
import $common from '../../common';
import Modal from '../Etc/Modal'

export default function Calendar() {

    // [
    //     {
    //         date: "20240201" //(string)
    //         , year: 2024 //(int)
    //         , month: 2 //(int)
    //         , day: 1 //(int)
    //         , title: "스터디" // (string)
    //         , notes: "친구와 함께 투썸플레이스에서 공부를 했다." // (string)
    //         , picture: [
    //             {
    //                 url: "https://domain/picture/{id}/{number}"
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
    //         , notes: "친구와 함께 투썸플레이스에서 공부를 했다." // (string)
    //         , picture: [
    //             {
    //                 url: "https://domain/picture/{id}/{number}"
    //                 , detail: "스터디 1일차 사진" // (string)
    //             }
                
    //         ]
    //         , mood: 30 //(int) % 
    //     }
    // ]

    const [date, setDate] = useState((new Date()).toISOString().substring(0,7));
    const [dailyInfo, setDailyInfo] = useState([]);
    const [dailyInfoList, setDailyInfoList] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    async function calendarRendering() {
        /* request data */
        const f = new FormData();
        f.append("date", date);
        const dailyInfoList = await $common.getCalendar(f);
        /* check */
        if (!dailyInfoList)
            return ;
        /* setting */
        setDailyInfoList(dailyInfoList); console.log(dailyInfoList);
    }; 
    const selectDate = (e) => {
        const selectDate = e.target.value;
        if (!selectDate) 
            return ;
        setDate(selectDate);
    }
    const move = (type) => {
        const d = new Date(date+"-01");
        switch(type) {
            case "<":
                $common.changeDate(d, -1);
                break;
            case ">":
                $common.changeDate(d, 1);
                break;
            default :
        }
        setDate(d.toISOString().substring(0,7));
    }
    const openModal = (dailyInfo) => {
        let copy = JSON.parse(JSON.stringify(dailyInfo));
        setDailyInfo(copy);
        setModalIsOpen(true);
    }
    
    useEffect(() => {
        calendarRendering(); 
    }, [date]);
    
    return (
        <div className="calendar">
            {/* ===================================== 달력 ===================================== */}
            <div className="calendar-header">
                <a href='#' onClick={()=>move("<")}><i className="fa-solid fa-caret-left"></i></a>
                {/* <a href='#'><i className="fa-regular fa-square-caret-left"></i></a> */}
                <a href='#'><input id="inputDate" type="month" value={date} onChange={selectDate}/></a>
                <a href='#' onClick={()=>move(">")}><i className="fa-solid fa-caret-right"></i></a>
                {/* <a href='#'><i className="fa-solid fa-square-caret-right"></i></a> */}
            </div>
            <div className="calendar-content">
                <div>일</div>
                <div>월</div>
                <div>화</div>
                <div>수</div>
                <div>목</div>
                <div>금</div>
                <div>토</div>
                {dailyInfoList.map((e,i) => (
                    <div className="daily" onClick={()=>openModal(e,i)} key={e.date}>
                        {e.date} <br/>
                        {e.noteTitle} <br/>
                        {e.noteContent} <br/>
                    </div>
                ))}
            </div>

            {/* =============================== 선택 날짜 상세보기 =============================== */}
            <Modal open={modalIsOpen} setOpen={setModalIsOpen} data={dailyInfo} reRender={calendarRendering} />
        </div>
    )
}