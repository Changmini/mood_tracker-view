import { useState, useEffect } from 'react';
import $common from '../../../common'
export default function Calendar(activeMenu) {

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
    const [dailybox, setDailybox] = useState([]);
    const [modalData, setModalData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
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
    const clickDailybox = (dailyEntry) => {
        let copy = JSON.parse(JSON.stringify(dailyEntry));
        setModalData(copy);
        setModalIsOpen(true);
    }
    const saveDailyEntry = () => {
        const dailyData = document.getElementById("FormDailyData");
        const f = new FormData(dailyData);
        // $common.insertDailyData();
        setModalIsOpen(false);
    }

    useEffect(() => {
        async function fetchData(formData) {
            const dailyEntryList = await $common.getCalendar(formData);
            if (!dailyEntryList)
                return ;
            setDailybox(dailyEntryList);
        }; 
        const f = new FormData();
        f.append("date", date);
        fetchData(f); 
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
                {dailybox.map(e => (
                    <div className="daily" onClick={()=>clickDailybox(e)} key={e.date}>
                        {e.date} <br/>
                        {e.title} <br/>
                        {e.notes} <br/>
                    </div>
                ))}
            </div>

            {/* =============================== 선택 날짜 상세보기 =============================== */}
            {modalIsOpen && (
                <form id="FormDailyData">
                <div className="modal-overlay">
                <div className="modal-content">
                    <h2>나의 하루</h2> <h5>{modalData.date}</h5>
                    <div>
                    <label>
                        기분:
                        <select name="mood" defaultValue={modalData.mood}>
                        <option value="">당신의 하루를 표현해주세요</option>
                        <option value="100">환희</option>
                        <option value="85">기쁨</option>
                        <option value="70">만족</option>
                        <option value="50">보통</option>
                        <option value="30">우울</option>
                        <option value="15">슬픔</option>
                        <option value="0">절망</option>
                        </select>
                    </label>
                    </div>
                    <div>
                    <label>
                        줄거리:
                        <textarea name="notes" defaultValue={modalData.notes} />
                    </label>
                    </div>
                    <button onClick={()=>saveDailyEntry()}>Save</button>
                    <button onClick={()=>setModalIsOpen(false)}>Cancel</button>
                </div>
                </div>
                </form>
            )}
        </div>
    )
}