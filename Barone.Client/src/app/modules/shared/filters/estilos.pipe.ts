import { Pipe, PipeTransform } from '@angular/core';
import { EstilosModel } from '../models/estilos.model';

@Pipe({
  name: 'estilos'
})
export class EstilosPipe implements PipeTransform {

  transform(value: EstilosModel[], filter: string): EstilosModel[] {
    filter = filter ? filter.toLocaleLowerCase() : null;
    return filter ? value.filter((app: EstilosModel) =>
      app.Nombre != null && app.Nombre.toLocaleLowerCase().indexOf(filter) != -1
      || app.rangoPrecio.fechaDesde != null && app.rangoPrecio.fechaDesde.toLocaleLowerCase().indexOf(filter) != -1
      || app.rangoPrecio.fechaHasta != null && app.rangoPrecio.fechaHasta.toString().toLocaleLowerCase().indexOf(filter) != -1
    ) : value;
  }

}
