import { Constructable } from "src/app/core/models/constructable";

export class ProveedoresModel extends Constructable<Partial<ProveedoresModel>>  {
    id: number;
    RazonSocial: string;
    Direccion: string;
    Telefono: string;
    Email: string;
}
