import { Constructable } from "src/app/core/models/constructable";
import { InsumoModel } from "../insumo.model";


export class AdjuntosModel extends Constructable<Partial<AdjuntosModel>> {
    Insumo: InsumoModel;
    Cantidad: number;
    Tiempo: number;
}
