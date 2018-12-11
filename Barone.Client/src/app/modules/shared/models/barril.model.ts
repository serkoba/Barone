import { Constructable } from "../../../core/models/constructable";
import { EstilosModel } from "./estilos.model";
import { CoccionModel } from "./coccion/coccion.model";

export class BarrilModel extends Constructable<Partial<BarrilModel>>{
    id: number;
    NroBarril: string;
    idEstado: number;
    CantidadLitros: string;
    idEntrega?: number;
    IdEstilo?: number;
    Estilo?: EstilosModel;
    IdCoccion?: number;
    Coccion?: CoccionModel;
}