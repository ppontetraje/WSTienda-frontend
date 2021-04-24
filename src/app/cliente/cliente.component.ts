import { Component, OnInit } from '@angular/core';
import { ApiclienteService } from '../services/apicliente.service';
import { Response } from '../responseReceiver/response'


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  public lst: any[] = [];
  public columns: string[] = ["idCliente", "nombre"];
  constructor(private apicliente: ApiclienteService) {
    
   }

  ngOnInit(): void {
    this.getClientes();
  }
  getClientes(){
    this.apicliente.getClientes().subscribe(response => {
      this.lst = response.data;  
    });
  }

}
