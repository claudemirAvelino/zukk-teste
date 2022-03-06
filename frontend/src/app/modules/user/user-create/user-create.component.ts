import { UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})


export class UserCreateComponent implements OnInit {

  constructor(
    private userService: UserService

  ) { }

  ngOnInit(): void {



  }


  createUser(): void {
    this.userService.showMessage('Cadastrado com sucesso')

  }

}
