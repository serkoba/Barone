import { ClientsModel } from "./clients.model";
import { Constructable } from "src/app/core/models/constructable";
import { RowEntregaLata } from "./row-entrega";

export class PedidoModel extends Constructable<Partial<PedidoModel>> {
    id: number;
    public IdCliente: number;
    fechaPedido: string;
    fechaPactada: string;
    Cliente: ClientsModel;
    DetallePedido: string;
    TotalBarriles: number;
    TotalLatas:number;
    Estado: string;
    idEntrega: number;
    DetallePedidoProducto:string;
    DetalleProducto: RowEntregaLata[];
}
