import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function NavBar({title}) {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
            <Link 
                to='/'
                className='navbar-brand'
                tabIndex={0}
                aria-label='Ir a Inicio'
            >
                {title}
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav">
                <NavLink 
                    to='/'
                    tabIndex={1}
                    className="nav-item nav-link"
                >
                    Tipos Equipos
                </NavLink>
                <NavLink 
                    to='/estados'
                    tabIndex={2}
                    className="nav-item nav-link"
                >
                    Estados
                </NavLink>
                <NavLink 
                    to='/usuarios'
                    tabIndex={2}
                    className="nav-item nav-link"
                >
                    Usuarios
                </NavLink>
                <NavLink 
                    to='/marcas'
                    tabIndex={2}
                    className="nav-item nav-link"
                >
                    Marcas
                </NavLink>
                <NavLink 
                    to='/inventarios'
                    tabIndex={2}
                    className="nav-item nav-link"
                >
                    Inventarios
                </NavLink>
            </div>
            </div>
        </div>
    </nav>
  )
}
