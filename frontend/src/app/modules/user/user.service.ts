import { User } from './user.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import {  HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL =''


  constructor(
    private snackBar: MatSnackBar,
    private http:HttpClient
    ) { }


  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"

    })

  }

//   create(user:User){

// return this.http.post()
//   }

}
