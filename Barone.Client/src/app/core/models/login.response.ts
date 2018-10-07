import { Constructable } from './constructable';
/**
 *@ignore
 *
 * @export
 * @class LoginResponse
 * @extends {Constructable<Partial<LoginResponse>>}
 */
export class LoginResponse extends Constructable<Partial<LoginResponse>> {
  public access_token: string;
  public token_type: string;
  public expires_in: string;
  public success: boolean;
  public error: string;
  public userdisplayname:string;
  public role:string;
}
