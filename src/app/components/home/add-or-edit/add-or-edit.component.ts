import { Component, OnInit } from '@angular/core';
import { UsuarioDB } from 'src/app/models/usuariodb.model';
import { FormGroup, NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-or-edit',
  templateUrl: './add-or-edit.component.html',
  styleUrls: ['./add-or-edit.component.css']
})
export class AddOrEditComponent implements OnInit {

  user: UsuarioDB = new UsuarioDB();

  form:FormGroup

  constructor(private userService:UserService,
              private route:ActivatedRoute,
              private routeNavigate:Router) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'new') {

      this.userService.getUser(id)
        .subscribe((resp: UsuarioDB) => {
          this.user = resp;
          this.user.id_user = id;
        });
    }

  }


  saveCustomer(form: NgForm) {

    if (form.invalid) {

      Object.values(form.controls).forEach(control => {
        console.log(control);
        control.markAsTouched();
      });
      Swal.fire({
        title: 'Opss!',
        text: 'Ingresa los campos requeridos',
        icon: 'error'
      });
      return;
    }

    Swal.fire({
      title: 'Un momento',
      text: 'Procesando solicitud...',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    if (this.user.id_user) {

      this.userService.updateUser(this.user)
        .subscribe(resp => {

          Swal.fire({
            title: this.user.name,
            text: 'Actualizacion Exitosa',
            icon: 'info',
            allowOutsideClick: false
          });
        });
        setTimeout(() => {
          this.routeNavigate.navigateByUrl('/home/list');
        }, 1000)

    } else {

      this.userService.createUserData(this.user)
        .subscribe(resp => {

          Swal.fire({
            title: this.user.name,
            text: 'Se ha creado con exito!',
            icon: 'success'
          });
        });
      setTimeout(() => {
        this.routeNavigate.navigateByUrl('/home/list');
      }, 1000)
    }
  }

}
