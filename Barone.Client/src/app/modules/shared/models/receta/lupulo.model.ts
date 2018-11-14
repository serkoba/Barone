import { Constructable } from "src/app/core/models/constructable";
import { InsumoModel } from "../insumo.model";

export class LupuloModel extends Constructable<Partial<LupuloModel>>{

    Insumo: InsumoModel;
    PorcentajeAA: number;
    Tiempo: number;
    IBUS: number;
    Cantidad: number;
}



