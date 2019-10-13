import { Constructable } from "src/app/core/models/constructable";
import { InsumoModel } from "../insumo.model";
export class LupuloMediciones extends Constructable<Partial<LupuloMediciones>>{
    public LupuloMediciones: LupuloModel[];
    public static empty(): LupuloMediciones {
        return new LupuloMediciones({  LupuloMediciones: [LupuloModel.empty()] });
    }
}
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
    public static empty(): LupuloModel {
        return new LupuloModel({Insumo:new InsumoModel(),PorcentajeAA:0, Tiempo: 0, IBUS: 0, Cantidad: 0 });
    }
}



