import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router) { }

  usuario: UsuarioModel;
  recordarUsuario = false;

  ngOnInit(): void {
    this.usuario = new UsuarioModel();

    if (localStorage.getItem('userEmail')) {
      this.usuario.email = localStorage.getItem('userEmail');
      this.recordarUsuario = true;
    }
  }

  onSubmit(form: NgForm) {


    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere porfavor...',
    })
    Swal.showLoading();

    console.log("Formulario");
    console.log(this.usuario);
    console.log(form);

    

    this.auth.logIn(this.usuario)
      .subscribe(resp => {

        Swal.close();
        console.log(resp);

        if (this.recordarUsuario) {
          localStorage.setItem('userEmail', this.usuario.email);
        }

        this.router.navigateByUrl('/home');

      }, (err) => {
        console.log(err);

        if (err.error.error.message === "INVALID_PASSWORD"){

          Swal.fire({
            icon: 'error',
            title: 'Error al autenticar',
            text: 'CONTRASEÑA INVALIDA',
          })
        }
      });
  }




}
