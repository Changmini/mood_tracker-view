import Calendar from './Body/Calendar';
import Timeline from './Body/Timeline';
import Analysis from './Body/Analysis';
import { useState, useEffect } from 'react';

export default function AppBody() {
    const [menuNumber, setMenuNumber] = useState(0);
    const sideMenu = [
        {
            name: "달력",
            icon: "fa-solid fa-calendar-days"
        }
        , {
            name: "연대표",
            icon: "fa-solid fa-book"
        }
        , {
            name: "분석표",
            icon: "fa-solid fa-magnifying-glass-chart"
        }
    ]; /* API 사용하여 데이터 세팅 */
    
    const selectMenu = (e, index) => {
        let p  = e.target || e;
        let textUnderbar = document.querySelector("#text-underbar");
        if (!textUnderbar) return ;

        const s = textUnderbar.style;
        if (s.display !== "block") {
            s.display = "block";
        }
        s.width = 6 + "rem";
        s.top = (p.offsetTop + p.offsetHeight) + "px";
        s.left = p.offsetLeft + "px";
        
        if (index==undefined || index==null) 
            return ;
        setMenuNumber(index);
    }

    useEffect(() => {
        /* 초기 화면지정 */
        const li = document.querySelector(".sidebar ul li:nth-child(1)");
        selectMenu(li, null);
    }, []);
    
    return (
        <div className='app-main'>
            <div className='sidebar'>
                <section>
                    {/* <span>&#9204;</span> */}
                    <p>목 록</p>
                </section>
                <section>
                    <div id='text-underbar'></div>
                    <ul>
                    {
                        sideMenu.map((menu, i) => (
                            <li onClick={(e)=>selectMenu(e, i)} key={"menu"+i}>
                                <i className={menu.icon}></i>
                                <span>{menu.name}</span>
                            </li>
                        ))
                    }
                    </ul> 
                </section>
            </div>
            <div className='content-main'>
                {menuNumber==0 ? <Calendar/> : <div></div>}
                {menuNumber==1 ? <Timeline/> : <div></div>}
                {menuNumber==2 ? <Analysis/> : <div></div>}
            </div>
        </div>
    );
};


