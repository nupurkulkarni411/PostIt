import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FacebookService {

  constructor(private http: Http) { }

  getFacebooktoken(){
    var headers = new Headers();
    return this.http.get('http://localhost:8080/users/auth/facebook/callback',{headers:headers})
      .map(res => res.json());
  }

}
