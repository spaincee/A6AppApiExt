import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  title: string = 'Registrar';
  userForm: FormGroup;
  msg: string = "";
  type: string = "";

  constructor(private usersService: UsersService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.userForm = new FormGroup({
      first_name: new FormControl("", [
        Validators.required
      ]),
      last_name: new FormControl("", [
        Validators.required
      ]),
      username: new FormControl("", [
        Validators.required
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
      ]),
      image: new FormControl("", [
        Validators.required,
        Validators.pattern(/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/)
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16)
      ]),
      confirmpassword: new FormControl("", [
        Validators.required
      ])
    }, [this.checkPassword]);
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
        first_name: new FormControl(user?.first_name, [
          Validators.required
        ]),
        last_name: new FormControl(user?.last_name, [
          Validators.required
        ]),
        username: new FormControl(user?.username, [
          Validators.required
        ]),
        email: new FormControl(user?.email, [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        ]),
        image: new FormControl(user?.image, [
          Validators.required,
          Validators.pattern(/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/)
        ]),
        password: new FormControl(user?.password, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16)
        ]),
        confirmpassword: new FormControl("", [
          Validators.required
        ])
      }, [this.checkPassword]);
      }
    })
  }

  async getDataForm() {
    let user = this.userForm.value;
     if (user.id) {
      //Update
      console.log('Updated User');

      try {
        let response = await this.usersService.update(user);
        if (response._id) {
          console.log(response);
          this.msg = `Se ha Actualizado el Usuario ${response.first_name} ${response.last_name} con id: ${response._id}`;
          this.type = 'success';
          console.log(this.type);
          console.log(this.msg);
        }
      }
      catch (err) {
        console.log(err);
      }


    } else {
      //Create
      console.log('Created New User');  
      try {
        let response = await this.usersService.create(user);
        if (response.id) {
          console.log(response);
          this.msg = `Se ha creado el Usuario ${response.first_name} ${response.last_name} con id: ${response.id}`;
          this.type = 'success';
          console.log(this.msg);
        }
      }
      catch (err) {
        console.log(err);
      }
    }
  }

  checkControl(pControlName: string, pError: string): boolean {
    if (this.userForm.get(pControlName)?.hasError(pError) && this.userForm.get(pControlName)?.touched) {
      return true;
    }
    return false;
  }

  checkPassword(pFormValue: AbstractControl) {
    const password: string = pFormValue.get('password')?.value;
    const confirmpassword: string = pFormValue.get('confirmpassword')?.value;
    if (password !== confirmpassword) {
      return { 'checkpassword': true };
    }
    return null;
  }
}
