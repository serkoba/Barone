import { Constructable } from "../../../core/models/constructable";

export class ItemChip  extends Constructable<Partial<ItemChip>>{
    cantidad:number;
    nombre:string;
  }