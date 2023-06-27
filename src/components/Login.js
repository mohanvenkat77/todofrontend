import axios from 'axios';
import React, { useState } from 'react'

import { useNavigate } from "react-router-dom";
const Login=()=>{

    const navigate = useNavigate();
    const [error, setError] = useState({
        email: "",
        password: ""
    });
    const [boo, setBoo] = useState(true);
    const [loginUser, setLoginUser] = useState({
        email: "",
        password: ""
    });


    function onFormSubmit(e) {
        e.preventDefault();
        setBoo(false);
        axios.post("http://localhost:5000/user/login",loginUser.email,loginUser.password)
            .then(res => {
                console.log('res..',res)
                if (res.status === "Success") {
                    localStorage.setItem('token',res.token);
                    localStorage.setItem('user',res.user);
                    setLoginUser({
                        email: "",
                        password: ""
                    })
                    
                }
                else {
                    if (res.field) setError(ex => ({ ...ex, [res.field]: res.message }));
                    else alert(res.message);
                }
            })
            .catch(res => alert(res.message))
    }


	return(
		<div>
			<form onSubmit={onFormSubmit}> 
            <div className="field-container margin">
                    <input type="email" id="email" placeholder="Email" style={error.email ? { border: "1px solid red" } : {}} required onChange={e => {
                        setLoginUser(ex => ({ ...ex, email: e.target.value }));
                        setError(ex => ({ ...ex, email: "" }));
                    }} />
                </div>
                {error.email && <span className="error">*{error.email}</span>}
                <div className="field-container">
                    <input type="password" id="password" placeholder="Password" minLength={8} style={error.password ? { border: "1px solid red" } : {}} required onChange={e => {
                        setLoginUser(ex => ({ ...ex, password: e.target.value }));
                        setError(ex => ({ ...ex, password: "" }));
                    }} />
                </div>
				<button type="submit">Login</button>
			</form>
		</div>
	)
}

export default Login    