import { Constructable } from "../../../core/models/constructable";


export class ClientsModel  extends Constructable<Partial<ClientsModel>>{
  IdCliente: number;
  RazonSocial: string;
  CUIT: string;
  DNI: string;
  domicilio: string;
  margen: string;
  SaldoCuenta: string;
  Telefono: string;
  ciudad: string;
  provincia: string;
  pais: string;
  
}

