import { useEffect, useState } from "react";
import { useCarritoStore } from "../store/useCarritoStore";
import axios from "axios";

export default function ListaProductos() {
  const productos = useCarritoStore((state) => state.productos);
  const setProductos = useCarritoStore((state) => state.setProductos);
  // ❌ ERROR 1: "agregarProductos" está en plural; en Zustand se usa "agregarProducto" (en singular)
  const agregarProductos = useCarritoStore((state) => state.agregarProductos);

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products?limit=4")
      // ❌ ERROR 2: "respuesra" tiene un typo (debería ser "respuesta")
      .then((respuesta) => {
        const adaptados = respuesta.data.map((item) => ({
          id: item.id,
          nombre: item.title,
          precio: Math.round(item.price * 4000),
        }))
        setProductos(adaptados)
        setCargando(false)
      })
      .catch(() => {
        // 🟡 AQUÍ ENTRA CUANDO FALLA LO DE ARRIBA Y PONE "No se cargo"
        setError('No se cargo')
        setCargando(false)
      })
  }, [setProductos])

  if (cargando) return <p>Cargando..</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="panel">
      <h2>Productos (Axios)</h2>
      {productos.map((producto) => (
        <div key={producto.id} className="fila">
          <div>
            <p className="fila-nombre">{producto.nombre}</p>
            <p className="fila-detalle">
              {producto.precio.toLocaleString("es-co")}
            </p>
          </div>
          <button
            // ❌ ERROR 5: "clasName" le falta una 's' (debe ser className)
            clasName="btn-primario"
            // ❌ ERROR 6: llama a "agregarProductos" en vez de "agregarProducto"
            onClick={() => agregarProductos(producto)}
          >
            Agregar
          </button>
        </div>
      ))}
    </section>
  );
}