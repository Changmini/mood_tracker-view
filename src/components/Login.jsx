import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import $common from '../common';

export default function () {
    const navigate = useNavigate();

    const loginSubmit = async () => {
        const f = new FormData(document.LoginForm);
        if (!await $common.login(f))
            return ;
        localStorage.setItem("LOGIN", "ON");
        navigate("/");
    } 

    async function state() {
        const login = await $common.loginStatus();
        if (login) navigate("/");
    }

    useEffect(() => {
        state();
    }, []);

    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <div className="login100-pic" data-tilt>
                        <img className='lgn-img' alt="IMG"/>
                    </div>

                    <form name='LoginForm' className="login100-form validate-form">
                        <span className="login100-form-title">
                            Member Login
                        </span>

                        <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                            <input className="input100" type="text" name="username" placeholder="Username"/>
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fa fa-envelope" aria-hidden="true"></i>
                            </span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate = "Password is required">
                            <input className="input100" type="password" name="password" placeholder="Password"/>
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fa fa-lock" aria-hidden="true"></i>
                            </span>
                        </div>
                        
                        <div className="container-login100-form-btn">
                            <button className="login100-form-btn" onClick={loginSubmit}>
                                Login
                            </button>
                        </div>

                        <div className="text-center p-t-12">
                            <span className="txt1">
                                Forgot
                            </span>
                            <span className='m-r-10'></span>
                            <a className="txt2" href="#">
                                Username / Password?
                            </a>
                        </div>

                        <div className="text-center p-t-136">
                            <a className="txt2" href="#">
                                Create your Account
                                <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}