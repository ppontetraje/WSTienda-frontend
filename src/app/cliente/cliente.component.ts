import { Component, OnInit } from '@angular/core';
import { ApiclienteService } from '../services/apicliente.service';
import { Response } from '../responseReceiver/response';
import { DialogClienteComponent } from './dialog/dialogcliente.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  public lst!: any[];
  public columns: string[] = ["idCliente", "nombre"];
  constructor(
    private apicliente: ApiclienteService,
    private dialog: MatDialog
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
      width: '300'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getClientes();
    });
  }

}
