import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule,Router } from '@angular/router';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/User.model';
import { Login } from '../../models/login.model';
import { UserInfo } from '../../models/userInfo.model'; 

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  authStatus: boolean;
  authIsNotAuthenticated:boolean;
  authUserId: string;
  errorMessage: string;
  loginForm: FormGroup;
  //user: UserInfo[];

  constructor(private authService: AuthService,
              private router: Router,
			  private formBuilder: FormBuilder,
              private httpClient: HttpClient) { }

  ngOnInit() {
  this.authStatus = this.authService.userStatus;
	this.authUserId = this.authService.userId;
	this.initForm();
  }
  initForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }
    onSubmitForm() {
    const formValue = this.loginForm.value;
    const mailUser = new Login(
      formValue['username'],
      formValue['password']
    );
  this.authService.signIn(mailUser);
  }


}
