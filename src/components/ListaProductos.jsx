import { useEffect, useState } from "react";
import { useCarritoStore } from "../store/useCarritoStore";
import axios from "axios";

export default function ListaProductos() {
  const productos = useCarritoStore((state) => state.productos);
  const setProductos = useCarritoStore((state) => state.setProductos);

  // ERROR original: el selector buscaba "agregarProductos", pero el store define "agregarProducto".
  // Al ser undefined, al hacer clic se intentaba ejecutar algo que no existe.
  const agregarProducto = useCarritoStore((state) => state.agregarProducto);

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products?limit=4")
      .then((respuesta) => {
        const adaptados = respuesta.data.map((item) => ({
          id: item.id,
          nombre: item.title,
          precio: Math.round(item.price * 4000),
          imagen: item.image,
        }));
        setProductos(adaptados);
        setCargando(false);
      })
      .catch(() => {
        setError("No se cargo");
        setCargando(false);
      });
  }, [setProductos]);

  if (cargando) return <p>Cargando..</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="panel">
      <h2>Productos (Axios)</h2>
      {productos.map((producto) => (
        <div key={producto.id} className="fila">
          {/* ERROR original: se omitía la URL de imagen y no había ningún <img> que la mostrara. */}
          <img
            className="producto-imagen"
            src={producto.imagen}
            alt={producto.nombre}
          />
          <div>
            <p className="fila-nombre">{producto.nombre}</p>
            <p className="fila-detalle">
              {producto.precio.toLocaleString("es-co")}
            </p>
          </div>
          <button
            // ERROR original: "clasName" no es un atributo de React; el atributo correcto es "className".
            className="btn-primario"
            onClick={() => agregarProducto(producto)}
          >
            Agregar
          </button>
        </div>
      ))}
    </section>
  );
}