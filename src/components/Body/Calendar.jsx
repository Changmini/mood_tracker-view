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

    const today = (new Date()).toISOString().substring(0,10);
    const [date, setDate] = useState(today.substring(0,7));
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
        setDailyInfoList(dailyInfoList);
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
    
    return (<>
        <div className="calendar">
            {/* ===================================== 달력 ===================================== */}
            <div className="calendar-header">
                <span className='pointer txt-white' onClick={()=>move("<")}><i className='bx bxs-left-arrow'></i></span>
                <input id="inputDate" type="month" value={date} onChange={selectDate}/>
                <span className='pointer txt-white' onClick={()=>move(">")}><i className='bx bxs-right-arrow'></i></span>
            </div>
            <div className="calendar-content">
                <div className='day txt4'>일</div>
                <div className='day txt4'>월</div>
                <div className='day txt4'>화</div>
                <div className='day txt4'>수</div>
                <div className='day txt4'>목</div>
                <div className='day txt4'>금</div>
                <div className='day txt4'>토</div>
                {dailyInfoList.map((e,i) => (
                    <div className={`daily txt3-b ${e.date.substring(0,7)!=date?"opacity":""}`} 
                        onClick={()=>openModal(e,i)} key={e.date}>
                        <p className={e.dailyId ? "compl" : ""}>
                            <span className={`${today==e.date.substring(0,10) ? "today" : ""}`}>
                                {e.date.substring(8,10)}</span></p>
                        <h5>T:</h5><span className='txt3'>{e.noteTitle}</span> <br/>
                        <h5>C:</h5><span className='txt3'>{e.noteContent}</span> <br/>
                    </div>
                ))}
            </div>
        </div>
        {/* =============================== 선택 날짜 상세보기 =============================== */}
        <Modal open={modalIsOpen} 
            setOpen={setModalIsOpen} 
            data={dailyInfo} 
            reRender={calendarRendering} />
    </>)
}