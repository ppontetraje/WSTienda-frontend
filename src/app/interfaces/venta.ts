import { Detalles } from "./detalle";

export interface Venta{
    idCliente: number;
    saleDetails: Detalles[];
}