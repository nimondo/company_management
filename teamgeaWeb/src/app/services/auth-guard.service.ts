import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,Router  } from '@angular/router';
import { Observable} from 'rxjs/Observable'; 
import { AuthService } from './auth.service';
import { CookieService} from 'ngx-cookie-service';
import { HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  isAuthentif:boolean;
  constructor(private authService: AuthService,
              private router: Router,
              private cookieService:CookieService,
              private httpClient: HttpClient) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
        console.log('lol',this.cookieService.getAll());
        this.httpClient
        .put<any>('http://teamgae/web/login_check',this.cookieService.getAll())
        .subscribe(
          (response) => {
            if(response.check==="ok"){
              this.isAuthentif = true;
              return true;
            }else{
              this.isAuthentif = false;
              this.router.navigate(['/signin']);
            }
            this.authService.emitUser();
          },
          (error) => {
            console.log('Erreur ! : ' + error.message);
            this.isAuthentif = false;
            this.router.navigate(['/signin']);
          }
        );  
        return true;
  } 
}
