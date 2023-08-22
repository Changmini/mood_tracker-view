import axios from 'axios';
import { useState } from 'react';

export default function MainPage() {

    function testAction(e) {
        let p  = e.target;
        let textUnderbar = document.querySelector("#text-underbar");
        if (!textUnderbar) return ;
        if (textUnderbar.style.display !== "block") {
            textUnderbar.style.display = "block";
        }
        // textUnderbar.style.width = (p.offsetWidth - 5) + "px";
        textUnderbar.style.width = 6 + "rem";
        textUnderbar.style.top = (p.offsetTop + p.offsetHeight) + "px";
        textUnderbar.style.left = p.offsetLeft + "px";
    }

    return (
        <div className='sidebar'>
            <p>목 록</p>
            <section>
                <div id='text-underbar'></div>
                <ul>
                    <li onClick={testAction}>
                        <i className="fa-solid fa-calendar-days"></i>
                        <span>달력</span>
                    </li>
                    <li onClick={testAction}>
                        <i className="fa-solid fa-pen-to-square"></i>
                        <span>연대표</span>
                    </li>
                    <li onClick={testAction}>
                        <i className="fa-solid fa-chart-column"></i>
                        <span>분석표</span>
                    </li>
                </ul> 
            </section>
        </div>
    );
};


