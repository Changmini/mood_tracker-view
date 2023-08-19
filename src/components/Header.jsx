import axios from 'axios';
import { useState } from 'react';

function AppHeader() {
    const [username, setUsername] = useState("");    

    function MemberInfo () {
        if (username !== undefined && username !== "") {
            return (<li onClick={()=>{}}><span>{username}님</span></li>);    
        } 
    }

    return (
        <nav className='app-header'>
            <div className='logo'>
                <img src="" alt="" />
            </div>
            <div className='menu-list'>
                <ul>
                    <MemberInfo />
                    <li><span>Sign in</span></li>
                    <li><a href="#" className="sandwich-menu">
                    </a></li>
                </ul>
            </div>
        </nav>
    );
}
export default AppHeader;