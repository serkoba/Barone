import { Constructable } from "src/app/core/models/constructable";

export class InsumoModel extends Constructable<Partial<InsumoModel>> {
    public id: number;
    public Nombre: string;
    public TipoUnidadMedida: number;
    public Stock: number;

    public static fromJSON(json: any): InsumoModel {
        let insumo = Object.create(InsumoModel.prototype);
        return Object.assign(insumo, json, {
            created: new Date(json.created)
        });
    }
}
