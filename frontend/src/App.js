import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicRouter from '@/Pages/Public/PublicRouter.js';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<PublicRouter />}>
          </Route>
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
