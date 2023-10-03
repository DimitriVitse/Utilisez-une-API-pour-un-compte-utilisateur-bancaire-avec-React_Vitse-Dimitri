import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/Layout/Layout.js';
import { Dashboard, Home, Login } from './Index.js';

const PublicRouter = () => {

    return (

        <Routes>
            <Route element={<Layout />}>
                <Route path="" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='*' element={<p>Path not resolved</p>} />
            </Route>
        </Routes>

    );
};

export default PublicRouter;