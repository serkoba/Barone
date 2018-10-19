import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'format'
})

@Injectable()
export class Format implements PipeTransform {
    datePipe: DatePipe = new DatePipe('yMd');
    transform(input: any, args: any): any {
        if (input == null) return '';
        var format = '';
        var parsedFloat = 0;
        var pipeArgs = args.split(':');
        for (var i = 0; i < pipeArgs.length; i++) {
            pipeArgs[i] = pipeArgs[i].trim(' ');
        }

        switch (pipeArgs[0].toLowerCase()) {
            case 'detallepedido':
                return JSON.parse(input);
            case 'estadoicono':
                return this.returnEstadoIcono(input);
            case 'estado':
                return this.returnEstado(input);
            case 'estilo':
                return input.Nombre;
            case 'rangoprecio.precio':
                return input.precio;
            case 'rangoprecio.fechahasta':
                return this.getDate(input.fechaHasta);
            case 'rangoprecio.fechadesde':
                return this.getDate(input.fechaDesde);
            case 'cliente':
                return input.RazonSocial;
            case 'estadobarril':
                return this.returnEstadoBarril(input);
            case 'text':
                return input;
            case 'date':
                return this.getDate(input);
            case 'csv':
                if (input.length == 0)
                    return "";
                if (input.length == 1)
                    return input[0].text;
                let finalstr: string = "";
                for (let i = 0; i < input.length; i++) {
                    finalstr = finalstr + input[i].text + ", ";
                }
                return finalstr.substring(0, finalstr.length - 2);
            default:
                return input;
        }
    }

    private returnEstadoBarril(input: any) {
        switch (input) {
            case 1:
                return 'Para Despacho';
            case 2:
                return 'Entregadas';
            case 3:
                return 'En Progreso';
            case 4:
                return 'Reservado';

            default:
                break;
        }
    }
    private returnEstado(input: any) {
        const inputString = input.toString();
        switch (inputString) {
            case "1":
                return 'Pendiente'
            case "2":
                return 'En Progreso'
            case "3":
                return 'Entregado'

            default:
                break;
        }
    }
    private returnEstadoIcono(input: any) {
        const inputString = input.toString();
        switch (inputString) {
            case "1":
                return 'access_time'
            case "2":
                return 'add_shopping_cart'
            case "3":
                return 'local_shipping'

            default:
                break;
        }
    }

    private getDate(date: string): any {
        return new Date(date).toLocaleDateString();
    }
}