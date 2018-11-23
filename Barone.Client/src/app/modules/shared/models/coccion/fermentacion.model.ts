import { Constructable } from "src/app/core/models/constructable";
import { MedicionesFermentacionModel } from "./mediciones-fermentacion.model";

export class FermentacionModel extends Constructable<Partial<FermentacionModel>> {
    public EstiloOrigen: string;
    public Generacion: string;
    public AdjuntoDetalle: string;
    public AdjuntoGramos: number;
    public AdjuntoDia: number;
    public Litros: number;
    public NroDeFermentacion: number;
    public Levadura: number;
    public Crema: number;
    public TazaInoc: number;
    public TemperaturaInoc: number;
    public TemperaturaFermentacion: number;
    public Mediciones: MedicionesFermentacionModel[];
}
