import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { DataServiceService } from '../data-service.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent implements OnInit {
  api: any[] = null;
  public updateForm: FormGroup;
  public controlsdata: any;
  public dataSource: any;
  public user: any;
  public userId: any;
  public dataProperty = '';
  public dataImage: String = '';

  constructor(
    public DataService: DataServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params.id;
    });
    this.DataService.getDetails(this.userId)
      .subscribe((data: any) => {
        this.dataProperty = data.responseData.result;
        this.dataImage = data.responseData.result.image;
      });
  }
}

