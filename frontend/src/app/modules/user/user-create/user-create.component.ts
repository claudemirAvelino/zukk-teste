import { UserService } from '../user.service';
import { CreateUserService } from './create-user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormUserComponent } from '../../../components/form-user/form-user.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})


export class UserCreateComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'endereco', 'bairro', 'cidade', 'uf', 'telefone', 'email', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private userService: UserService,
    private createUserService: CreateUserService,
    public dialog: MatDialog
  ) { }

  openDialog(row): void {
    const dialogRef = this.dialog.open(FormUserComponent, {
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.dataSource.data.push(result);
        this.dataSource.data = this.dataSource.data;
      }
    });
  }

  deleteCustomer(row: any): void {
    this.createUserService.deleteCustomer(row.id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((customer) => {
        return customer.id !== row.id;
      });
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.createUserService.getCustomers().subscribe(customers => {
      console.log('customers', customers);
      this.dataSource = new MatTableDataSource<any>(customers as any);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  createUser(): void {
    this.userService.showMessage('Cadastrado com sucesso');
  }

}
