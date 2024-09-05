import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import $common from '../common';
import Calendar from './Body/Calendar';
import Timeline from './Body/Timeline';
import Analysis from './Body/Analysis';

export default function AppBody() {
    const [menuNumber, setMenuNumber] = useState(0);
    const navigate = useNavigate();
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

    /* [localStrage 사용 이유]
     * 서버에서 로그인 성공 후, Session을 세팅하기 전에 
     * state를 먼저 호출하기 때문에
     * 초기 로그인 상태 확인을 localStrage를 사용해서 처리한다.
     */
    async function state() {
        const is = await $common.loginStatus();
        if (is || localStorage.getItem("LOGIN")) 
            navigate("/");
        else
            navigate("/login"); 
        localStorage.removeItem("LOGIN");// 로그인 때, 설정되는 값
    }

    useEffect(() => {
        /* 초기 화면지정 */
        state();
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


