import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Detalles } from "src/app/interfaces/detalle";
import { Venta } from "src/app/interfaces/venta";
import { ApiventaService } from "src/app/services/apiventa.service";

@Component({
    templateUrl: 'dialogventa.component.html'
})
export class DialogVentaComponent {
    public venta!: Venta;
    public detalles!: Detalles[];

    public formDetalle = this.formBuilder.group({
        cantidad: [0, Validators.required],
        precioActual: [0, Validators.required],
        idProducto: [1, Validators.required]
    });

    constructor (
        public dialogRef: MatDialogRef<DialogVentaComponent>,
        public snackBar: MatSnackBar,
        private formBuilder: FormBuilder,
        public apiVenta: ApiventaService
        )
    {
        this.detalles = [],
        this.venta = {idCliente: 3, saleDetails: []}
    }
    close(){
        this.dialogRef.close();
    }
    addDetalle(){
        this.detalles.push(this.formDetalle.value);
    }
    addVenta(){
        this.venta.saleDetails = this.detalles;
        this.apiVenta.add(this.venta).subscribe( response => {
            if(response.success){
                this.dialogRef.close();
                this.snackBar.open("Venta echa con éxito!", '',{
                    duration:2000
                });
            }
        });
    }
}