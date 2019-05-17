import { Constructable } from "src/app/core/models/constructable";
import { EntregaModel } from "./entrega.model";
import { ClientsModel } from "./clients.model";

export class EntregasAgrupadasModel extends Constructable<Partial<EntregasAgrupadasModel>> {

    public Cliente: ClientsModel;
    public movimientos: EntregaModel[];
}


export class EntregasAgrupadasByClienteModel extends Constructable<Partial<EntregasAgrupadasByClienteModel>> {

    public Cliente: ClientsModel;
    public Totales: DetalleEntregas[];
}

export class DetalleEntregas extends Constructable<Partial<DetalleEntregas>> {

    public Estilo: string;
    public CantidadLitros: number;
    public CantidadBarriles: number;
}
