import { Pipe, PipeTransform } from '@angular/core';
import { RangoModel } from '../models/rango.model';

@Pipe({
  name: 'rango'
})
export class RangoPipe implements PipeTransform {

  transform(value: RangoModel[], filter: string): RangoModel[] {
    filter = filter ? filter.toLocaleLowerCase() : null;
    return filter ? value.filter((app: RangoModel) =>
      app.NombreRango != null && app.NombreRango.toLocaleLowerCase().indexOf(filter) != -1
      || app.fechaDesde != null && app.fechaDesde.toLocaleLowerCase().indexOf(filter) != -1
      || app.fechaHasta != null && app.fechaHasta.toLocaleLowerCase().indexOf(filter) != -1
      || app.precio != null && app.precio.indexOf(filter) != -1
    ) : value;
  }

}
