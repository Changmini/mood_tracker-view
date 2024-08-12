import $common from '../common';
import { Link } from 'react-router-dom';
function AppHeader() {

    function MemberInfo () {
        const username = $common.getUsername();
        if (username !== undefined && username !== "") {
            return (<>
                <Link to="/login"><li><span>Sign in</span></li></Link>
                <Link><li><span>Sign up</span></li></Link>
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