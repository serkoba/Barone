import { Constructable } from "src/app/core/models/constructable";
import { ClientsModel } from "./clients.model";
import { CuentasDebeHaberModel } from "./cuentas-debe-haber.model";

export class GroupPagosModel extends Constructable<Partial<GroupPagosModel>> {

    public Cliente: ClientsModel;
    public movimientos: CuentasDebeHaberModel[];
}
