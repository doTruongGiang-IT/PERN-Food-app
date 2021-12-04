import React, {useState, useRef, useEffect} from 'react';
import useOnScreen from '../../../hooks/useOnScreen';
import { useHistory } from 'react-router';

const UserUpdateForm = ({user, update}) => {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [is_active, setIsActive] = useState(true);
    const [role, setRole] = useState("");
    const usernameRef = useRef();
    const emailRef = useRef();
    const isUsernameVisible = useOnScreen(usernameRef);
    const isEmailVisible = useOnScreen(emailRef);

    useEffect(() => {
        setUsername(user.username);
        setEmail(user.email);
        setIsActive(user.is_active);
        setRole(user.role);
    }, [user.username, user.email, user.is_active, user.role]);

    const isDisabled = () => {
        let result = false;
        if(!username || !email ||  isUsernameVisible || isEmailVisible) result = true;
        return result;
    };

    const handleUpdate = () => {
        update(user.userid, username, email, is_active, role);
        setUsername("");
        setEmail("");
        setIsActive(true);
    };

    return (
        <div className="userAddForm">
            <div className="userAddFormWrapper">
                <h2>User Update Form</h2>
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
                        <label>Role</label>
                        <select value={role} onChange={e => setRole(e.target.value)} >
                            <option value="manager">Manager</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <div className="form-group-user">
                        <label>Active</label>
                        <select value={is_active} onChange={e => setIsActive(e.target.value)} >
                            <option value={false}>Block</option>
                            <option value={true}>Active</option>
                        </select>
                    </div>
                    <div className="form-group group-action">
                        <button disabled={isDisabled()} onClick={handleUpdate} type="button">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserUpdateForm;
