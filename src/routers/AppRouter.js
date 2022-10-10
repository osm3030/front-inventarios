import React from 'react'
import NavBar from '../components/ui/NavBar'
import { Routes, Route } from 'react-router-dom'
import TipoEquipos from '../components/tiposequipos/TipoEquipos'
import Estados from '../components/estados/Estados'
import Marcas from '../components/marcas/Marcas'
import Usuarios from '../components/usuarios/Usuarios'
import Inventarios from '../components/inventarios/Inventarios'
import NotFound from '../components/ui/NotFound'

export default function AppRouter() {
  return (
    <div>
        <NavBar title={'IUD'}/>
        <main className='container'>
            <Routes >
                <Route path='/' element={<TipoEquipos />} />
                <Route path='/estados' element={<Estados />} />
                <Route path='/marcas' element={<Marcas />} />
                <Route path='/usuarios' element={<Usuarios />} />
                <Route path='/inventarios' element={<Inventarios />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </main>
    </div>
  )
}
