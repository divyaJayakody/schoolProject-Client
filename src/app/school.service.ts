// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';

// Models
import { environment } from '../environments/environment.prod';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

const API_ENDPOINT = 'schools';


@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private http: HttpClient,private _snackBar: MatSnackBar) {
  }

  /* This method is responsible for POST of 
  the json object to mongo db*/

  // tslint:disable-next-line:typedef
  addSchool(school: any) {
    console.log('school', school);
    return this.http.post<any>(environment.apiHost + API_ENDPOINT + '/add', school);
  }


   /* This method is responsible for GET of 
  all school entries from mongo db*/

  getAllSchools(): Observable<any> {
    console.log(environment.apiHost + API_ENDPOINT + '/list');
    return this.http.get<any>(environment.apiHost + API_ENDPOINT + '/list');
  }

   /* This is a custome method is responsible for creating
    instances of snack bar to dispaly notifications according
     to 3 statuses (error,success,warn) */

  openSnackBar(msg:any,action:any,status:string)
  {
    this._snackBar.open(msg, action, {
      duration: 1000,
      panelClass:[status],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  // tslint:disable-next-line:typedef
  hideloader() {

    /*Setting display of spinner
     element to none*/

    // @ts-ignore
    document.getElementById('loading')
      .style.display = 'none';
    // @ts-ignore
    document.getElementById('overlay').style.display = 'none';

  }

// tslint:disable-next-line:typedef
   showloader() {

    /*Setting display of spinner
     element to block / visible*/
     
    // @ts-ignore
    document.getElementById('loading')
      .style.display = 'block';
    // @ts-ignore
    document.getElementById('overlay').style.display = 'cover';
  }


}
