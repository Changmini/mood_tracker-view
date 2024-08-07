import $common from '../../common';
import { useNavigate } from "react-router-dom";
export default function Context({sideMenu, menuNumber}) {
    // const navigate = useNavigate();

    // if (!$common.loginStatus()) {
    //     navigate("/login");
    // }

    return (
        <div className='content-main'>
            {
                sideMenu[menuNumber].component(menuNumber)
            }
        </div>
    );
};


