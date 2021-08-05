import React, {useState, useRef, useEffect} from 'react';
import './RegisterPage.css';
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';
import useOnScreen from '../../hooks/useOnScreen';
import {useSelector, useDispatch} from 'react-redux';
import {createUser, selectAuth, selectAuthErrors} from '../../features/auth/authSlice';

const RegisterPage = ({history}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const isUsernameVisible = useOnScreen(usernameRef);
    const isEmailVisible = useOnScreen(emailRef);
    const isPasswordVisible = useOnScreen(passwordRef);
    const dispatch = useDispatch();
    const auth = useSelector(selectAuth);
    const errors = useSelector(selectAuthErrors);
    let temp = JSON.parse(localStorage.getItem("pern_food_auth"));
    
    const isDisabled = () => {
        let result = false;
        if(!username || !email || !password ||  isUsernameVisible || isEmailVisible || isPasswordVisible) result = true;
        return result;
    };

    const register = () =>{
        dispatch(createUser({username, email, password, profile: ""}));
        setUsername("");
        setEmail("");
        setPassword("");
    };

    useEffect(() => {
        if(errors === false) {
            if(Object.keys(auth).length !== 0) {
                localStorage.setItem("pern_food_auth", JSON.stringify(auth));
                history.push("/");
            };
        };
        if(temp !== null) {
            history.push("/");
        };
    }, [errors, history, auth, temp]);

    return (
        <div className="register-page">
            <Header />
            <div className="register-section">
                <form className="register-form">
                    <div style={{display: `${errors ? 'block' : 'none'}`}} className="errors">
                        <p>Email is already used</p>
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input 
                            className="form-input register-username" 
                            required="This field is required"
                            type="text" 
                            placeholder="Enter your username..."  
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <p ref={usernameRef} className="register-username-errors">This field is required</p>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            className="form-input register-email" 
                            pattern='[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/]'
                            type="email" 
                            placeholder="Enter your email..."  
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <p ref={emailRef} className="register-email-errors">Please fill in the right format of email</p>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            className="form-input register-password" 
                            pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                            type="password" 
                            placeholder="......"  
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                        />
                        <p ref={passwordRef} className="register-password-errors">Password must includes lower-upper-number-special chars</p>
                    </div>
                    <div className="form-group group-action">
                        <button disabled={isDisabled()} onClick={register} type="button">Sign up</button>
                        <Link to="/login" className="login-link"><p>Already have account</p></Link>
                    </div>
                </form>
                <p id="quote">@2021 Pizza Corp All rights reserved</p>
            </div>
        </div>
    )
}

export default RegisterPage;
