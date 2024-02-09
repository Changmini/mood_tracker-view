import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Sidebar({onChange}) {

    const sideMenu = ["달력", "연대표", "분석표"] /* API 사용하여 데이터 세팅 */;
    const selectMenuNumber = 1;

    /*
        형제 컴포넌트로 데이터를 전송하는 방법
        https://velog.io/@dev_seongjoo/React%EC%97%90%EC%84%9C-%ED%98%95%EC%A0%9C-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EA%B0%84%EC%97%90-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%A0%84%EB%8B%AC%EC%9D%80-%EC%96%B4%EB%96%BB%EA%B2%8C-%ED%95%98%EB%82%98%EC%9A%94
    */

    function testAction(e, index) {
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

        onChange(index);
    }

    useEffect(() => {
        const menu = document.querySelector(".sidebar ul li:nth-child("+selectMenuNumber+")");
        testAction(menu, selectMenuNumber);
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
                    sideMenu.map((name, i) => (
                        <li onClick={(e)=>testAction(e, (i+1))} key={"menu"+i}>
                            <i className="fa-solid fa-calendar-days"></i>
                            <span>{name}</span>
                        </li>    
                    ))
                }
                </ul> 
            </section>
        </div>
    );
};


