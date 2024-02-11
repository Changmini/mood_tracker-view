import React from 'react';
import { useEffect } from 'react';

export default React.memo(function Sidebar({sideMenu, onChange}) {

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

        if (index === null) return;
        onChange(index);
    }

    useEffect(() => {
        /* 초기 화면지정 */
        const li = document.querySelector(".sidebar ul li:nth-child(1)");
        selectMenu(li, null);
    }, []);

    return (
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
    );
}, (prev, next) => {
    return prev.length === next.length
});


