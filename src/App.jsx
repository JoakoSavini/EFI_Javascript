import { useState } from 'react'
import { BrowserRouter, Routes ,Route } from 'react-router-dom' /* para las rutas */
import './App.css'
import {Menubar} from 'primereact/menubar'

/* aqui importo el login y create */
import LoginUser from './components/users/LoginUsers'
import CreateUser from './components/users/CreateUsers'

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
    {label:'Marcas', icon:'pi pi-tag', url:'/marcas'},
    {label:'Modelos', icon:'pi pi-objects-column', url:'/modelos'},
    {label:'Proveedores', icon:'pi pi-truck', url:'/proveedores'},
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
      <Route path='/inicio-sesion' element={<LoginUser/>} />
      <Route path='/nuevo-usuario' element={<CreateUser/>} />
    </Routes>

    </BrowserRouter>
  )
}

export default App
