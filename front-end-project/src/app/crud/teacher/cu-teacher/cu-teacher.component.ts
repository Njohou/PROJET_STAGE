import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TeacherModel } from '../../../models/teacher/teacher.model';
import {TeachersService} from '../../../services/teacher/teachers.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {OtherServiceService} from '../../../services/other/other-service.service';
import {MatTableDataSource} from "@angular/material/table";
import {Subject, Subscription} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-cu-teacher',
  templateUrl: './cu-teacher.component.html',
  styleUrls: ['./cu-teacher.component.scss']
})
export class CuTeacherComponent implements OnInit {

  registerForm: FormGroup;
  hide = true;
  idAdmin: number;

  TEACHER_DATA: MatTableDataSource<any>;
  teacherSubscription: Subscription;
  teacherArray: TeacherModel[] = [];
  teacherSubject = new Subject<TeacherModel[]>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private formBuiler: FormBuilder,
              private teacherService: TeachersService,
              private otherService: OtherServiceService,
              private router: Router,
              public infoBull: MatSnackBar,
              public dialogRef: MatDialogRef<CuTeacherComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.idAdmin = parseInt(localStorage.getItem('id'));
    // console.log(this.idAdmin + ' , ' + typeof (this.idAdmin));
    this.RegisterForm();
    if (this.data) {
      this.registerForm.setValue({
        username: this.data.username,
        first_name: this.data.first_name,
        last_name: this.data.last_name,
        tel: this.data.tel,
        email: this.data.email,
        gender: this.data.gender,
        is_active: this.data.is_active,
        is_staff: this.data.is_staff,
        is_superuser: this.data.is_superuser
      });
    } else {
      return;
    }
    // console.log(this.data.id + ' ' + this.data.password);
  }

  RegisterForm() {
    this.registerForm = this.formBuiler.group({
      username : ['', Validators.required],
      first_name : ['', Validators.required],
      last_name : ['', Validators.required],
      tel : ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{9}$')]],
      email : ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      is_active : [ 'true', Validators.required],
      is_staff: [ 'true', Validators.required],
      is_superuser: ['false', Validators.required]
    });
  }

  OnSubmitForm() {
    /* Function which convert a string value to boolean */
    function convert(value) {
      if (value === "true" || value === 'true') {
        return true;
      } else {
        return false;
      }
    }
    /** Function that generates a 10-character password **/
    function makePassword() {
      var text = '';
      var lettre = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@/#&$|+?!';

      for( var i = 0; i < 10; i++)
        text += lettre.charAt(Math.floor(Math.random() * lettre.length));

      return text;
    }
    const password = makePassword();
    // console.log(typeof(this.registerForm.get('is_staff').value, convert(this.registerForm.get('is_staff').value)));

    if (this.registerForm.invalid) { return; }
    /* Retrieve values from the form */
    const teacher = new TeacherModel( this.registerForm.get('username').value,
                                      this.registerForm.get('first_name').value,
                                      this.registerForm.get('last_name').value,
                                      password,
                                      this.registerForm.get('tel').value,
                                      this.registerForm.get('email').value,
                                      this.registerForm.get('gender').value,
                                      convert(this.registerForm.get('is_active').value),
                                      convert(this.registerForm.get('is_staff').value),
                                      convert(this.registerForm.get('is_superuser').value),
                                      this.idAdmin
                                    );

    // console.log(this.registerForm.get('first_name').value + ' ; ' + this.registerForm.get('last_name').value);
    this.teacherService.CreateTeacher(teacher)
      .subscribe((data: TeacherModel) => {
          this.teacherService.teacherArray.push(data);
          // console.log(data);
          this.infoBull.open(data.first_name + ' ' + data.last_name + ' has been created !', 'Close', {
            duration: 3000
          });
          this.ReturnButton();
          this.teacherService.EmitTeacher();
        },
        (error) => {
          if (error.error.username) {
            console.log(error.error.username[0]);
            this.infoBull.open('ERROR : ' + error.error.username[0], 'Close', {
              duration: 3000
            });
          }
          console.log(error);
        });
  }

  /* Update function */
  UpdateForm() {

    if(this.registerForm.invalid) {return; }
    const teacherUpdated = new TeacherModel( this.registerForm.get('username').value,
                                      this.registerForm.get('first_name').value,
                                      this.registerForm.get('last_name').value,
                                      this.data.password,
                                      this.registerForm.get('tel').value,
                                      this.registerForm.get('email').value,
                                      this.registerForm.get('gender').value,
                                      this.registerForm.get('is_active').value,
                                      this.registerForm.get('is_staff').value,
                                      this.registerForm.get('is_superuser').value,
                                      this.idAdmin
    );
    // console.log("Oui, c'est bon " + typeof(this.registerForm.get('is_active').value));
    this.teacherService.UpdateTeacher(teacherUpdated, this.data.id)
      .subscribe((data) => {
        this.infoBull.open(data.first_name + ' ' + data.last_name + ' has been updated !', 'Close', {
          duration: 3000
        });
        console.log(data);
        },
        (error) => {
          if (error.error.username) {
            console.log(error.error.username[0]);
            this.infoBull.open('ERROR : ' + error.error.username[0], 'Close', {
              duration: 3000
            });
          }
          console.log(error);
        });
    this.teacherService.EmitTeacher();
  }

  /* Function that close the CU teacher page */
  ReturnButton() {
    this.dialogRef.close();
  }

}
