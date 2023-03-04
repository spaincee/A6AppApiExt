import { Component, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent  {
  @Input() myUser!: User;

  constructor(private usersServices: UsersService) { }

  async deleteUser(pId: string | undefined): Promise<void> {
    if (pId !== undefined) {
      try {
        let response = await this.usersServices.delete(pId);
        if (response._id ) {
          alert('El Usuario ' + response.first_name + ' ' + response.last_name + ' ha sido eliminado Satisfactoriamente');
        } else {
          alert(response.error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

}
