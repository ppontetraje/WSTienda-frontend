import { componentFactoryName } from "@angular/compiler";
import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Cliente } from "src/app/interfaces/cliente";
import { ApiclienteService } from "src/app/services/apicliente.service";

@Component({
    templateUrl: 'dialogcliente.component.html'

})
export class DialogClienteComponent{
    public nombre!: string;
    public apellidoPaterno!: string;
    public apellidoMaterno!: string;
    public dni!: string;

    constructor(
        public dialogRef: MatDialogRef<DialogClienteComponent>,
        public apiCliente: ApiclienteService,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public cliente: Cliente
    ) { 
        if(this.cliente !== null){
            this.nombre = cliente.nombre;
            this.apellidoPaterno = cliente.apellidoPaterno;
            this.apellidoMaterno= cliente.apellidoMaterno;
            this.dni= cliente.dni;
        }
    }

    close(){
        this.dialogRef.close();
    }
    addCliente(){
        const cliente: Cliente = {idCliente: 0, nombre: this.nombre, apellidoPaterno: this.apellidoPaterno, apellidoMaterno: this.apellidoMaterno, dni: this.dni};
        this.apiCliente.add(cliente).subscribe(response =>{ 
            if(response.success === true){
                this.dialogRef.close();
                this.snackBar.open('Cliente Insertado con éxito', '', {
                    duration: 2000
                })
            }
        });
    }
    putCliente(){
        const cliente: Cliente = {idCliente: this.cliente.idCliente, nombre: this.nombre, apellidoPaterno: this.apellidoPaterno, apellidoMaterno: this.apellidoMaterno, dni: this.dni};        
        this.apiCliente.put(cliente).subscribe(response =>{ 
            if(response.success === true){
                this.dialogRef.close();
                this.snackBar.open('Cliente Modificado con éxito', '', {
                    duration: 2000
                })
            }
        });
    }

}