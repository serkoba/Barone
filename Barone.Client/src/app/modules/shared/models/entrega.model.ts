import { ClientsModel } from "./clients.model";
import { BarrilModel } from "./barril.model";
import { PedidoModel } from "./pedido.model";
import { RowEntrega } from "./row-entrega";
import { Constructable } from "../../../core/models/constructable";

export class EntregaModel extends Constructable<Partial<EntregaModel>> {
    idEntrega: number;
    fecha: string;
    fechaPactada: number;
    IdCliente: number;
    Cliente: ClientsModel;
    Barriles: BarrilModel[];
    Estado: number;
    EstadoDelivery: number;
    TotalBarriles: string;
    TotalLitros: string;
    TotalImporte: string;
    Pedido: PedidoModel;
    DetallePedido: string;
    DetalleEntrega: RowEntrega[];

}
