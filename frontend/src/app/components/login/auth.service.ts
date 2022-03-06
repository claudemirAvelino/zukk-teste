import {Injectable} from '@angular/core';
import {Usuario} from './usuario';
import {constantsProvider} from '../../consts/constants-provider';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, EMPTY} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';

interface TokenResponse {
  token: string;
}

export interface UserDetails {
  _id: number;
  nome: string;
  email: string;
  password: string;
  exp: number;
  iat: number;
  uid: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {
  }

  // tslint:disable-next-line:typedef
  authentication(usuario: Usuario) {
    const url: string = constantsProvider.URL;

    const base = this.http.post(`${url}/authenticate`, usuario).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );

    base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    ).subscribe(() => {
      this.showMessage('Usuário autenticado', false);
      this.router.navigateByUrl('/dashboard');
    });
  }

  // tslint:disable-next-line:typedef
  errorHandler(e: any) {
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;

  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {

      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token);
    this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('usertoken');
    this.router.navigateByUrl('/login');
  }
}
