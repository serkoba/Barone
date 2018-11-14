import { Constructable } from "src/app/core/models/constructable";
import { MaltaModel } from "./malta.model";
import { LupuloModel } from "./lupulo.model";
import { AguaModel } from "./agua.model";
import { AdjuntosModel } from "./adjuntos.model";

export class RecetaModel extends Constructable<Partial<RecetaModel>>{
    id: number;
    Fecha: number;
    Nombre: string;
    SRM: string;
    IBU: string;
    ABV: string;
    OG: string;
    TiempoEmpaste: number;
    Litros: number;
    PH: number;
    Sparge: string;
    Observaciones: string;
    Malta: string;
    MaltaReceta: MaltaModel[];
    Lupulo: string;
    LupuloReceta: LupuloModel[];
    Agua: string;
    AguaReceta: AguaModel[];
    Adjunto: string;
    AdjuntoReceta: AdjuntosModel[];

}
