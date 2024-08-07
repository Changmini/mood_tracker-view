import { useState, useEffect } from 'react';
import $common from '../../../common';
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
    const [dailyInfo, setDailyInfo] = useState([]);
    const [dailyInfoList, setDailyInfoList] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    async function calendarRendering(formData) {
        const dailyInfoList = await $common.getCalendar(formData);
        if (!dailyInfoList)
            return ;
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
    const clickDailyInfo = (dailyInfo, index) => {
        let copy = JSON.parse(JSON.stringify(dailyInfo));
        setDailyInfo(copy);
        setModalIsOpen(true);
    }
    const saveDailyInfo = async () => {
        let f = new FormData(document.DailyDataForm);
        await $common.postDailyInfo(f);
        setModalIsOpen(false);

        // 굳이 저장할 때, 전체를 리렌더링할 필요가 있을까? 
        // 서버에 데이터를 보내주고 화면은 기존 데이터 사용해서 일부만 렌더링하도록 하자
        f = new FormData();
        f.append("date", date);
        await calendarRendering(f);
    }
    const updateDailyInfo = async () => {
        let f = new FormData(document.DailyDataForm);
        await $common.patchDailyInfo(f);
        setModalIsOpen(false);

        // 굳이 저장할 때, 전체를 리렌더링할 필요가 있을까? 
        // 서버에 데이터를 보내주고 화면은 기존 데이터 사용해서 일부만 렌더링하도록 하자
        f = new FormData();
        f.append("date", date);
        await calendarRendering(f);
    }

    useEffect(() => {
        const f = new FormData();
        f.append("date", date);
        calendarRendering(f); 
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
                    <div className="daily" onClick={()=>clickDailyInfo(e,i)} key={e.date}>
                        {e.date} <br/>
                        {e.noteTitle} <br/>
                        {e.noteContent} <br/>
                    </div>
                ))}
            </div>

            {/* =============================== 선택 날짜 상세보기 =============================== */}
            {modalIsOpen && (
            <form name="DailyDataForm">
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>나의 하루</h2>
                        <h5>{dailyInfo.date}</h5>
                        <input type="hidden" name="date" value={dailyInfo.date} />
                        <input type="hidden" name="noteId" value={dailyInfo.noteId} />
                        <input type="hidden" name="moodId" value={dailyInfo.moodId} />
                        <input type="hidden" name="dailyId" value={dailyInfo.dailyId} />
                        <div>
                            <label>
                                기분:
                                <select name="moodLevel" defaultValue={dailyInfo.moodLevel}>
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
                                제목:
                                <input type="text" name="noteTitle" defaultValue={dailyInfo.noteTitle} />
                            </label>
                        </div>
                        <div>
                            <label>
                                줄거리:
                                <textarea name="noteContent" defaultValue={dailyInfo.noteContent} />
                            </label>
                        </div>
                        {dailyInfo.dailyId == 0
                            ? <button onClick={()=>saveDailyInfo()}>저장</button>
                            : <button onClick={()=>updateDailyInfo()}>수정</button>
                        }
                        {/* 삭제는 다른 공간에서 할 수 있도록 하자!! */}
                        <button onClick={()=>setModalIsOpen(false)}>취소</button>
                    </div>
                </div>
            </form>
            )}
        </div>
    )
}