import { useState } from 'react';
import $common from '../common';
function AppHeader() {
    const [username, setUsername] = useState("");    

    function MemberInfo () {
        $common.getUsername();
        if (username !== undefined && username !== "") {
            return (<>
                <li><span>Sign in</span></li>
                <li><span>Sign up</span></li>
            </>);
        } 
        return (<>
            <li onClick={()=>{}}><span>{username}님</span></li>
            <li><span>logout</span></li>
        </>);
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
                </ul>
            </div>
        </nav>
    );
}
export default AppHeader;