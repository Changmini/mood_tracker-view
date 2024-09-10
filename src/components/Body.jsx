import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import $common from '../common';
import Calendar from './Body/Calendar';
import Timeline from './Body/Timeline';
import Analysis from './Body/Analysis';

export default function AppBody() {
    const navigate = useNavigate();
    const [menuNumber, setMenuNumber] = useState(0);
    const [username, setUsername] = useState("Nothing");
    const sideMenu = [
        {
            name: "달력",
            icon: "bx bxs-calendar"
        }
        , {
            name: "연대표",
            icon: "bx bx-time-five"
        }
        , {
            name: "분석표",
            icon: "bx bx-bar-chart-alt-2"
        }
    ]; /* API 사용하여 데이터 세팅 */

    function menuBtnChange() {
        const sidebar = document.querySelector(".sidebar");
        const sbBtn = document.querySelector("#sbBtn");
        if (sidebar.classList.contains("open")) {
            sbBtn.classList.replace("bx-menu", "bx-menu-alt-right");
        } else {
            sbBtn.classList.replace("bx-menu-alt-right", "bx-menu");
        }
    }
    const closeBtn = () => {
        const sidebar = document.querySelector(".sidebar");
        sidebar.classList.toggle("open");
        menuBtnChange();
    }
    const searchBtn = () => {
        const sidebar = document.querySelector(".sidebar");
        sidebar.classList.toggle("open");
        menuBtnChange();
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
    async function checkUsername() {
        const name = await $common.getUsername();
        if (!name || name == "") {
            // logout을 시키고...
            navigate("/login");
        }
        setUsername(name);
    }
    async function logout() {
        $common.logout();
    }
    useEffect(() => {
        /* 초기 화면지정 */
        state();
        checkUsername();
    }, []);
    
    return (
        <div className='app-main'>
            <div className="sidebar">
                <div className="logo-details">
                    <i className='bx bx-walk icon'></i>
                    <div className="logo_name">Moodtracker</div>
                    <i className="bx bx-menu" id="sbBtn" onClick={closeBtn}></i>
                </div>
                <ul className="nav-list">
                    <li>
                        <i className="bx bx-search" onClick={searchBtn}></i>
                        <input type="text" placeholder="Search..." />
                        <span className="tooltip">Search</span>
                    </li>
                    {sideMenu.map((menu, i) => (
                        <li key={"menu"+i}>
                            <a href='#' onClick={()=>setMenuNumber(i)}>
                                <i className={menu.icon}></i>
                                <span className='links_name'>{menu.name}</span>
                            </a>
                            <span className="tooltip">{menu.name}</span>
                        </li>
                    ))}
                    <li className="profile">
                        <div className="profile-details">
                            <img src="profile.png" alt="profileImg" />
                            <div className="name_job">
                            <div className="name">{username}</div>
                            <div className="job">환영합니다.</div>
                            </div>
                        </div>
                        <Link to="/login">
                            <i className="bx bx-log-out" id="log_out" onClick={logout}></i>
                        </Link>
                    </li>
                </ul>
            </div>
            <section className='home-section'>
                {menuNumber==0 ? <Calendar/> : <div></div>}
                {menuNumber==1 ? <Timeline/> : <div></div>}
                {menuNumber==2 ? <Analysis/> : <div></div>}
            </section>
        </div>
    );
};