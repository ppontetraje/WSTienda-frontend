import { Component, OnInit } from '@angular/core';
import { ApiclienteService } from '../services/apicliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(private apicliente: ApiclienteService) {
    apicliente.getClientes().subscribe(response => {
      console.log(response);
    });
   }

  ngOnInit(): void {
  }

}