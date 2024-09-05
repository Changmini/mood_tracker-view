import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import $common from '../common';
function AppHeader() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("Nothing");

    async function logout() {
        $common.logout();
    }
        
    async function checkUsername() {
        const name = await $common.getUsername();
        if (!name || name == "") {
            // logout을 시키고...
            navigate("/login");
        }
        setUsername(name);
    }

    useEffect(() => {
        checkUsername();
    }, []);

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
                    <li onClick={()=>{}}><span>{username}님</span></li>
                    <Link to="/login"><li onClick={logout}><span>logout</span></li></Link>
                </ul>
            </div>
        </nav>
    );
}
export default AppHeader;