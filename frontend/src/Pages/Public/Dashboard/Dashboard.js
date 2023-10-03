import React from 'react';
import Transaction from '@/Components/Transaction/Transaction';
import './Dashboard.css'
import Editform from '@/Components/Editform/Editform';
import { useSelector } from "react-redux";

import { selectUser } from '@/Redux/Reducers/Index';
import { NavLink } from 'react-router-dom';



const Dashboard = () => {

    const user = useSelector(selectUser);


    return user.data ? (
        <div className='bg-dark dashboard'>
            <Editform />
            <Transaction />
        </div>
    ) : (
        <div className="loginlinkcointainer">
            <h2>You must be authenticated...</h2>
            <NavLink to="/login" className="loginlink">
                Sign In
            </NavLink>
        </div>
    );
};

export default Dashboard;