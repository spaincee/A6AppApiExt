import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  arrUsers: User[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.gotoPage();
  }

  async gotoPage(pNum: number = 1): Promise<void> {
    try {
      let response = await this.usersService.getAll(pNum)
      console.log(response);
      this.currentPage = response.page;
      this.totalPages = response.total_pages;
      this.arrUsers = response.results;
      console.log(this.arrUsers);
    }
    catch (error) {
      console.log(error);
    }
  }
}
