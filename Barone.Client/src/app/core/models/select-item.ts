import { Constructable } from "./constructable";

export class SelectItem extends Constructable<Partial<SelectItem>>{

        value: number;
        viewValue: string;
        smallValue?: string;

}
