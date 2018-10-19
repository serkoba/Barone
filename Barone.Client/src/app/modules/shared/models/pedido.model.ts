import { ClientsModel } from "./clients.model";

export class PedidoModel {
    id: number;
    public IdCliente: number;
    fechaPedido: string;
    fechaPactada: string;
    Cliente: ClientsModel;
    DetallePedido: string;
    TotalBarriles: number;
    Estado: string;
    idEntrega: number;
}
