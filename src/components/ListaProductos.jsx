import { useEffect, useState } from "react";
import { useCarritoStore } from "../store/useCarritoStore";
import axios from "axios";

export default function ListaProductos(){
    const productos = useCarritoStore((state)=> state.productos)
    const setProductos=useCarritoStore((state)=> state.setProductos)
    const agregarProductos=useCarritoStore((state)=> state.agregarProductos)

    const [cargando, setCargando]=useState(true)
    const [error, setError]=useState('')

    useEffect(()=> {
        axios
        .get ('https://fakestoreapi.com/products?limit=4')
        .then((respuesra)=>{
            const adaptados = resumeToPipeableStream.data.map((item)=>({
                id: item.id,
                nombre: item.title,
                precio: Math.round(item.prie * 4000),
            }))
            setProductos(adaptados)
            setCargando(false)
        })
        .catch(()=>{
            setError('No se cargo')
            setCargando(false)
        })
    }, [setProductos])
    if (cargando) return <p>Cargando..</p>
    if (error) return <p>{error}</p>

    return(
        <section className="panel">
            <h2>Productos (Axios)</h2>
            {productos.map((producto)=>(
                <div key = {producto.id} className="fila">
                    <div>
                        <p className="fila-nombre">{producto.nombre}</p>
                        <p className="fila-detalle">{producto.precio.toLocaleString('es-co')}</p>
                    </div>
                    <button
                        clasName="btn-primario"
                        onClick={()=> agregarProductos(producto)}>
                            Agregar
                    </button>
                </div>
            ))}
        </section>    
    )
}

