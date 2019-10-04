import { Component, OnInit } from '@angular/core';
import { Entreprise } from '../../models/entreprise.model';
import { Employe } from '../../models/employe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EntrepriseService } from '../../services/entreprise.service';
import { EmployeService } from '../../services/employe.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {
  entreprise;
  employes;
  constructor(private route: ActivatedRoute, private entrepriseService: EntrepriseService,
    private router: Router,
    private employeService: EmployeService,) { }
  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.entrepriseService.getSingleEntreprise(id).then(
      (entreprise: Entreprise) => {
        this.entreprise = entreprise;
      }
    );
  }
  onViewEmpByEnt(id:number){
    this.employeService.getEmployesByEntreprise(id).then(
      (employe: Employe) => {
        this.employes = employe;
      }
    );
  }
  onDelete(id:number){
    this.router.navigate(['/dashboard', 'delete-entreprise', id]);
  }
  onUpdate(id:number){
    this.router.navigate(['/dashboard', 'update-entreprise', id]);
  }
  onBack() {
    this.router.navigate(['/dashboard']);
  }

}
