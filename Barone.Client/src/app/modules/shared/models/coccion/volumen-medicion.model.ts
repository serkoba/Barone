import { Constructable } from "src/app/core/models/constructable";

export class VolumenModel extends Constructable<Partial<VolumenModel>> {
    public VolumenMediciones: VolumenMedicionModel[];
    public static empty(): VolumenModel {
        return new VolumenModel({ VolumenMediciones: [VolumenMedicionModel.empty()] });
    }
}


export class VolumenMedicionModel extends Constructable<Partial<VolumenMedicionModel>> {
    public Fecha: string;
    public Volumen: number;

    public static empty(): VolumenMedicionModel {
        return new VolumenMedicionModel({ Fecha: '', Volumen:0 });
    }
}
