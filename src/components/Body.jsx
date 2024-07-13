import Calendar from './Body/Content/Calendar';
import Timeline from './Body/Content/Timeline';
import Analysis from './Body/Content/Analysis';
import Content from './Body/Content'
import { useState, useEffect } from 'react';

export default function AppBody() {
    const [menuNumber, setMenuNumber] = useState(0);
    const sideMenu = [
        {
            name: "달력",
            component: Calendar
        }
        , {
            name: "연대표",
            component: Timeline
        }
        , {
            name: "분석표",
            component: Analysis
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
                                <i className="fa-solid fa-calendar-days"></i>
                                <span>{menu.name}</span>
                            </li>
                        ))
                    }
                    </ul> 
                </section>
            </div>
            <Content sideMenu={sideMenu} menuNumber={menuNumber} />
        </div>
    );
};


