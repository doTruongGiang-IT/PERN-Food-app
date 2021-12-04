import React, {useState, useRef} from 'react';
import './UserAddForm.css';
import useOnScreen from '../../../hooks/useOnScreen';
import {useDispatch} from 'react-redux';
import {createUser} from '../../../features/auth/authSlice';
import { useHistory } from 'react-router';

const UserAddForm = () => {
    const history = useHistory();
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

    const isDisabled = () => {
        let result = false;
        if(!username || !email || !password ||  isUsernameVisible || isEmailVisible || isPasswordVisible) result = true;
        return result;
    };

    const handleCreate = async () => {
        await dispatch(createUser({username, email, password, profile: ""}));
        setUsername("");
        setEmail("");
        setPassword("");
        history.push("/admin");
    };

    return (
        <div className="userAddForm">
            <div className="userAddFormWrapper">
                <h2>User Add Form</h2>
                <form>
                    <div className="form-group-user">
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
                    <div className="form-group-user">
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
                    <div className="form-group-user">
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
                        <button disabled={isDisabled()} onClick={handleCreate} type="button">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserAddForm;
