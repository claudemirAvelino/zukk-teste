import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {AuthService} from './auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private usuario: Usuario = new Usuario();

  constructor(private authService: AuthService) { }

  form: FormGroup = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

  ngOnInit(): void {

  }



  // tslint:disable-next-line:typedef
  submit() {
    if (this.form.value.login && this.form.value.password){
      this.usuario.login = this.form.value.login;
      this.usuario.password = this.form.value.password;
      const auth = this.authService.authentication(this.usuario);
    }else{
      this.error = 'É necessário que todos os campos sejam preenchidos';
    }
  }
}
