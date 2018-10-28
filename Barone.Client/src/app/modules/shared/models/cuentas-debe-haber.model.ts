import { Constructable } from "src/app/core/models/constructable";
import { ClientsModel } from "./clients.model";

export class CuentasDebeHaberModel extends Constructable<Partial<CuentasDebeHaberModel>> {
    public Descripcion: string;
    public Fecha: string;
    public DebeImporte: number;
    public HaberImporte: number;
    public IdCliente: number;
    public Cliente: ClientsModel;
}
