import Sidebar from './Body/Sidebar'
import Content from './Body/Content'
import axios from 'axios';
import { useState } from 'react';

export default function AppBody() {
    const [username, setUsername] = useState("홍길동");
    const [varMenuNumber, setVarMenuNumber] = useState(0);

    function menuNumber(num) {
        console.log("Change Menu: ", num);
        setVarMenuNumber(num);
    }

    return (
        <div className='app-main'>
            <Sidebar onChange={menuNumber}/>
            <Content menu={varMenuNumber}/>
        </div>
    );
};


