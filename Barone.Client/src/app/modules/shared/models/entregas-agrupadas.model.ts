import { Constructable } from "src/app/core/models/constructable";
import { EntregaModel } from "./entrega.model";
import { ClientsModel } from "./clients.model";

export class EntregasAgrupadasModel extends Constructable<Partial<EntregasAgrupadasModel>> {

    public Cliente: ClientsModel;
    public movimientos: EntregaModel[];
}
