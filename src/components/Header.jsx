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
            <div className='header-left'>
                <ul>
                    {/* <li><a href="#" className="sandwich-menu"></a></li>
                    <li><div className='sandwicth-div-line'></div></li> */}
                    <li><img src="" alt="" /></li>
                </ul>
            </div>
            <div className='header-right'>
                <ul>
                    <MemberInfo />
                    <li><span>Sign in</span></li>
                    <li><span>Sign up</span></li>
                </ul>
            </div>
        </nav>
    );
}
export default AppHeader;