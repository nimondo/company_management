import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit() {
  }
  onLogout() {
    this.authService.signOutUser();
  }
  onSetting() {
    this.router.navigate(['/dashboard/setting']);
  }

}
