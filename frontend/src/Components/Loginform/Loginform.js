import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"
import React, { useEffect, useState } from "react";
import { fetchOrUpdateToken, fetchOrUpdateData, rememberMe } from '@/_Services/Api';
import { useNavigate } from "react-router-dom";
import { useSelector, useStore } from 'react-redux';

import './Loginform.css';
import { selectUser } from '@/Redux/Reducers/Index';



const Loginform = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const store = useStore();

    const user = useSelector(selectUser);

    const navigate = useNavigate();

    useEffect(() => {
        if (user.token) {
            navigate("/dashboard");
        }
    }, [navigate, user.token]);

    const handleCheckbox = () => {
        rememberMe(store);
    };

    async function loginSubmit(e) {
        e.preventDefault();
        const token = await fetchOrUpdateToken(store, email, password);
        fetchOrUpdateData(store, token);
    }

    return (
        <div className="main bg-dark">
            <section className="sign-in-content">
                <FontAwesomeIcon icon={faUserCircle} />
                <h1>Sign In</h1>
                <form onSubmit={(e) => loginSubmit(e)}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="input-remember">
                        <input
                            {...{ user }}
                            onChange={handleCheckbox}
                            type="checkbox"
                            id="remember-me"
                        />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    {user.tokenStatus === "rejected" ? <div className="errorInfo">Invalid E-mail or password </div> : ""}
                    <button type="submit" className="sign-in-button">
                        Sign In
                    </button>
                </form>
            </section>
        </div>
    )
}

export default Loginform
