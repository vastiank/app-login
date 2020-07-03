import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UsuarioDB } from 'src/app/models/usuariodb.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private userService: UserService,
    private auth: AuthService) { }

  users: UsuarioDB[] = [];

  loading: boolean = false;




  ngOnInit(): void {
    this.loading = true;

    this.userService.getUsers()
      .subscribe(resp => {
        console.log(resp);
        this.users = resp;

        this.loading = false;
      });

    console.log(this.users);
  }

  removeUser(user: UsuarioDB, i: number) {

    Swal.fire({

      title: `¿Esta seguro de borrar a ${user.name}?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true

    }).then(resp => {

      if (resp.value) {

        this.userService.deleteUser(user.id_user).subscribe();
        this.users.splice(i, 1);
      }

    });

  }

  




}
