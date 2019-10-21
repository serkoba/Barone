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
    StockProductos?:StockProductos;
    Precio?:number;

    public static empty(): ProductosModel {
        return new ProductosModel({id:0, Nombre:'',Stock:0,Litros:0,Precio:0 });
    }
}



export class StockProductos extends Constructable<Partial<StockProductos>>{
    id:number;
    Producto:ProductosModel;
    Coccion?: CoccionModel;
    Cantidad:number;
    Fecha:string;
}