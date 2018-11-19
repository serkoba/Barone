import { Constructable } from "src/app/core/models/constructable";
import { BarrilModel } from "./barril.model";
import { ClientsModel } from "./clients.model";
import { EstilosModel } from "./estilos.model";

export class ReportFilterModel extends Constructable<Partial<ReportFilterModel>> {
    public NroBarril: string;
    public FechaDesde: number;
    public FechaHasta: number;
    public RazonSocial: string;
    public Estado: number;
    public Estilo: number;
    // public NroBarril: string;
    // public RazonSocial: string;
}
