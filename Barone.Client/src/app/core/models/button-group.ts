import { Constructable } from "./constructable";

export class ButtonGroup extends Constructable<Partial<ButtonGroup>> {
    public id: string;
    public text: string;
}