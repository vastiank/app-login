import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UsuarioDB } from 'src/app/models/usuariodb.model';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService:UserService, private auth:AuthService, private router:Router) { }

  users:UsuarioDB[] = [];

  loading:boolean = false;

  ngOnInit(): void {

    Swal.fire({
      title: 'BIENVENIDO',
      showConfirmButton: true
    });
    

    this.loading= true;

    this.userService.getUsers()
    .subscribe( resp => {
      console.log(resp);
      this.users = resp;

      this.loading = false;
    });

    console.log(this.users);
  }

  removeUser(user:UsuarioDB, i:number){

    Swal.fire({

      title: `¿Esta seguro de borrar a ${user.name}?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton:true

    }).then( resp => {

      if (resp.value){

        this.userService.deleteUser(user.id_user).subscribe();
        this.users.splice(i,1);
      }

    });

  }

  cerrarSesion() {

    this.auth.logOut();
    this.router.navigateByUrl('/login');

  }

  



}
