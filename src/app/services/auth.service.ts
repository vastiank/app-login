import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts';

  private API_KEY = 'AIzaSyDXxfRcj9eSkNIPrqh0q2dvHyGgCkWviNs'

  userToken:string; 


  constructor(private http:HttpClient) { }

  private usuario: UsuarioModel;

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('expira');

  }

  logIn(usuario: UsuarioModel) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}:signInWithPassword?key=${this.API_KEY}`,
      authData
    ).pipe(
      map(resp => {
        console.log("Entry")
        this.saveToken(resp['idToken']);
        return resp;
      })
    );

  }

  NuevoUsuario(usuario: UsuarioModel) {


    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}:signUp?key=${this.API_KEY}`,
      authData
    ).pipe(
      map(resp => {
        console.log("Entro en el mapa del rxjs")
        this.saveToken(resp['idToken']);
        return resp;

      })

    );


  }

  saveToken(idToken: string) {

    this.userToken = idToken;

    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getTime().toString());

  }

  readToken() {

    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAutenticado(): boolean {

    /*
    if (this.userToken.length < 2){
      return false;
    }
    */

    const expira = Number(localStorage.getItem('expira'));

    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
    } else {
      return false;
    }
  }

  


}
