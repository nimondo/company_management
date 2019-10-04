import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Entreprise } from '../models/entreprise.model';
import { ToastService } from './toast.service';
import { HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
  entrepriseSubject = new Subject<Entreprise[]>();
  entreprise=[];
  toDelete=[];
  response:string;
  constructor(private httpClient: HttpClient,
    public toastService: ToastService) {
    this.getEntreprise();
   }
  emitEntreprise() {
    this.entrepriseSubject.next(this.entreprise);
  }
  getEntreprise(){
    this.httpClient
    .get<any>('http://teamgae/web/entreprises')
    .subscribe(
      (response) => {
        console.log(response);
          this.entreprise = response;
          this.emitEntreprise();
      },
      (error) => {
        console.log('Erreur ! : ' + error.message);
        //this.toastService.show('Echec de création', { classname: 'bg-danger text-light', delay: 10000 });
        //return error.message;
      }
    ); 
  }
  getSingleEntreprise(id: number){
    return new Promise(
      (resolve, reject) => { this.httpClient
    .get<any>(`http://teamgae/web/entreprises/${id}`)
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
  createNewEntreprise(newEntreprise: Entreprise) {
    this.httpClient
    .post<any>('http://teamgae/web/entreprises',newEntreprise)
    .subscribe(
      (response) => {
          this.entreprise.push(response);
          this.emitEntreprise();
          this.toastService.show('Entreprise créée avec succès', { classname: 'bg-success text-light', delay: 15000 });

      },
      (error) => {
        console.log('Erreur ! : ' + error.message);
        this.toastService.show('Echec de création', { classname: 'bg-danger text-light', delay: 10000 });
        return error.message;
      }
    ); 
  }
  updateEntreprise(newEntreprise: Entreprise) {
    return new Promise(
      (resolve, reject) => {
    this.httpClient
    .put<any>('http://teamgae/web/entreprises',newEntreprise)
    .subscribe(
      (response) => {
        const EntreIndexToUpdate = this.entreprise.findIndex(
          (blogEl) => {
            if(blogEl === newEntreprise) {
              return true;
            }
          }
        );
        this.entreprise[EntreIndexToUpdate]=newEntreprise;
          this.emitEntreprise();
          this.toastService.show('Entreprise modifiée avec succès', { classname: 'bg-success text-light', delay: 15000 });
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
  uploadFile(file: File): Promise<any>{
    this.httpClient
    .post<any>('http://teamgae/web/upload',file)
    .subscribe(
      (response) => {
        console.log(response)
        return response.url;
        //this.emitUser();
      },
      (error) => {
        console.log('Erreur ! : ' + error.message);
        return error.message;
      }
    ); 
    return ; 
  }
  
  deleteEntreprise(id: number){
    return new Promise(
      (resolve, reject) => { this.httpClient
    .delete<any>(`http://teamgae/web/entreprises/${id}`)
    .subscribe(
      (response) => {
        if(response.message=="ok"){
          this.toastService.show('Entreprise supprimée avec succès', { classname: 'bg-success text-light', delay: 15000 });
          const EntreIndexToRemove = this.entreprise.findIndex(
            (blogEl) => {
              if(blogEl.id === id) {
                return true;
              }
            }
          );
          this.toDelete=this.entreprise.splice(EntreIndexToRemove, 1);
          this.emitEntreprise();
          resolve(response);
        }
      },
      (error) => {
        console.log('Erreur ! : ' + error.message);
        this.toastService.show('Echec de suppression. Vérifier s\'il ya pas des employes rattachés à cette entreprise!', { classname: 'bg-danger text-light', delay: 10000 });
        reject(error.message);
      }
      ); 
    }
  );
}
}
