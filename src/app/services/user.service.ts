import { Injectable } from '@angular/core';
import { UsuarioDB } from '../models/usuariodb.model';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  private url = 'https://login-88bbd.firebaseio.com/users';

  createUserData(user:UsuarioDB){

    return this.http.post(
      `${this.url}.json`,
      user
    ).pipe(
      map( (resp:any) => {

        user.id_user = resp.name;
        return user;
      } )
    ) 

  }

  updateUser(user:UsuarioDB){

    const userTemp = {
      ...user
    };

    delete userTemp.id_user;

    return this.http.put(

      `${this.url}/${user.id_user}.json`,
      userTemp
    );
  }

  getUsers(){

    return this.http.get(
      `${this.url}.json`
    ).pipe(
      map(this.createArrayUsers)
    );
  }

  private createArrayUsers(userObj:Object){

    const users:UsuarioDB[] = [];

    if (userObj === null){ return [];}

    Object.keys(userObj).forEach(key => {
      const user:UsuarioDB = userObj[key];
      user.id_user = key;
      users.push(user);
    });
    return users;
  }

  getUser(id:string){
    return this.http.get(`${this.url}/${id}.json`);
  }

  deleteUser(id:string){
    return this.http.delete(`${this.url}/${id}.json`);

  }




}
