import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { DataServiceService } from '../data-service.service';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { $ } from 'protractor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  MyDataSource: any;
  searchKey: string;
  displayedColumns = ['sno', 'name', 'username', 'email', 'TimeStamp', 'view', 'Change', 'Delete'];

  @ViewChild(MatSort) sort: MatSort;
  router: any;
  NavigationExtras: any;
  record: string;

  constructor(private dataService: DataServiceService ,
     public _Router: Router,
  ) {
  }


  ngOnInit() {
    this.renderDataTable();
  }

  filter(searchstring: string) {
    searchstring = searchstring.trim();
    searchstring = searchstring.toLowerCase();
    this.MyDataSource.filter = searchstring;
   if (this.MyDataSource.filteredData.length === 0) {
    swal('Oops!', 'No record found !', 'error');
  this.norecord();
   } else {
    this.hasRecord();
   }
  }
  norecord() {
    this.record = 'No record found';
 }
hasRecord() {
  this.record = undefined;
}

  delete(post) {
   if (confirm('Are you want to delete!!')) {
    this.dataService.delete(post._id)
    .subscribe((data: any) => {
      console.log(data);
      swal('Feels Good!', 'You successfully deleted user!', 'success');
      this.renderDataTable();
    }, error => {
      console.log('error', error);
    });
  } else {
    return false;
  }
  }
  clear() {
   this.searchKey = undefined;
   this.renderDataTable();
   this.hasRecord();
  }

 renderDataTable() {
    this.dataService.getAllTodos()
      .subscribe((data: any) => {
        if (data.responseData.result) {
          this.MyDataSource = new MatTableDataSource();
           this.MyDataSource.data = data.responseData.result;
          this.MyDataSource.sort = this.sort;
          this.MyDataSource.paginator = this.paginator;
        }
      }, error => {
        swal('Oops!', 'No record found !', 'error');
      });
  }
}
