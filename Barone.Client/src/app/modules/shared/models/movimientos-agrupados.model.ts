import { Constructable } from "src/app/core/models/constructable";

export class MovimientosAgrupadosModel extends Constructable<Partial<MovimientosAgrupadosModel>> {
    public Fecha: string;
    public data: MovimientoEstado[];
}
export class MovimientoEstado{
public data:number;
public label:string;
}



