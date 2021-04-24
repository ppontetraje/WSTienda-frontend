import { componentFactoryName } from "@angular/compiler";
import { Component } from '@angular/core'
import { MatDialogRef } from "@angular/material/dialog";
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
        public snackBar: MatSnackBar
    ) { }

    close(){
        this.dialogRef.close();
    }
    addCliente(){
        const cliente: Cliente = {nombre: this.nombre, apellidoPaterno: this.apellidoPaterno, apellidoMaterno: this.apellidoMaterno, dni: this.dni};
        this.apiCliente.add(cliente).subscribe(response =>{ 
            if(response.success === true){
                this.dialogRef.close();
                this.snackBar.open('Cliente Insertado con éxito', '', {
                    duration: 2000
                })
            }
        });
    }
}