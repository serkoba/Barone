import { Constructable } from "src/app/core/models/constructable";

export class CarbonatacionModel extends Constructable<Partial<CarbonatacionModel>> {
    public Tiempo: number;
    public Temperatura: number;
    public Presion: number;
}
