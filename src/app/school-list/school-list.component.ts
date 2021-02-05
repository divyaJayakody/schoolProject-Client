import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { SchoolService } from '../school.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SchoolAddComponent } from '../school-add/school-add.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


export interface ISchool {
  schoolName: string;
  noOfStudents: number;
  street: string;
  suburb: string;
  postcode: number;
  state: string;
}

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css']
})

export class SchoolListComponent implements OnInit {

  fschoolName: '' | undefined;
  fnoOfStudents: 0 | undefined;
  fstreet: '' | undefined;
  fsuburb: '' | undefined;
  fpostcode: 0 | undefined;
  fstate: '' | undefined;


  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  displayedColumns = ['schoolName', 'address', 'noOfStudents'];
  dataSource: any;

  private schoolList: any;
  // tslint:disable-next-line:max-line-length
  private _list: any;
  private showSpinner = false;


  constructor(private router: Router, private cdr: ChangeDetectorRef, private _snackBar: MatSnackBar, private service: SchoolService, public dialog: MatDialog) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.schoolList = [];
    this.refreshTable();
    this.cdr.detectChanges();
  }

  /* This method is responsible for refreshing 
  the datatable after each POST request*/

  // tslint:disable-next-line:typedef
  refreshTable() {
    this.service.getAllSchools().subscribe(res => {
      console.log(res.document);
      this.RenderTable(res.document);
    });
  }
  
  /* This method is responsible for populating
   datatable with sort and paginator functions*/

  // tslint:disable-next-line:typedef
  RenderTable(list: any) {
    this._list = list;
    this.dataSource = new MatTableDataSource(this._list);
    this.dataSource.data = this._list;
    this.dataSource.sort = this.sort;
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.service.hideloader();
    this.cdr.detectChanges();
  }

  /* This method is responsible for applying
   filters to the datatable columns*/

  // tslint:disable-next-line:typedef
  applyFilter(filterValue: any) {
    // @ts-ignore
    console.log('applyFilter()');
    filterValue = filterValue.value.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  /* This method is responsible for handling dialog pop up
     that would also act as a reactive form to add new schools */
  addSchoolPopUp(): void {
    const dialogRef = this.dialog.open(SchoolAddComponent, {
      width: '350px',
      height: '500px',
      data: {
        schoolName: this.fschoolName,
        street: this.fstreet,
        suburb: this.fsuburb,
        postCode: this.fpostcode,
        state: this.fstate,
        noOfStudents: this.fnoOfStudents,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.service.hideloader();
      const formData = result;
      if (formData.schoolName !== null) {
        console.log('The dialog was closed', result);
        this.prepareRequest(formData);
      } else {
        this.service.hideloader();
      }
    });
  }


  /* This method is responsible for preparing the
   data extracted from dialog form to a json object 
   before sendng the object to the DB via school service*/

  // tslint:disable-next-line:typedef
  prepareRequest(formData: any) {
    this.showSpinner = true;
    const school = {
      schoolName: formData.schoolName,
      address: {
        street: formData.street,
        suburb: formData.suburb,
        postcode: formData.postcode,
        state: formData.state
      },
      noOfStudents: formData.noOfStudents
    };

    this.service.addSchool(school).subscribe(res => {
      console.log(res);
      console.log(res.success);
      console.log(res.message);
      if (res.success === true) {
        this.service.hideloader();
        this.service.openSnackBar('Added the school successfully', 'Great', 'success');
        this.refreshTable();
      } else {
        this.service.hideloader();
        this.service.openSnackBar('Adding school failed', 'Retry', 'error');
      }
    }, (err) => {
      console.log(err);
      this.service.hideloader();
      this.service.openSnackBar('Adding school failed', 'Retry', 'error');
    });
  }
}

