import { Component, OnInit,ElementRef, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntrepriseService } from '../../services/entreprise.service';
import { Entreprise} from '../../models/entreprise.model';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @ViewChild("labelImport", {static: true}) labelImport: ElementRef;

  fileToUpload: File = null;
  lego;
  entreprise;
  entrepriseForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  url;
  preUrl;
  fileUploaded = false;
  errorFile:boolean;
//   opts:{
//     read?: any;
//     static: boolean;
// }={'read':'ok','static': true}
  

  constructor(private formBuilder: FormBuilder,
              private entrepriseService: EntrepriseService,
              private httpClient: HttpClient,
              private router: Router,
              private route: ActivatedRoute) { }

              ngOnInit() {
                const id = this.route.snapshot.params['id'];
                if(id){
                  this.entrepriseService.getSingleEntreprise(id).then(
                    (entreprise: Entreprise) => {
                       this.entreprise = entreprise;
                       this.entrepriseForm.patchValue({
                        nom: this.entreprise.nom,
                        email: this.entreprise.email,
                        logo :this.entreprise.logo,
                        siteWeb: this.entreprise.siteWeb,
                      });
                 }
                  );
                }
                this.initForm();
              }
              initForm() {
                this.entrepriseForm = this.formBuilder.group({
                  nom: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{3,}/)]],
                  logo: ['', ],
                  email: ['',[Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
                  siteWeb: ['',[Validators.required, Validators.pattern(/^(https|http):\/\/+(.+)/
)]]
                });
              }
            
  onSaveBlog() {
    const formValue = this.entrepriseForm.value;
                const newEntreprise = new Entreprise(
                  formValue['nom'],
                  formValue['email'],
                  formValue['siteWeb']
                  );
                
    if(this.fileUrl && this.fileUrl !== '') {
      newEntreprise.logo = this.fileUrl;
    }
    this.entrepriseService.createNewEntreprise(newEntreprise);
    this.router.navigate(['/dashboard/entreprise']);
  }
  onUploadFile(file: File) {
    //console.log(typeof(file));
    const formData = new FormData();
    formData.append('file', file);
    this.fileIsUploading = true;
    //console.log(files);
    this.httpClient
    .post<any>('http://teamgae/web/upload',formData)
    .subscribe(
      (response) => {
        console.log(response)
        this.fileUrl = response.message;
        this.fileIsUploading = false;
        this.fileUploaded = true;
        //this.emitUser();
      },
      (error) => {
        console.log('Erreur ! : ' + error.message);
        return error.message;
      }
    ); 
    // this.entrepriseService.uploadFile(file).then(
    //   (url: string) => {
    //     this.fileUrl = url;
    //     this.fileIsUploading = false;
    //     this.fileUploaded = true;
    //   }
    // );
  }
  fileValidate(file: File) {
    let back = false;
    let result = false;
    this.lego = file;
    let  allowedTypes = ['png', 'jpg', 'jpeg', 'gif'];
    let img = file.type.split('/');
    let imgType = img[1].toLowerCase();
    if(allowedTypes.indexOf(imgType) != -1) {
        back =true;
    }else{
      this.errorFile = true;
      back= false;
      return false;
    }
    if(back){
      const reader = new FileReader();
      const image = new Image();
      const e = () => {
        this.preUrl = reader.result;
        image.src = this.preUrl;
        image.onload = ()=>{
         const imgwidth = image.width;
         const imgheight = image.height;
          if(imgwidth>100 && imgheight>100){
            this.errorFile = false;
            this.url = reader.result;
            this.labelImport.nativeElement.innerText = this.lego.name;
            this.fileToUpload = this.lego;
            console.log('ok');
            this.onUploadFile(this.lego);
            }else{
            this.errorFile = true;
          }
        }
      };
      reader.addEventListener('load', e, false);
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }
detectFiles(event) {
  let files = event.target.files[0];
  this.fileValidate(files);
}
updateEntreprise(val){
  const iD = this.route.snapshot.params['id'];
  val['id']=iD;
  console.log(val);
  this.entrepriseService.updateEntreprise(val).then(
    (message: String) => {
      this.router.navigate(['/dashboard', 'single-entreprise', iD]);
    }
  );
}
onBack() {
  this.router.navigate(['/dashboard/entreprise']);
}

}
