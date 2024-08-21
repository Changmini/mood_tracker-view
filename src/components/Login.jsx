import $common from '../common';
import { useNavigate } from "react-router-dom";

export default function () {
    const navigate = useNavigate();

    const loginSubmit = async () => {
        const f = new FormData(document.LoginForm);
        if (!await $common.login(f))
            return ;
        localStorage.setItem("LOGIN", "ON");
        navigate("/");
    }

    return (
        <div className='flex'>
            <div className='half'>

            </div>
            <div className='half'>
                <form name="LoginForm">
                    <h3>Login Page</h3>
                    <input type="text" name="username" defaultValue=""/> <br/>
                    <input type="password" name="password" defaultValue=""/><br/>
                </form>
                <button onClick={loginSubmit}>로그인</button>
            </div>
        </div>
    )
}