import axios from 'axios';
import { useState } from 'react';

export default function MainPage() {

    function testAction() {
        console.log("good");
    }

    return (
        <div className='sidebar'>
            <p>목 록</p>
            <section>
                <ul>
                    <li onClick={testAction}>
                        <i className="fa-solid fa-calendar-days"></i>
                        <span>달력</span>
                    </li>
                    <li>
                        <i className="fa-solid fa-pen-to-square"></i>
                        <span>연대표</span>
                    </li>
                    <li>
                        <i className="fa-solid fa-chart-column"></i>
                        <span>분석표</span>
                    </li>
                </ul> 
            </section>
        </div>
    );
};


