import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  title: string = 'Registro';
  userForm: FormGroup;
  msg: string = "";
  type: string = "";

  constructor(private usersService: UsersService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.userForm = new FormGroup({
      first_name: new FormControl("", []),
      last_name: new FormControl("", []),
      username: new FormControl("", []),
      email: new FormControl("", []),
      image: new FormControl("", []),
    }, []);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
    console.log(params);
    let id = params.userid;
    if (id) {
      this.title = 'Actualizar'
      const response = await this.usersService.getById(id);
      const user: User = response;

      this.userForm = new FormGroup({
        id: new FormControl(id, []),
        first_name: new FormControl(user?.first_name, []),
        last_name: new FormControl(user?.last_name, []),
        username: new FormControl(user?.username, []),
        email: new FormControl(user?.email, []),
        image: new FormControl(user?.image, []),
      }, []);
      }
    })
  }

  async getDataForm() {
    let user = this.userForm.value
     if (user.id) {
      //Actualizando
      console.log('Actualizar');
      this.usersService.update(user).subscribe((response: User) => {
        if (response._id) {
          this.msg = `Usuario ${response.first_name} ${response.last_name} con id ${response.id} se actualizado correctamente`
          this.type = 'success';
          //this.router.navigate(['/home']);
        }
      });

    } else {
      //Registrando
      console.log('Crear');
      try {
        let response = await this.usersService.create(user);
        if (response.id) {
          this.msg = `Se ha credo el Usuario ${response.first_name} ${response.last_name} con id ${response.id}`;
          this.type = 'success';
          console.log(this.msg);
          //this.router.navigate(['/home']);
        }
      }
      catch (err) {
        console.log(err)
      }
    }
  }
}
