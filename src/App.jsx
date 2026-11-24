// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Encabezado from './components/Encabezado'
import ListaProductos from './components/ListaProductos'
import Carrito from './components/Carrito'

function TiendaPrincipal() {
  return (
    <main className="contenido">
      <Encabezado/>
      <ListaProductos />
    </main>
  )
}

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<TiendaPrincipal />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
    </div>
  )
}