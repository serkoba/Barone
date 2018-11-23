import { Constructable } from "src/app/core/models/constructable";
import { InsumoModel } from "../insumo.model";

export class LupuloModel extends Constructable<Partial<LupuloModel>>{

    Insumo: InsumoModel;
    PorcentajeAA: number;
    Tiempo: number;
    IBUS: number;
    Cantidad: number;

    public static fromJSON(json: any): LupuloModel {
        let user = Object.create(LupuloModel.prototype);
        return Object.assign(user, json, {
            created: new Date(json.created)
        });
    }
}



