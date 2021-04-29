import {Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiAuthService } from "../services/apiauth.service";

@Component({ 
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{
    
    public email!: string;
    public password!: string;
    constructor(public apiAuthService: ApiAuthService, private router: Router){
        if(this.apiAuthService.usuarioData){
            this.router.navigate(['/']);
        }
    }
    ngOnInit() {
        
    }

    login(){
        this.apiAuthService.login(this.email, this.password).subscribe(response => {
            if(response.success){
                this.router.navigate(['/']);
            }
        });
    }

}