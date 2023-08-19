import Sidebar from './Body/Sidebar'
import Content from './Body/Content'
import axios from 'axios';
import { useState } from 'react';

export default function AppBody() {
    const [username, setUsername] = useState("홍길동");    

    return (
        <div className='app-main'>
            <Sidebar />
            <Content />
        </div>
    );
};


