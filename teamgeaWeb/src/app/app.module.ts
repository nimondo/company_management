import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes,CanActivate} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService} from 'ngx-cookie-service';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ManageComponent } from './manage/manage.component';
import { EntrepriseComponent } from './entreprise/entreprise.component';
import { EmployeComponent } from './employe/employe.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ToastsContainer  } from './manage/toasts-container.component';
import { AuthGuardService} from './services/auth-guard.service';
import { SettingComponent } from './auth/setting/setting.component';
import { SingleComponent } from './entreprise/single/single.component';
import { CreateComponent } from './entreprise/create/create.component';
import { DeleteComponent } from './entreprise/delete/delete.component';
import { EmployeSingleComponent } from './employe/employe-single/employe-single.component';
import { EmployeCreateComponent } from './employe/employe-create/employe-create.component';
import { EmployeDeleteComponent } from './employe/employe-delete/employe-delete.component';

const appRoutes: Routes = [
  { path: '', component: ContentComponent },
  { path: 'signin', component: SigninComponent },
  // { path: '**', redirectTo: '' },
  {path: 'dashboard', canActivate: [AuthGuardService],component: ManageComponent, children: [
    { path:'', redirectTo: 'entreprise', pathMatch: 'full'}, 
    { path: 'entreprise', component: EntrepriseComponent },
    { path: 'create-manager', component: SignupComponent }, 
    { path: 'setting', component: SettingComponent },  
    { path: 'create-entreprise', component: CreateComponent }, 
    { path: 'single-entreprise/:id', component: SingleComponent }, 
    { path: 'delete-entreprise/:id', component: DeleteComponent }, 
    { path: 'update-entreprise/:id', component: CreateComponent },
    { path: 'employe', component: EmployeComponent }, 
    { path: 'create-employe', component: EmployeCreateComponent },
    { path: 'single-employe/:id', component: EmployeSingleComponent },
    { path: 'update-employe/:id', component: EmployeCreateComponent },
    { path: 'delete-employe/:id', component: EmployeDeleteComponent },  
      ]
    },
];
@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    SigninComponent,
    ManageComponent,
    EntrepriseComponent,
    EmployeComponent,
    ToastsContainer,
    SignupComponent,
    SettingComponent,
    SingleComponent,
    CreateComponent,
    DeleteComponent,
    EmployeSingleComponent,
    EmployeCreateComponent,
    EmployeDeleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    NgxPaginationModule,
    NgSelectModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
