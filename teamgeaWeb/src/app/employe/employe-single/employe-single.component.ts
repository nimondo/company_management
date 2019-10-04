import { Component, OnInit } from '@angular/core';
import { Employe } from '../../models/employe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from '../../services/employe.service';

@Component({
  selector: 'app-single',
  templateUrl: './employe-single.component.html',
  styleUrls: ['./employe-single.component.scss']
})
export class EmployeSingleComponent implements OnInit {
  employe;
  employes;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private employeService: EmployeService,) { }
  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.employeService.getSingleEmploye(id).then(
      (employe: Employe) => {
        this.employe = employe;
      }
    );
  }

  onDelete(id:number){
    this.router.navigate(['/dashboard', 'delete-employe', id]);
  }
  onUpdate(id:number){
    this.router.navigate(['/dashboard', 'update-employe', id]);
  }
  onBack() {
    this.router.navigate(['/dashboard', 'employe']);
  }

}

