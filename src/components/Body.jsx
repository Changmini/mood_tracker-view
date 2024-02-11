import Calendar from './Body/Content/Calendar';
import Timeline from './Body/Content/Timeline';
import Analysis from './Body/Content/Analysis';
import Sidebar from './Body/Sidebar'
import Content from './Body/Content'
import { useState } from 'react';

export default function AppBody() {
    const [menuNumber, setMenuNumber] = useState(0);
    const sideMenu = [
        {
            name: "달력",
            component: Calendar
        }
        , {
            name: "연대표",
            component: Timeline
        }
        , {
            name: "분석표",
            component: Analysis
        }
    ]; /* API 사용하여 데이터 세팅 */

    const changeMenuNumber = (num) => {
        console.log("Change Menu: ", num);
        setMenuNumber(num);
    };

    return (
        <div className='app-main'>
            <Sidebar sideMenu={sideMenu} onChange={changeMenuNumber} />
            <Content sideMenu={sideMenu} menuNumber={menuNumber} />
        </div>
    );
};


