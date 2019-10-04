import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Login } from '../models/login.model';
import { Router } from '@angular/router';
import { UserInfo } from '../models/userInfo.model';
import { CookieService} from 'ngx-cookie-service';
import { User} from '../models/User.model';
import { ToastService } from './toast.service';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubject = new Subject<boolean>();
  userStatus: boolean;
  user;
  userId='';
  token;
  constructor(private router:Router,
    private httpClient: HttpClient,
    private cookieService:CookieService,
    public toastService: ToastService) { 
    this.userStatus=false ;
  }
  emitUser() {
    this.userSubject.next(this.userStatus);
  }
  loginCheck(){
    return new Promise(
      (resolve, reject) => {
        this.httpClient
        .put<any>('http://teamgae/web/login_check',this.cookieService.getAll())
        .subscribe(
          (response) => {
            if(response.check==="ok"){
              resolve(true)
            }
            this.emitUser();
          },
          (error) => {
            reject(error.message);
          }
        );  
      }
      );  
    }
  createNewUser(user: User) {
    console.log(user);
    this.httpClient
    .post<any>('http://teamgae/web/registre',user)
    .subscribe(
      (response) => {
        console.log(response)
        if(response.message=="ok"){
          this.toastService.show('Utilisateur créer avec succès', { classname: 'bg-success text-light', delay: 15000 });
          this.router.navigate(['/dashboard']);
        }else{
          this.userStatus = false;
        }
        this.emitUser();
      },
      (error) => {
        console.log('Erreur ! : ' + error.message);
        this.toastService.show('Username déjà utilisé', { classname: 'bg-danger text-light', delay: 10000 });
        this.userStatus = false;
        this.emitUser();
      }
    );  
    
  }
  //{headers: headers})
  signIn(login: Login) {
    console.log(login);
    // const head = new Headers({'Content-Type':'application/json'});
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    // let options = { headers: headers, crossDomain: true, withCredentials: true};
    this.httpClient
    .put<any>('http://teamgae/web/login',login)
    .subscribe(
      (response) => {
        console.log(response)
        if(response.id){
          this.userStatus = true;
          this.cookieService.delete('token');
          this.cookieService.set(
            'token',
            response.token
          );
          this.toastService.show('Bienvenue '+response.name, { classname: 'bg-success text-light', delay: 15000 });
          console.log(this.cookieService.getAll());
          //this.userId = response.id;
          //this.users=response[0];
          this.router.navigate(['/dashboard']);
        }else{
          this.userStatus = false;
          this.toastService.show('Identifiants incorrects', { classname: 'bg-danger text-light', delay: 10000 });
        }
        this.emitUser();
      },
      (error) => {
        console.log('Erreur ! : ' + error.message);
        this.toastService.show('Echec de connexion', { classname: 'bg-danger text-light', delay: 10000 });
        this.userStatus = false;
        this.emitUser();
      }
    );  
  }
  VerifUserLog():Promise<any> {
    //console.log(this.cookieService.getAll());
    this.httpClient
    .put<any>('http://teamgae/web/login_check',this.cookieService.getAll())
    .subscribe(
      (response) => {
        console.log(response)
        if(response.check==="ok"){
          this.userStatus = true;
        }else{
          this.userStatus = false;
        }
        this.emitUser();
        return this.userStatus;
      },
      (error) => {
        console.log('Erreur ! : ' + error.message);
        this.userStatus = false;
        return error.message;
      }
    );  
    return;
}
updateUser(user: UserInfo) {
  user['token']= this.cookieService.get('token');
  console.log(user);
  this.httpClient
  .put<any>('http://teamgae/web/manageuser',user)
  .subscribe(
    (response) => {
      console.log(response)
      if(response.message=="ok"){
        this.toastService.show('Utilisateur modifié avec succès', { classname: 'bg-success text-light', delay: 15000 });
        this.router.navigate(['/dashboard']);
      }else{
        this.toastService.show('Echec de modification', { classname: 'bg-danger text-light', delay: 10000 });
      }
    },
    (error) => {
      console.log('Erreur ! : ' + error.message);
      this.toastService.show('Echec de modification', { classname: 'bg-danger text-light', delay: 10000 });
    }
  );  
  
}
  
  signOutUser() {
    this.httpClient
        .put<any>('http://teamgae/web/logout',this.cookieService.getAll())
        .subscribe(
          (response) => {
            console.log(response);
            if(response.logout==="ok"){
              this.userStatus = false;
              this.router.navigate(['/']);
            }
            this.emitUser();
          },
          (error) => {
            console.log('Erreur ! : ' + error.message);
            this.userStatus = false;
            this.emitUser();
          }
        );  
}
}
