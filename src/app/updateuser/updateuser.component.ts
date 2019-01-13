import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DataServiceService } from '../data-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';


@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {
  api: any[] = null;
  public updateForm: FormGroup;
  public controlsdata: any;
  public dataSource: any;
  public user: any;
  public url: any = '';
  public image: any;
  submitted = false;
  sub: any;
  public userId: any;
  constructor(
    public DataService: DataServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  get f() { return this.updateForm.controls; }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params.id;
    });
    this.DataService.getDetails(this.userId)
      .subscribe((data: any) => {
        if (data.statusCode === 1) {
          const userData = data.responseData.result;
          this.updateForm.setValue({
            name: userData.name,
            username: userData.username,
            email: userData.email,
            password: userData.password,
          });
        }
      });


    this.updateForm = new FormGroup({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z\\s]+$'),
        Validators.minLength(4)
      ])),
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[A-Za-z0-9]+'),
        Validators.minLength(4)
      ])),
      email: new FormControl({ disabled: true }, Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Z0-9a-z._]{3,}@[A-Z0-9a-z]{3,}[.]{1}[A-Za-z.]{2,6}$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})'),
        Validators.minLength(4)
      ])),
    });
  }

  updateuser() {
    this.submitted = true;
    if (this.updateForm.invalid) {
      swal('Oops!', 'form invalid !', 'error');
      return;
    } else {
      const formData: FormData = new FormData();
      formData.append('name', this.updateForm.value.name);
      formData.append('email', this.updateForm.value.email);
      formData.append('username', this.updateForm.value.username);
      formData.append('password', this.updateForm.value.password);
      if (this.url) {
        formData.append('image', this.image, this.image.name);
      }
      this.DataService.updateuser(formData, '', this.userId)
        .subscribe(data => {
          this.dataSource = data;
          console.log(data);
          if (this.dataSource.statusCode === 1) {
            swal('Congratulations!', 'You are successfully updated the user with id !', 'success');
             this.router.navigateByUrl('/');
          } else {
            console.log('not Updated');
            swal('Oops!', 'Email or username already exist !', 'error');
          }
        });
    }

  }
  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (events: ProgressEvent) => {
        this.url = (<FileReader>events.target).result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.image = event.target.files[0];
    }
  }
}
