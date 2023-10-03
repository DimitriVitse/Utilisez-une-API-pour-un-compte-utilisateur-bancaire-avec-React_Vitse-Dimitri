import React from 'react';
import { Outlet } from 'react-router-dom';

import '@/Layout/Layout.css'

import Header from '@/Components/Header/Header.js';
import Footer from '@/Components/Footer/Footer.js';



const Layout = () => {
    return (
        <div className='layout'>

            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;