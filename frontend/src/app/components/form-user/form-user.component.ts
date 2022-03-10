import {Component, Inject, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateUserService } from '../../modules/user/user-create/create-user.service';
import { Cliente } from '../../modules/user/user-create/user.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  clientes: Cliente[];
  cep: string;
  lat = 0;
  lng = 0;

  clienteForm !: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private createUserService: CreateUserService,
    private dialogRef: MatDialogRef<FormUserComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
  ) { }

  ngOnInit(): void {
    this.clienteForm = this.formBuilder.group({
      nome: ['', Validators.required],
      endereco: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', Validators.required],
    });

    if (this.editData){
      this.clienteForm.controls.nome.setValue(this.editData.nome);
      this.clienteForm.controls.endereco.setValue(this.editData.endereco);
      this.clienteForm.controls.bairro.setValue(this.editData.bairro);
      this.clienteForm.controls.cidade.setValue(this.editData.cidade);
      this.clienteForm.controls.uf.setValue(this.editData.uf);
      this.clienteForm.controls.telefone.setValue(this.editData.telefone);
      this.clienteForm.controls.email.setValue(this.editData.email);
    }
    console.log('data', );
  }

  // tslint:disable-next-line:typedef
  addCustomer(){
    if (!this.editData){
      if (this.clienteForm.valid){
        this.clienteForm.value.telefone = Number(this.clienteForm.value.telefone);
        this.createUserService.save(this.clienteForm.value).subscribe(customer => {
          // this.clientes = clientes;
          console.log('clientes', customer);
          this.dialogRef.close(customer);
        });
      }
    } else {
      this.updateCustomer();
    }
  }

  updateCustomer(): void {
    this.createUserService.updateCustomer(this.editData.id, this.clienteForm.value).subscribe(() => {
      this.clienteForm.reset();
      this.dialogRef.close();
    });
  }

  getCep(): void {
    const cep = this.cep;
    if (cep){
      this.createUserService.getCep(cep).subscribe((address: any) => {
        this.clienteForm.controls.endereco.setValue(address.logradouro);
        this.clienteForm.controls.bairro.setValue(address.bairro);
        this.clienteForm.controls.cidade.setValue(address.cidade.nome);
        this.clienteForm.controls.uf.setValue(address.estado.sigla);
        this.lat = address.latitude;
        this.lng = address.longitude;
      });
    }
  }
}
