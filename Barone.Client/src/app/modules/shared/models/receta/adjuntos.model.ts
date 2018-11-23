import { Constructable } from "src/app/core/models/constructable";
import { InsumoModel } from "../insumo.model";


export class AdjuntosModel extends Constructable<Partial<AdjuntosModel>> {
    Insumo: InsumoModel;
    Cantidad: number;
    Tiempo: number;


    public static fromJSON(json: any): AdjuntosModel {
        let user = Object.create(AdjuntosModel.prototype);
        return Object.assign(user, json, {
            created: new Date(json.created)
        });
    }
}
