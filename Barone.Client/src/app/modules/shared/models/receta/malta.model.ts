import { Constructable } from "src/app/core/models/constructable";
import { InsumoModel } from "../insumo.model";

export class MaltaModel extends Constructable<Partial<MaltaModel>>{

    Insumo: InsumoModel;
    Cantidad: number;
    Porcentaje: number;
}


