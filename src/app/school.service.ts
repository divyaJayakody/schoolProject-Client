// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';

// Models
import { environment } from '../environments/environment.prod';

const API_ENDPOINT = 'schools';


@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient) {
  }

  /* CREATE =>  POST: send a new school to the server */

  // tslint:disable-next-line:typedef
  addSchool(school: any) {
    console.log('school', school);
    return this.http.post<any>(environment.apiHost + API_ENDPOINT + '/add', school);
  }

  /* RETRIEVE  =>  GET: get a list of schools */
  getAllSchools(): Observable<any> {
    console.log(environment.apiHost + API_ENDPOINT + '/list');
    return this.http.get<any>(environment.apiHost + API_ENDPOINT + '/list');
  }

}
