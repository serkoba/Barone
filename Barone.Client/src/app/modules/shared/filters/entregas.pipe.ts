import { Pipe, PipeTransform } from '@angular/core';
import { EntregaModel } from '../../modules.export';

@Pipe({
  name: 'entregas'
})
export class EntregasPipe implements PipeTransform {


  transform(value: EntregaModel[], filter: string): EntregaModel[] {
    filter = filter ? filter.toLocaleLowerCase() : null;
    return filter ? value.filter((app: EntregaModel) =>
      app.Cliente.RazonSocial != null && app.Cliente.RazonSocial.toLocaleLowerCase().indexOf(filter) != -1
      || app.idEntrega != null && app.idEntrega.toString().toLocaleLowerCase().indexOf(filter) != -1
    ) : value;
  }

}
