import { Constructable } from "../../../core/models/constructable";
import { EstilosModel } from "./estilos.model";

export class BarrilModel  extends Constructable<Partial<BarrilModel>>{
    id: number;
    NroBarril: string;
    idEstado:number;
    CantidadLitros:string;
    idEntrega?:number;
    IdEstilo?:number;
    Estilo?:EstilosModel;
}