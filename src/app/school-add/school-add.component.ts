import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ISchool,SchoolListComponent} from '../school-list/school-list.component';
import {FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {SchoolService} from '../school.service';


@Component({
  selector: 'app-school-add',
  templateUrl: './school-add.component.html',
  styleUrls: ['./school-add.component.css']
})
export class SchoolAddComponent implements OnInit {
  addSchlVald: FormGroup | any;

  constructor(private fb: FormBuilder,private service: SchoolService,
              public dialogRef: MatDialogRef<SchoolListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ISchool,) {
    dialogRef.disableClose = true;
  }

    ngOnInit(): void {
    
    /*Create a new form group with validators,
     mat-error are used to display any violations reactivly*/
     
    this.addSchlVald = this.fb.group({
      schoolName: new FormControl(this.data.schoolName, [Validators.required, Validators.maxLength(50)]),
      street: new FormControl(this.data.street, [Validators.required, Validators.maxLength(50)]),
      suburb: new FormControl(this.data.suburb, [Validators.required, Validators.maxLength(50)]),
      postcode: new FormControl(this.data.postcode, [Validators.required, Validators.pattern('^[0-9]+$'),Validators.min(11111),Validators.max(99999)]),
      state: new FormControl(this.data.state, [Validators.required, Validators.maxLength(50)]),
      noOfStudents: new FormControl(this.data.noOfStudents, [Validators.required,Validators.pattern('^[0-9]+$'),Validators.min(100),Validators.max(5000)]),
    });
  }

   /*Handle the data from the dialog pop up 
   when its closed without being filled*/
  onNoClick(): void {
    const {value, valid} = this.addSchlVald;
    this.dialogRef.close(value);
  }

  /*Handle the data from the dialog pop up after its submitted*/

  // tslint:disable-next-line:typedef
  save() {
    const {value, valid} = this.addSchlVald;
    if(valid){
      console.log(value);
      this.dialogRef.close(value);
    }else{
      this.service.openSnackBar('Please fill the form', 'Okay', 'warning');
    }
  }

}
