export enum ButtonType {
  Barril = "Barril",
  BarrilEstado = "BarrilEstado",
  BarrilEstilo = "BarrilEstilo",
  AsignarEntregaAPedidos = "AsignarEntregaAPedidos",
  Pedidos = "Pedidos",
  IniciarCoccion = "IniciarCoccion"
}
export enum TipoIngredienteEnum {
  Malta = 1,
  Lupulo = 2,
  Agua = 3,
  Adjunto = 4
}
export enum TipoEstadoBarril {
  ParaDespacho = 1,
  Entregadas = 2,
  EnProgreso = 3,
  Reservado = 4
}

export function IncludeConstants(): Function {
  return (target: Function) => {
    target.prototype.TipoIngrediente = TipoIngrediente.getTipoIngrediente;
  };
}

export class TipoIngrediente {
  public static Malta = 1;
  public static Lupulo = 2;
  public static Agua = 3;
  public static Adjunto = 4;
  public static getTipoIngrediente(tipoIngrediente: number): number {
    switch (tipoIngrediente) {
      case TipoIngrediente.Malta:
        return 1;
      case TipoIngrediente.Lupulo:
        return 2;
      case TipoIngrediente.Agua:
        return 3;
      case TipoIngrediente.Adjunto:
        return 4;
    }
  }

}