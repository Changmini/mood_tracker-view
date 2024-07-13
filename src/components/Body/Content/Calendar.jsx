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
    const [modalData, setModalData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleModalData = (dailyEntry) => {
        console.log("Daily", dailyEntry);
        setModalData(dailyEntry);
        setModalIsOpen(true);
    }

    const modalOnOff = (flag) => {
        setModalIsOpen(flag);
    }

    useEffect(() => {
        async function fetchData() {
            const dailyEntryList = await $common.getCalendar();
            if (!dailyEntryList)
                return ;
            setDailybox(dailyEntryList);
        }; 
        fetchData(); 
    }, []);

    return (
        <div id="calendar">
            {/* 
                달력의 박스를 하나의 컴포넌트로 제작하는 방식이 좋겠다. 
            */}
            {dailybox.map(e => (
                <DailyBox daily={e} sendDataToParent={handleModalData} key={e.date}></DailyBox>
            ))}

            {modalIsOpen && (
                <div className="modal-overlay">
                <div className="modal-content">
                    <h2>Add Your Mood</h2>
                    <div>
                    <label>
                        Mood:
                        <select value={modalData.mood}>
                        <option value="">Select your mood</option>
                        <option value="happy">Happy</option>
                        <option value="sad">Sad</option>
                        <option value="neutral">Neutral</option>
                        <option value="anxious">Anxious</option>
                        <option value="excited">Excited</option>
                        </select>
                    </label>
                    </div>
                    <div>
                    <label>
                        Note:
                        <textarea value={modalData.notes} />
                    </label>
                    </div>
                    <button onClick={()=>modalOnOff(false)}>Save</button>
                    <button onClick={()=>modalOnOff(false)}>Cancel</button>
                </div>
                </div>
            )}
        </div>
    )
}