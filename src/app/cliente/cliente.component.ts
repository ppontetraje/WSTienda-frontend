import { Component, OnInit } from '@angular/core';
import { ApiclienteService } from '../services/apicliente.service';
import { Response } from '../responseReceiver/response';
import { DialogClienteComponent } from './dialog/dialogcliente.component';
import { MatDialog } from '@angular/material/dialog';
import { Cliente } from '../interfaces/cliente';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  public lst!: any[];
  public columns: string[] = ["idCliente", "nombre", "apellidoPaterno", "apellidoMaterno", "actions"];
  readonly width: string = "15%";  
  constructor(
    private apicliente: ApiclienteService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar 
    ) { }

  ngOnInit(): void {
    this.getClientes();
  }
  getClientes(){
    this.apicliente.getClientes().subscribe(response => {
      this.lst = response.data;  
    });
  }
  openAdd(){
    const dialogRef = this.dialog.open(DialogClienteComponent, {
      width: this.width
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getClientes();
    });
  }
  openEdit(cliente: Cliente){
    const dialogRef = this.dialog.open(DialogClienteComponent, {
      width: this.width,
      data: cliente
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getClientes();
    });
  }
  delete(cliente: Cliente){
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: this.width
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.apicliente.delete(cliente.idCliente).subscribe(response => {
          if(response.success){
            this.snackBar.open('Cliente Eliminado con Éxito', '',
            { 
              duration: 2000
            });
            this.getClientes();
          }
          else{
            this.snackBar.open('Cliente no fué Eliminado.', '',
            { 
              duration: 2000
            });
          }
        });

      }
    });
  }

}
