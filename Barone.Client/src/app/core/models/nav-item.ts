import { Constructable } from "./constructable";


export class NavItem extends Constructable<Partial<NavItem>> {
  public routerPath: string;
  public text: string;
  public className: string;
  public activeClassName: string;
  public imageUrl: string;
  public icon: string;
  public kind: string;
  public name: string;
  public children: NavItem[];

  public get hasChildren(): boolean {
    return (this.children || []).length > 0;
  }
}
