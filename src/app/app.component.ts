import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './interfaces/usuario';
import { ApiAuthService } from './services/apiauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  user!: Usuario;

  constructor(public apiAuthService: ApiAuthService,
    private router: Router
    ){
      this.apiAuthService.user.subscribe(res => {
        this.user = res;
        console.log("cambió el objeto: " + res)
      });

    }
  logout(){
    this.apiAuthService.logout();
    this.router.navigate(['/login']);
  }
}

