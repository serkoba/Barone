import { Pipe, PipeTransform } from '@angular/core';
import { BarrilModel } from '../models/barril.model';

@Pipe({
  name: 'barril'
})
export class BarrilPipe implements PipeTransform {

  transform(value: BarrilModel[], filter: string): BarrilModel[] {
    filter = filter ? filter.toLocaleLowerCase() : null;
    return filter ? value.filter((app: BarrilModel) =>
      app.NroBarril != null && app.NroBarril.toLocaleLowerCase().indexOf(filter) != -1
      || app.Estilo != null && app.Estilo.Nombre.toLocaleLowerCase().indexOf(filter) != -1
    ) : value;
  }

}
