import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { EntrepriseService } from '../services/entreprise.service';
import { Entreprise} from '../models/entreprise.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.scss']
})
export class EntrepriseComponent implements OnInit , OnDestroy {
  p: number = 1;
  @Input() iPP: number = 10;
  entreprises: Entreprise[];
  entreprisesSubscription: Subscription;
  constructor(private entrepriseService: EntrepriseService,
              private router: Router) { }

  ngOnInit() {
    this.entreprisesSubscription = this.entrepriseService.entrepriseSubject.subscribe(
      (entreprises: Entreprise[]) => {
        this.entreprises = entreprises;
        // console.log(this.entreprises)
      }
    );
    this.entrepriseService.emitEntreprise();
  }
  addEntreprise(){
    this.router.navigate(['/dashboard/create-entreprise']);
  }
  onViewEntreprise(id: string) {
    this.router.navigate(['/dashboard', 'single-entreprise', id]);
  }
  ngOnDestroy() {
    this.entreprisesSubscription.unsubscribe();
  }
}
