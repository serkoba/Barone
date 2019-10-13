import { Constructable } from "src/app/core/models/constructable";
import { CoccionModel } from "./coccion/coccion.model";
import { EntregaModel } from "./entrega.model";

export class ProductosModel  extends Constructable<Partial<ProductosModel>>{
    id: number;
    Nombre: string;
    Stock: number;
    Litros: number;
    // Coccion_id?: number;
    // Coccion?: CoccionModel;
    // Entrega? :EntregaModel;
}

export class StockProductos extends Constructable<Partial<StockProductos>>{
    id:number;
    Producto:ProductosModel;
    Coccion?: CoccionModel;
    Cantidad:number;
    Fecha:string;
}