import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  url = environment.serverUrl;
  constructor(private http: HttpClient) { }

  getData(endPoint){
    return this.http.get(this.url + endPoint).toPromise();
  }
}
