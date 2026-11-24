import { create } from 'zustand'
import { productos as productosIniciales } from '../data/productos'

export const useCarritoStore = create((set)=>({
    productos: productosIniciales,
    items:[],
    setProductos: (nuevosproductos) => set ({Productos: nuevosproductos}),
    agregarProducto:(producto)=>
        set ((state)=> {
            const exist = state.items.find((item)=>item.id === producto.id)
            if (exist){
                return{
                    items: state.items.map((item)=>
                    item.id === producto.id
                    ? {...item, cantidad:item.cantidad+1}
                    :item
                    ),
                }
            }
            return {items: [...state.items,{...producto,cantidad:1}]}
        }),
}))