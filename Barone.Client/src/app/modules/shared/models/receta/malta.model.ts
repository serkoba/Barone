import { Constructable } from "src/app/core/models/constructable";
import { InsumoModel } from "../insumo.model";

export class MaltaModel extends Constructable<Partial<MaltaModel>>{

    Insumo: InsumoModel;
    Cantidad: number;
    Porcentaje: number;

    public static fromJSON(json: any): MaltaModel {
        let insumo = Object.create(MaltaModel.prototype);
        return Object.assign(insumo, json, {
            created: new Date(json.created)
        });
    }
}


