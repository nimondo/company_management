import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { EmployeService } from '../services/employe.service';
import { Employe} from '../models/employe.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.scss']
})
export class EmployeComponent implements OnInit , OnDestroy {
  p: number = 1;
  @Input() iPP: number = 10;
  employes: Employe[];
  employesSubscription: Subscription;
  constructor(private employeService: EmployeService,
              private router: Router) { }

  ngOnInit() {
    this.employesSubscription = this.employeService.employeSubject.subscribe(
      (employes: Employe[]) => {
        this.employes = employes;
        // console.log(employes);
      }
    );
    this.employeService.emitEmploye();
  }
  addEmploye(){
    this.router.navigate(['/dashboard/create-employe']);
  }
  onViewEmploye(id: string) {
    this.router.navigate(['/dashboard', 'single-employe', id]);
  }
  ngOnDestroy() {
    this.employesSubscription.unsubscribe();
  }
}
