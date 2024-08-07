import $common from '../common';
import { useNavigate } from "react-router-dom";
export default function () {
    const navigate = useNavigate();

    const loginSubmit = () => {
        const f = new FormData(document.LoginForm);
        const check = $common.login(f);
        check && console.log("Login");
        navigate("/");
    }

    return (
        <div>
            <form name="LoginForm">
                <h3>Login Page</h3>
                <input type="text" name="username" defaultValue=""/> <br/>
                <input type="password" name="password" defaultValue=""/><br/>
            </form>
            <button onClick={loginSubmit}>로그인</button>
        </div>
    )
}