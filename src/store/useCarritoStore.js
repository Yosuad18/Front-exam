import { create } from 'zustand'
import { productos as productosIniciales } from '../data/productos'

export const useCarritoStore = create((set, get) => ({
  productos: productosIniciales,
  items: [],
  // ERROR original: "Productos" con mayúscula creaba otra propiedad y no actualizaba state.productos.
  setProductos: (nuevosproductos) => set({ productos: nuevosproductos }),

  agregarProducto: (producto) =>
    set((state) => {
      const exist = state.items.find((item) => item.id === producto.id)
      if (exist) {
        return {
          items: state.items.map((item) =>
            item.id === producto.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          ),
        }
      }
      return { items: [...state.items, { ...producto, cantidad: 1 }] }
    }),

  calcularTotal: () =>
    get().items.reduce(
      (suma, item) => suma + item.precio * item.cantidad,
      0
    ),
}))