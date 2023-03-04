import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl: string = 'https://peticiones.online/api/users/';
  constructor(private httpClient: HttpClient) { }

  getAll(pPage: number = 1): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}?page=${pPage}`))
  }

  getById(pId: string): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}${pId}`))
  }

  create(pUser: User): Promise<User> {
    return lastValueFrom(this.httpClient.post<User>(this.baseUrl, pUser))
  }

  update(pUser: User): Promise<User> {
    return lastValueFrom(this.httpClient.put<User>(`${this.baseUrl}${pUser.id}`, pUser))
  }

  delete(pId: string): Promise<any> {
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}${pId}`))
  }

}
