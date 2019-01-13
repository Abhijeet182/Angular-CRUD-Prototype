import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public isCheckLogin: boolean;
  public dataSource: any;
  constructor(public router: Router) { }

  ngOnInit() {
  }
  logout() {
    localStorage.removeItem('fname');
    localStorage.removeItem('lname');
    localStorage.removeItem('email');
    this.router.navigateByUrl('/login');
  }
  checkLogin() {
    this.dataSource = localStorage.getItem('fname');
    if (this.dataSource) {
      return this.isCheckLogin = true;
    } else {
      return this.isCheckLogin = false;
    }
  }
}
