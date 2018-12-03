import { Constructable } from "src/app/core/models/constructable";



export class HervorModel extends Constructable<Partial<HervorModel>> {
    public HoraInicio: string;
    public Mediciones: HervorMedicionesModel[];

    public static empty(): HervorModel {
        return new HervorModel({ HoraInicio: '', Mediciones: [HervorMedicionesModel.empty()] });
    }
}
export class HervorMedicionesModel extends Constructable<Partial<HervorMedicionesModel>> {
    public LitrosEnOlla: number;
    public DDeEntrada: number;
    public DensidadInicial: number;
    public PHInicial: number;
    public Cantidad: number;



    public static empty(): HervorMedicionesModel {
        return new HervorMedicionesModel({
            LitrosEnOlla: 0,
            DDeEntrada: 0,
            DensidadInicial: 0,
            PHInicial: 0,
            Cantidad: 0
        });
    }

}
