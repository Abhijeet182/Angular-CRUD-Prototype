import { Injectable } from '@angular/core';

@Injectable()

export class Apidata {
  static serverWithApiUrl: string;
    public server = 'http://localhost:4001/';
    public apiUrl = 'demo/api/v1/user/';
    public serverWithApiUrl = this.server + this.apiUrl;
}
