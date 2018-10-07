import { Pipe, PipeTransform } from '@angular/core';
import { PedidoModel } from '../models/pedido.model';

@Pipe({
  name: 'pedidos'
})
export class PedidosPipe implements PipeTransform {

  transform(value: PedidoModel[], filter: string): PedidoModel[] {
    filter = filter ? filter.toLocaleLowerCase() : null;
    return filter ? value.filter((app: PedidoModel) =>
      app.Cliente.RazonSocial != null && app.Cliente.RazonSocial.toLocaleLowerCase().indexOf(filter) != -1
      || app.fechaPactada != null && app.fechaPactada.toLocaleLowerCase().indexOf(filter) != -1
      || app.fechaPedido != null && app.fechaPedido.toLocaleLowerCase().indexOf(filter) != -1
    ) : value;
  }

}
