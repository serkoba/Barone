import { Constructable } from "../../../core/models/constructable";

export class User extends Constructable<Partial<User>>{
  idUser: string;
  userProfile: string;
  Role: string;
  pass: string;
  
  
}

