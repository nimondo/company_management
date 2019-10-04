import { Component, OnInit } from '@angular/core';
import { Employe } from '../../models/employe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from '../../services/employe.service';

@Component({
  selector: 'app-employe-delete',
  templateUrl: './employe-delete.component.html',
  styleUrls: ['./employe-delete.component.scss']
})
export class EmployeDeleteComponent implements OnInit {

  employe;
  constructor(private route: ActivatedRoute, private employeService: EmployeService,
    private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.employeService.getSingleEmploye(id).then(
      (employe: Employe) => {
        this.employe = employe;
      }
    );
  }
  onCancelEmploye(id:number){
    this.router.navigate(['/dashboard', 'single-employe', id]);
  }
  onDestroyEmploye(id:number){
    this.employeService.deleteEmploye(id).then(
      (message: String) => {
        this.router.navigate(['/dashboard', 'employe']);
      }
    );
  }

}
