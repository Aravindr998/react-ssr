import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import routes from './router';

function App({value}) {
  return (
    <Routes>
      {routes.map((route, i) => <Route key={i} path={route.path} element={route.element} />)}
    </Routes>
  );
}

export default App;
