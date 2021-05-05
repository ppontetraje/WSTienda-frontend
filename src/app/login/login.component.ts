import {Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiAuthService } from "../services/apiauth.service";
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms'

@Component({ 
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{
    
    public loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });
    
    constructor(public apiAuthService: ApiAuthService, 
        private router: Router,
        private formBuilder: FormBuilder){
        /*if(this.apiAuthService.usuarioData){
            this.router.navigate(['/']);
        }*/
    }
    ngOnInit() {
        
    }


    login(){
        this.apiAuthService.login(this.loginForm.value).subscribe(response => {
            if(response.success){
                this.router.navigate(['/']);
            }
        });
    }

}