import { Constructable } from "src/app/core/models/constructable";
import { InsumoModel } from "./insumo.model";
import { ProveedoresModel } from "./proveedor.model";

export class ComprasModel extends Constructable<Partial<ComprasModel>>{
    id: number;
    Cantidad: number;
    Precio: number;
    FechaCompra: number;
    Insumos_id: number;
    Proveedor_id: number;
    Insumo: InsumoModel;
    Proveedor: ProveedoresModel;

}