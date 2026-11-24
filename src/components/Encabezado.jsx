import { useCarritoStore } from "../store/useCarritoStore";

export default function Encabezado(){
    const items = useCarritoStore((state)=>state.items)
    const totalUnidades = items.reduce((suma, item)=>suma+item.cantidad, 0)

    return(
        <header>
            <h1>Mi tienda</h1>
            <span>Productos en {totalUnidades}</span>
        </header>
    )
}