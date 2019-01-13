import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DataServiceService } from '../data-service.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  api: any[] = null;
  public adduserForm: FormGroup;
  public controlsdata: any;
  public dataSource: any;
  public user: any;
  public url: any = '';
  public image: any;
  submitted = false;
  constructor(
    public DataService: DataServiceService,
    private router: Router
  ) { }

  get f() { return this.adduserForm.controls; }

  ngOnInit() {
    this.adduserForm = new FormGroup({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z\\s]+$'),
        Validators.minLength(4)
      ])),
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[A-Za-z0-9]+'),
        Validators.minLength(4)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Z0-9a-z._]{3,}@[A-Z0-9a-z]{3,}[.]{1}[A-Za-z.]{2,4}$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})'),
        Validators.minLength(4)
      ])),
    });
  }


  adduser() {
    this.submitted = true;
    if (this.adduserForm.invalid) {
      swal('Oops!', 'form invalid !', 'error');
      return;
    } else {
      const formData: FormData = new FormData();
      formData.append('name', this.adduserForm.value.name);
      formData.append('email', this.adduserForm.value.email);
      formData.append('username', this.adduserForm.value.username);
      formData.append('password', this.adduserForm.value.password);
      if (this.url) {
        formData.append('image', this.image, this.image.name);
      } else {
        swal('Oops!', 'Please select image !', 'error');
        return false;
      }
      this.DataService.register(formData, '')
        .subscribe(data => {
          this.dataSource = data;
          if (this.dataSource.statusCode === 1) {
            swal('Congratulations!', 'You are successfully register with us!', 'success');
            this.router.navigateByUrl('/');
          } else {
            swal('Oops!', 'Email or username already exist !', 'error');
          }
        });
    }
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.image = event.target.files[0];
    }
  }
}
