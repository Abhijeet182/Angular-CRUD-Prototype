import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apidata } from './app.constant';

@Injectable()
export class DataServiceService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private actionUrl: string;
  router: any;
  constructor(private _HttpClient: HttpClient, private _apidata: Apidata) {
    this.actionUrl = _apidata.serverWithApiUrl;
  }

   public getAllTodos() {
    return this._HttpClient.get(this.actionUrl + 'userList');
  }

  public getDetails(_id: string) {
    return this._HttpClient.get(this.actionUrl + 'detail', {
      params : new HttpParams()
      .set('id', _id)
    });
  }
  getImage(_id: string) {
    return this._HttpClient.get(this.actionUrl + 'detail', {  params : new HttpParams()
    .set('id', _id) });
  }
  public delete(_id: string) {
    return this._HttpClient.delete(this.actionUrl + 'deleted', {
      params : new HttpParams()
      .set('id', _id)
    });
  }

  public register(data: any, options: string) {
    return this._HttpClient.post(this.actionUrl + 'register', data);
  }

  public updateuser(data: any, options: string , param: string) {
    return this._HttpClient.put(this.actionUrl + 'updateuser', data, {
      params : new HttpParams()
      .set('id', param)
    });
  }
   handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}
