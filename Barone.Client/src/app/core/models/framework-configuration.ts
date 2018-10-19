import { Constructable } from "./constructable";

export class FrameworkConfiguration extends Constructable<FrameworkConfiguration> {
  public production: boolean;
  public apiUrl: string;
  public loginUrl: string;
  public logoutUrl: string;
  public logoUrl: string;
  public rootStore: string;
  public relativeRoot: string;
  public cachePrefix: string;
  public backgroundLogin: string;
}
