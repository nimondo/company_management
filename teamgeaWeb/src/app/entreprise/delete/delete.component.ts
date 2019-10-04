import { Component, OnInit } from '@angular/core';
import { Entreprise } from '../../models/entreprise.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EntrepriseService } from '../../services/entreprise.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  entreprise
  constructor(private route: ActivatedRoute, private entrepriseService: EntrepriseService,
    private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.entrepriseService.getSingleEntreprise(id).then(
      (entreprise: Entreprise) => {
        this.entreprise = entreprise;
      }
    );
  }
  onCancel(id:number){
    this.router.navigate(['/dashboard', 'single-entreprise', id]);
  }
  onDestroy(id:number){
    this.entrepriseService.deleteEntreprise(id).then(
      (message: String) => {
        this.router.navigate(['/dashboard']);
      }
    );
  }

}
