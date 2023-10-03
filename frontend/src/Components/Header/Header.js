import logo from "../../Assets/Images/argentBankLogo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faSignOut } from "@fortawesome/free-solid-svg-icons"
import { NavLink } from "react-router-dom"
import React, { useEffect } from "react";
import { useSelector, useStore } from "react-redux";
import { signOut, checkStorageToken } from "@/_Services/Api.js";
import { selectUser } from "@/Redux/Reducers/Index.js";
import './Header.css';


const Header = () => {


    const store = useStore();

    const user = useSelector(selectUser);

    useEffect(() => {
        checkStorageToken(store);
    }, [store]);

    return (
        <nav className="main-nav">
            <NavLink className="main-nav-logo" to="/">
                <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
                <h1 className="sr-only">Argent Bank</h1>
            </NavLink>
            {user.data ? (
                <div>
                    <NavLink className="main-nav-item" to="/Dashboard">
                        <FontAwesomeIcon icon={faUserCircle} />
                        {`${user.data.firstName}`}
                    </NavLink>
                    <NavLink className="main-nav-item" to="/" onClick={() => signOut(store)}>
                        <FontAwesomeIcon icon={faSignOut} />
                        Sign Out
                    </NavLink>
                </div>
            ) : (
                <div>
                    <NavLink className="main-nav-item" to="/login">
                        <FontAwesomeIcon icon={faUserCircle} />
                        Sign In
                    </NavLink>
                </div>
            )}
        </nav>
    );
}
export default Header;


