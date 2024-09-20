import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import $common from '../common';

export default function () {
    const navigate = useNavigate();

    const [loginView, setLoginView] = useState(true);

    const loginSubmit = async () => {
        const f = new FormData(document.LoginForm);
        if (!await $common.login(f))
            return ;
        localStorage.setItem("LOGIN", "ON");
        navigate("/");
    }

    const createAccount = async () => {
        const f = new FormData();
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
                    {/* Create Account View */}
                    {!loginView ? <form name='CreateAccountForm' className='acct100-form'>
                        <span className="login100-form-title">
                            SIGN UP
                        </span>
                        <div className="wrap-input100 validate-input" data-validate = "Username is required">
                            <input className="input100" type="text" name="username" placeholder="Username"/>
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className='bx bxs-graduation' aria-hidden="true"></i>
                            </span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate = "Password is required">
                            <input className="input100" type="password" name="password" placeholder="Password"/>
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className='bx bxs-lock' aria-hidden="true"></i>
                            </span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate = "Checking Password is required">
                            <input className="input100" type="password" name="chkPassword" placeholder="Check password"/>
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className='bx bxs-lock' aria-hidden="true"></i>
                            </span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                            <input className="input100" type="text" name="email" placeholder="Email"/>
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i class='bx bxs-envelope'></i>
                            </span>
                        </div>
                        
                        <div className="container-login100-form-btn">
                            <button className="acct100-form-btn" onClick={loginSubmit}>
                                Create Account
                            </button>
                        </div>

                        <div className="text-center p-t-136">
                            <a className="txt2" href="#" onClick={()=>setLoginView(true)}>
                                Go Login
                                <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                            </a>
                        </div>
                    </form> : <></> }
                    
                    {/* image View */}
                    <div className="login100-pic" data-tilt>
                        <img className='lgn-img' alt="IMG"/>
                    </div>
                    
                    {/* Login View */}
                    {loginView ? <form name='LoginForm' className="login100-form validate-form" >
                        <span className="login100-form-title">
                            SIGN IN
                        </span>

                        <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                            <input className="input100" type="text" name="username" placeholder="Username"/>
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className='bx bxs-graduation' aria-hidden="true"></i>
                            </span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate = "Password is required">
                            <input className="input100" type="password" name="password" placeholder="Password"/>
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className='bx bxs-lock' aria-hidden="true"></i>
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
                            <a className="txt2" href="#" onClick={()=>alert("미개발 기능입니다.")}>
                                Username / Password?
                            </a>
                        </div>

                        <div className="text-center p-t-136">
                            <a className="txt2" href="#" onClick={()=>setLoginView(false)}>
                                Create your Account
                                <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                            </a>
                        </div>
                    </form> : <></> }
                </div>
            </div>
        </div>
    )
}