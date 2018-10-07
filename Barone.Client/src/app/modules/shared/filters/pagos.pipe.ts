import { Pipe, PipeTransform } from '@angular/core';
import { PagosModel } from '../models/pagos.model';

@Pipe({
  name: 'pagos'
})
export class PagosPipe implements PipeTransform {

  transform(value: PagosModel[], filter: string): PagosModel[] {
    filter = filter ? filter.toLocaleLowerCase() : null;
    return filter ? value.filter((app: PagosModel) =>
      app.Cliente.RazonSocial != null && app.Cliente.RazonSocial.toLocaleLowerCase().indexOf(filter) != -1
      || app.FechaPago != null && app.FechaPago.toLocaleLowerCase().indexOf(filter) != -1
      || app.fechaVencimiento != null && app.fechaVencimiento.toLocaleLowerCase().indexOf(filter) != -1
    ) : value;
  }

}
