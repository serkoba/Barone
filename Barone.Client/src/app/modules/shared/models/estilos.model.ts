import { Constructable } from "../../../core/models/constructable";
import { RangoModel } from "./rango.model";

export class EstilosModel  extends Constructable<Partial<EstilosModel>> {
    public IdEstilo:number;
    public idRango:number;
    public Nombre:string;
    public ingredientes:string;
    public rangoPrecio:RangoModel;
}
