import { Constructable } from "src/app/core/models/constructable";

export class FermentadorModel extends Constructable<Partial<FermentadorModel>>  {

    public id: number;
    public Identificador: string;
    public Capacidad: number;
    public coccion:string;
}
