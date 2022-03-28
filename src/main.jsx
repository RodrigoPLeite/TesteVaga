import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import Movimentacao from './Components/Movimentacao';
import './index.css'
import GrupoRelatorios from './Pages/GrupoRelatorios';
import Home from './Pages/Home';

const Routes = () => {
  const routes = useRoutes([
    { path:"/", element: <Home /> },
    { path:"/movimentacao/:nome", element: <Movimentacao /> },
    { path:"/relatorios", element: <GrupoRelatorios /> },
    
  ]);

  return routes;
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
