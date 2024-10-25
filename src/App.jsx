import { useState } from 'react'
import { BrowserRouter, Routes ,Route } from 'react-router-dom' /* para las rutas */
import './App.css'
import {Menubar} from 'primereact/menubar'

/* aqui importamos los contenedores */
import Home from './components/Home'

function App() {
  /* creo el navbar */
  const items = [
    {label:'Home', icon:'pi pi-home', url:'/'},
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
