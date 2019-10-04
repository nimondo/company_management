import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Employe } from '../models/employe.model';
import { ToastService } from './toast.service';
import { HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  employeSubject = new Subject<Employe[]>();
  employe=[];
  toDelete=[];
  constructor(private httpClient: HttpClient,
    public toastService: ToastService) {
    this.getEmploye();
   }
   emitEmploye() {
    this.employeSubject.next(this.employe);
  }
  getEmployesByEntreprise(id: number){
    return new Promise(
      (resolve, reject) => { this.httpClient
    .get<any>(`http://teamgae/web/employesentre/${id}`)
    .subscribe(
      (response) => {
        this.emitEmploye();
        resolve(response);
      },
      (error) => {
        console.log('Erreur ! : ' + error.message);
        //this.toastService.show('Echec de création', { classname: 'bg-danger text-light', delay: 10000 });
        reject(error.message);
      }
      ); 
    }
  );
}
getEmploye(){
  this.httpClient
  .get<any>('http://teamgae/web/employes')
  .subscribe(
    (response) => {
      console.log(response);
        this.employe = response;
        this.emitEmploye();
    },
    (error) => {
      console.log('Erreur ! : ' + error.message);
      //this.toastService.show('Echec de création', { classname: 'bg-danger text-light', delay: 10000 });
      //return error.message;
    }
  ); 
}
getSingleEmploye(id: number){
  return new Promise(
    (resolve, reject) => { this.httpClient
  .get<any>(`http://teamgae/web/employes/${id}`)
  .subscribe(
    (response) => {
      resolve(response);
    },
    (error) => {
      console.log('Erreur ! : ' + error.message);
      //this.toastService.show('Echec de création', { classname: 'bg-danger text-light', delay: 10000 });
      reject(error.message);
    }
    ); 
  }
);
}
createNewEmploye(newEmploye: Employe) {
  this.httpClient
  .post<any>('http://teamgae/web/employes',newEmploye)
  .subscribe(
    (response) => {
      console.log(response);
        this.employe.push(response);
        this.emitEmploye();
        this.toastService.show('Employe créé avec succès', { classname: 'bg-success text-light', delay: 15000 });

    },
    (error) => {
      console.log('Erreur ! : ' + error.message);
      this.toastService.show('Echec de création', { classname: 'bg-danger text-light', delay: 10000 });
      return error.message;
    }
  ); 
}
updateEmploye(newEmploye: Employe) {
  return new Promise(
    (resolve, reject) => {
  this.httpClient
  .put<any>('http://teamgae/web/employes',newEmploye)
  .subscribe(
    (response) => {
      const EntreIndexToUpdate = this.employe.findIndex(
        (blogEl) => {
          if(blogEl === newEmploye) {
            return true;
          }
        }
      );
      this.employe[EntreIndexToUpdate]=newEmploye;
        this.emitEmploye();
        this.toastService.show('Employe modifié avec succès', { classname: 'bg-success text-light', delay: 15000 });
        resolve(response);
    },
    (error) => {
      console.log('Erreur ! : ' + error.message);
      this.toastService.show('Echec de modification', { classname: 'bg-danger text-light', delay: 10000 });
      reject(error.message);
      }
    );
    }
  ); 
}
deleteEmploye(id: number){
  return new Promise(
    (resolve, reject) => { this.httpClient
  .delete<any>(`http://teamgae/web/employes/${id}`)
  .subscribe(
    (response) => {
      if(response.message=="ok"){
        this.toastService.show('Employé supprimé avec succès', { classname: 'bg-success text-light', delay: 15000 });
        const EmpIndexToRemove = this.employe.findIndex(
          (blogEl) => {
            if(blogEl.id === id) {
              return true;
            }
          }
        );
        console.log(this.employe)
        this.toDelete=this.employe.splice(EmpIndexToRemove, 1);
        console.log(this.employe);
        //this.toDelete[0].shift();
        this.emitEmploye();
        resolve(response);
      }
    },
    (error) => {
      this.toastService.show('Echec de suppression', { classname: 'bg-danger text-light', delay: 10000 });
      reject(error.message);
    }
    ); 
  }
);
}
}
