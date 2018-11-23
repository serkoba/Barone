import { Constructable } from "src/app/core/models/constructable";

export class MashModel extends Constructable<Partial<MashModel>> {
    public HoraInicio: number;
    public MashMediciones: MashMedicionesModel[];
    public static empty(): MashModel {
        return new MashModel({ HoraInicio: 0, MashMediciones: [MashMedicionesModel.empty()] });
    }
}


export class MashMedicionesModel extends Constructable<Partial<MashMedicionesModel>> {
    public Periodo: number;
    public Densidad: number;
    public PH: number;

    public static empty(): MashMedicionesModel {
        return new MashMedicionesModel({ Periodo: 0, Densidad: 0, PH: 0 });
    }
}
