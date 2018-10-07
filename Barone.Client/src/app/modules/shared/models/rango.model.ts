import { Constructable } from "../../../core/models/constructable";

export class RangoModel extends Constructable<Partial<RangoModel>>{
    idRango: number;
    NombreRango: string;
    fechaDesde:string;
    fechaHasta:string;
    precio:string;
}