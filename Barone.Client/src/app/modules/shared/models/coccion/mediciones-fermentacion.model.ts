import { Constructable } from "src/app/core/models/constructable";

export class MedicionesFermentacionModel extends Constructable<Partial<MedicionesFermentacionModel>> {
    public Dia: number;
    public Temperatura: number;
    public PH: number;
    public Densidad: number;

    public static empty(): MedicionesFermentacionModel {
        return new MedicionesFermentacionModel({
            Dia: 0,
            Temperatura: 0,
            PH: 0,
            Densidad: 0
        });
    }

}
