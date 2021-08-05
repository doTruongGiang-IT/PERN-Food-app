import React, {useState, useRef, useEffect} from 'react';
import './LoginPage.css';
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';
import useOnScreen from '../../hooks/useOnScreen';
import {useSelector, useDispatch} from 'react-redux';
import {selectAuth, selectAuthErrors, getAuth} from '../../features/auth/authSlice';

const LoginPage = ({history}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const emailRef = useRef();
    const passwordRef = useRef();
    const isEmailVisible = useOnScreen(emailRef);
    const isPasswordVisible = useOnScreen(passwordRef);
    const dispatch = useDispatch();
    const auth = useSelector(selectAuth);
    const loginErrors = useSelector(selectAuthErrors);
    let temp = JSON.parse(localStorage.getItem("pern_food_auth"));
    
    const isDisabled = () => {
        let result = false;
        if(!email || !password || isEmailVisible || isPasswordVisible) result = true;
        return result;
    };

    const login = () => {
        dispatch(getAuth({email, password}));
        setEmail("");
        setPassword("");
    };

    useEffect(() => {
        if(loginErrors === false) {
            if(Object.keys(auth).length !== 0) {
                localStorage.setItem("pern_food_auth", JSON.stringify(auth));
                if(auth.role === "admin") history.push("/dashboard");
                if(auth.role === "user") history.push("/");
            };
        };
        if(temp !== null) {
            history.push("/");
        };
    }, [loginErrors, history, auth, temp]);

    return (
        <div className="login-page">
            <Header />
            <div className="login-section">
                <form className="login-form">
                    <div style={{display: `${loginErrors ? 'block' : 'none'}`}} className="errors">
                        <p>Wrong credentials</p>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            className="form-input login-email"  
                            pattern='[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/]'
                            type="email" 
                            placeholder="Enter your email..." 
                            value={email} 
                            onChange={e => setEmail(e.target.value)}
                        />
                        <p ref={emailRef} className="login-email-errors">Please fill in the right format of email</p>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            className="form-input login-password" 
                            pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                            type="password" placeholder="......" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                        />
                        <p ref={passwordRef} className="login-password-errors">Password must includes lower-upper-number-special chars</p>
                    </div>
                    <div className="form-group group-action">
                        <button disabled={isDisabled()} onClick={login} type="button">Sign in</button>
                        <Link to="/register" className="register-link"><p>Don't have account</p></Link>
                    </div>
                </form>
                <p id="quote">@2021 Pizza Corp All rights reserved</p>
            </div>
        </div> 
    )
}

export default LoginPage;
