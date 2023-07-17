import axios from 'axios';
import { useState } from 'react';

export default function AppHeader() {
    const [username, setUsername] = useState("홍길동");    

    return (
        <nav className='app-header'>
            <div className='logo'>
                <img src="" alt="" />
            </div>
            <div className='menu-list'>
                <ul>
                    <li onClick={()=>{}}><span>{username}님</span></li>
                    <li><span>sign in</span></li>
                    <li><span>menu icon</span></li>
                </ul>
            </div>
        </nav>
    );
};


