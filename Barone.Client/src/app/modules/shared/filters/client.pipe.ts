import { Pipe, PipeTransform } from '@angular/core';
import { ClientsModel } from '../models/clients.model';

@Pipe({
  name: 'client'
})
export class ClientPipe implements PipeTransform {

  transform(value: ClientsModel[], filter: string): ClientsModel[] {
    filter = filter ? filter.toLocaleLowerCase() : null;
    return filter ? value.filter((app: ClientsModel) =>
      app.RazonSocial != null && app.RazonSocial.toLocaleLowerCase().indexOf(filter) != -1
      || app.CUIT != null && app.CUIT.toLocaleLowerCase().indexOf(filter) != -1
      || app.DNI != null && app.DNI.toLocaleLowerCase().indexOf(filter) != -1
    ) : value;
  }

}
