import { Constructable } from "../../../core/models/constructable";
import { ItemChip } from "./item-chip";
import { BarrilModel } from "./barril.model";

export class RowEntrega extends Constructable<Partial<RowEntrega>>{
    public id: number;
    public Tipo: string;
    public Cantidad: number;
    public BarrilesEntrega: ItemChip[];
    public Barriles: BarrilModel[];

}
