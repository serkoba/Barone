import { Constructable } from "src/app/core/models/constructable";

export class ReporteAgrupado extends Constructable<Partial<ReporteAgrupado>> {
    public Estado: string;
    public TotalBarriles: number;
}
