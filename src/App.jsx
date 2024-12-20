import { useState } from 'react'
import { BrowserRouter, Routes ,Route } from 'react-router-dom' /* para las rutas */
import './App.css'
import {Menubar} from 'primereact/menubar'

/* aqui importamos los contenedores */
import Home from './components/Home'
import UsersContainer from './components/users/UsersContainer'
import MarcasContainer from './components/marcas/MarcasContainer'
import ModelosContainer from './components/modelos/ModelosContainer'
import ProveedoresContainer from './components/proveedores/ProvContainer'
import FabricantesContainer from './components/fabricantes/FabContainer'
import CelularesContainer from './components/celulares/CelContainer'


function App() {
  /* creo el navbar */

  const items = [
    {label:'Home', icon:'pi pi-home', url:'/'},
    {label:'Usuarios', icon:'pi pi-user', url:'/usuarios'},
    {label:'Marcas', icon:'pi pi-tag', url:'/marcas'},
    {label:'Modelos', icon:'pi pi-objects-column', url:'/modelos'},
    {label:'Fabricantes', icon:'pi pi-truck', url:'/fabricantes'},
    {label:'Proveedores', icon:'pi pi-cart-plus', url:'/proveedores'},
    {label:'Celulares', icon:'pi pi-phone', url:'/celulares'},
  ]

  return (
    <BrowserRouter>
    <Menubar model={items}/> {/* menu inicial */}

    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/usuarios' element={<UsersContainer/>} />
      <Route path='/marcas' element={<MarcasContainer/>} />
      <Route path='/modelos' element={<ModelosContainer/>} />
      <Route path='/fabricantes' element={<FabricantesContainer/>} />
      <Route path='/proveedores' element={<ProveedoresContainer/>} />
      <Route path='/celulares' element={<CelularesContainer/>} />
    </Routes>

    </BrowserRouter>
  )
}

export default App