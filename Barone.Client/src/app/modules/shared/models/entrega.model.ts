import { ClientsModel } from "./clients.model";
import { BarrilModel } from "./barril.model";
import { PedidoModel } from "./pedido.model";

export class EntregaModel {
    id: number;
    fecha:string;
    fechaPactada: string;
    Cliente:ClientsModel;
    Barriles:BarrilModel[];
    Estado:string;
    TotalBarriles:string;
    TotalLitros:string;
    TotalImporte:string;
    Pedido: PedidoModel;
}
