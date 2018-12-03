import { Constructable } from "src/app/core/models/constructable";
import { RecetaModel } from "../receta/receta.model";
import { FermentadorModel } from "../fermentador.model";
import { MashModel } from "./mash.model";
import { HervorModel } from "./hervor.model";
import { FermentacionModel } from "./fermentacion.model";
import { CarbonatacionModel } from "./carbonatacion.model";

export class CoccionModel extends Constructable<Partial<CoccionModel>> {
    public id: number;
    public Receta: RecetaModel;
    public Fecha: number;
    public FechaFin: string;
    public NroLote: string;
    public Multiplicador: number;
    public Estado: number;
    public Fermentador: FermentadorModel;
    public _medicionesMash: MashModel[];
    public _hervor: HervorModel[];
    public _fermentacion: FermentacionModel;
    public _carbonatacion: CarbonatacionModel;
    public MedicionesMash: string;
    public Hervor: string;
    public Fermentacion: string;
    public Carbonatacion: string;
}
