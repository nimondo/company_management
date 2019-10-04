import { Component, OnInit,ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntrepriseService } from '../../services/entreprise.service';
import { Entreprise} from '../../models/entreprise.model';
import { EmployeService } from '../../services/employe.service';
import { Employe} from '../../models/employe.model';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-employe-create',
  templateUrl: './employe-create.component.html',
  styleUrls: ['./employe-create.component.scss']
})
export class EmployeCreateComponent implements OnInit , OnDestroy{
  @ViewChild("labelImport", {static: true}) labelImport: ElementRef;

  lego;
  employe;
  employeForm: FormGroup;
  entreprise_id;
  entreprises: Entreprise[];
  entreprisesSubscription: Subscription;
  

  constructor(private formBuilder: FormBuilder,
              private entrepriseService: EntrepriseService,
              private employeService: EmployeService,
              private httpClient: HttpClient,
              private router: Router,
              private route: ActivatedRoute) { }

              ngOnInit() {
                this.entreprisesSubscription = this.entrepriseService.entrepriseSubject.subscribe(
                  (entreprises: Entreprise[]) => {
                    this.entreprises = entreprises;
                    console.log(this.entreprises);
                  }
                );
                this.entrepriseService.emitEntreprise();
                const id = this.route.snapshot.params['id'];
                if(id){
                  this.employeService.getSingleEmploye(id).then(
                    (employe: Employe) => {
                       this.employe = employe;
                       console.log(employe);
                       this.employeForm.patchValue({
                        nom: this.employe.nom,
                        prenom: this.employe.prenom,
                        email: this.employe.email,
                        telephone: this.employe.telephone,
                        entreprise_id:this.employe.entreprise_id.id,
                      });
                 }
                  );
                }
                this.initForm();
              }
              initForm() {
                this.employeForm = this.formBuilder.group({
                  nom: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{3,}/)]],
                  prenom: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{3,}/)]],
                  email: ['',[Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
                  telephone: ['',[Validators.required, Validators.pattern(/\d{8}/)]],
                  entreprise_id : []
                });
              }
  getSelectedValue(event){
    console.log(event);
    this.entreprise_id = event.id;
  }        
  onSaveBlog() {
    const formValue = this.employeForm.value;
                const newEmploye = new Employe(
                  formValue['nom'],
                  formValue['prenom'],
                  formValue['email'],
                  formValue['telephone'],
                  );
    console.log(this.entreprise_id)
    if(this.entreprise_id && this.entreprise_id !== '') {
        newEmploye.entreprise_id = this.entreprise_id;
        this.employeService.createNewEmploye(newEmploye);
    console.log(newEmploye);
    this.router.navigate(['/dashboard/employe']);
    }else{
      alert("Vous devez fournir une entreprise");
    }           
  }
  
  
updateEmploye(val){
  const iD = this.route.snapshot.params['id'];
  val.id = iD;
  if(this.entreprise_id && this.entreprise_id !== '') {
    val.entreprise_id = this.entreprise_id;
  }
  console.log(val);
  this.employeService.updateEmploye(val).then(
    (message: String) => {
      this.router.navigate(['/dashboard', 'single-employe', iD]);
    }
  );
}
onBack() {
  this.router.navigate(['/dashboard/employe']);
}
ngOnDestroy() {
  this.entreprisesSubscription.unsubscribe();
}

}
