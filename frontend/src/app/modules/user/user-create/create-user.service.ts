import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {constantsProvider} from '../../../consts/constants-provider';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {EMPTY} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { Cliente } from './user.interface';
import axios from 'axios';

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})

export class CreateUserService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {
  }

  // tslint:disable-next-line:typedef
  save(clientes: Cliente) {
    const url: string = constantsProvider.URL;

    return this.http.post(`${url}/customer`, clientes).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  // tslint:disable-next-line:typedef
  getCustomers() {
    const url: string = constantsProvider.URL;

    return this.http.get(`${url}/customer`).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );

    /*base.pipe(
      map((data: TokenResponse) => {
        return data;
      })
    ).subscribe(() => {
      console.log('fechar modal');
    });*/
  }

  // tslint:disable-next-line:typedef
  getCustomer(id: number) {
    const url: string = constantsProvider.URL;

    const base = this.http.get(`${url}/customer/${id}`).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );

    base.pipe(
      map((data: TokenResponse) => {
        return data;
      })
    ).subscribe(() => {
      console.log('fechar modal');
    });
  }

  // tslint:disable-next-line:typedef
  updateCustomer(id: number, customer) {
    const url: string = constantsProvider.URL;

    return this.http.put(`${url}/customer/${id}`, customer).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  // tslint:disable-next-line:typedef
  deleteCustomer(id: number) {
    const url: string = constantsProvider.URL;

    return this.http.delete(`${url}/customer/${id}`).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
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

  // tslint:disable-next-line:typedef
  getCep(cep: string) {
    const url: string = constantsProvider.URL;

    return this.http.get(`${url}/get-address/${cep}`).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }
}
