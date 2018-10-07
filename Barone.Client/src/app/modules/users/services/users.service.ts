import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { HttpClientService } from '../../../core/services/http-client.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class UserService {

  constructor(private _httpClient: HttpClientService) { }
  public getAll(): Observable<User[]> {
      return this._httpClient.get<User[]>('UserModels');
    }

 //   return this.http.get('http://192.168.137.50/api/UsuariosUts/').map((response: Response) => response.json()).catch(this.handleError);
  
  private handleError(error: Response) {
    
    console.error(error);
    
  }

  getById(id: number) {

   
  }

  public create(user: User) {
   
  }

 public update(user: User) {
  
  }

 public  delete(id: number) {
   
  }

  // private helper methods

  private jwt() {
    // create authorization header with jwt token
    // let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // if (currentUser && currentUser.token) {
    //   let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
    //   return new RequestOptions({ headers: headers });
   // }
  }

}