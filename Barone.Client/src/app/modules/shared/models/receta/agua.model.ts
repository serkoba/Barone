import { Constructable } from "src/app/core/models/constructable";


export class AguaModel extends Constructable<Partial<AguaModel>> {
    TipoAgua: string;
    Cantidad: number;
}
