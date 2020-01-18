import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  invalidLogin: boolean;
  Organizations_Data: any = false;
  logo: any;
  model: any = {
    userName: 'admin',
    password: 'admin'
  };

  constructor(
    // private authenticationService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,


    private sanitizer: DomSanitizer) {
    // super();
    // let code = this.activatedRoute.snapshot.queryParamMap.get('code');
    // if (code == null || code == '') {
    //   this.router.navigate(['/404']);
    // }
    this.form = fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    // this.OrganizationsData();
    // this.getOrganizationByCode();
  }
  getOrganizationByCode() {
    // let code = this.activatedRoute.snapshot.queryParamMap.get('code');

    // let languageStorage = localStorage.getItem('language');
    // let tokenStorage = localStorage.getItem('token');

    // if (!tokenStorage) {


    //   this.service.get(this.APIs.init('Organizations', code).GetCode).subscribe(res => {

    //     this.service.Organizations(res);
    //     localStorage.setItem('Organizations_data', JSON.stringify(res));
    //     if (!languageStorage) {
    //       localStorage.setItem('language', res.primaryLanguage.toLowerCase());
    //     }
    //   });
    // }
  }
  OrganizationsData() {

    // this.service.OrganizationsData$.subscribe(async (res) => {
    //   if (res) {

    //     this.Organizations_Data = res;
    //     this.logo = this.sanitizer.bypassSecurityTrustResourceUrl(res['logoURLFl']);
    //   } else {
    //     let Organizations_data = localStorage.getItem('Organizations_data');
    //     Organizations_data = JSON.parse(Organizations_data);
    //     this.Organizations_Data = Organizations_data;
    //     this.logo = this.sanitizer.bypassSecurityTrustResourceUrl(Organizations_data['logoURLFl']);
    //   }
    // });
  }

  authorize() {
    this.router.navigate(['/main']);
    // let val = this.form.value;
    // //let Organizations_data = JSON.parse(localStorage.getItem('Organizations_data'));

    // val.organizationId ='038efd7f-9bcf-42f4-3819-08d715a43531'; //Organizations_data['id'];

    // this.authenticationService.login(val)
    //   .subscribe(result => {
    //     if (result) {
    //       let url = this.activatedRoute.snapshot.queryParamMap.get('returnUrl');
    //       url ? this.router.navigate([url]) : this.router.navigate(['/main']);
    //       this.invalidLogin = false;
    //     }
    //     else {
    //       this.invalidLogin = true;
    //     }
    //   });
  }
}
