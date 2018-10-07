import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  transform(value: User[], filter: string): User[] {
    filter = filter ? filter.toLocaleLowerCase() : null;
    return filter ? value.filter((app: User) =>
      app.userProfile != null && app.userProfile.toLocaleLowerCase().indexOf(filter) != -1
      || app.Role != null && app.Role.toLocaleLowerCase().indexOf(filter) != -1
    ) : value;
  }

}
