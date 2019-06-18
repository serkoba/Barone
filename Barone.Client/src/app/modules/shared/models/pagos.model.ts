import { Constructable } from "../../../core/models/constructable";
import { ClientsModel } from "./clients.model";

export class PagosModel  extends Constructable<Partial<PagosModel>>{
    idPago: number;
    FechaPago: string;
    fechaVencimiento: string;
    IdCliente:number;
    Cliente: ClientsModel;
    Importe: string;
    Descripcion:string;
    Tipo:number;
    
}
