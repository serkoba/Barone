import { Constructable } from "../../../core/models/constructable";
import { ItemChip } from "./item-chip";
import { BarrilModel } from "./barril.model";
import { ProductosModel } from "./productos.model";

export class RowEntrega extends Constructable<Partial<RowEntrega>>{
    public id: number;
    public Tipo: string;
    public Cantidad: number;
    public BarrilesEntrega: ItemChip[];
    public Barriles: BarrilModel[];

}
export class RowEntregaLata extends Constructable<Partial<RowEntregaLata>>{
    public id: number;
    public Cantidad: number;
    public Productos: ProductosModel;

    public static empty(): RowEntregaLata {
        return new RowEntregaLata({id:0, Productos:ProductosModel.empty(),Cantidad:0 });
    }

}

