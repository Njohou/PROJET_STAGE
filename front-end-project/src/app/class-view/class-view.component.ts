import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {CuClassComponent} from '../crud/cu-class/cu-class.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ClassService} from '../services/classes/class.service';
import {GetClassesModel} from '../models/class/getclasses.models';
import * as $ from 'jquery';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-class-view',
  templateUrl: './class-view.component.html',
  styleUrls: ['./class-view.component.scss']
})
export class ClassViewComponent implements OnInit {

  // Allclasses: GetClassesModel[] = [];
  classChooseArray: GetClassesModel[] = [];
  classeSubscription: Subscription;
  id: string;
  isStaff: string;
  isSuperuser: string;
  hide = true;

  constructor(private dialog: MatDialog,
              public infoBull: MatSnackBar,
              public classesService: ClassService) { }
  ngOnInit() {
    this.GetAllClasses();
    this.id = localStorage.getItem('id');
    this.isStaff = localStorage.getItem('is_staff');
    this.isSuperuser = localStorage.getItem('is_superuser');

    if (this.isStaff === 'true' && this.isSuperuser === 'false') {
      this.hide = false;
      $(document).ready(() => {
        $('.create_boutton').hide();
        /*$('.Edit_boutton').hide();
        $('.Delete_boutton').hide();*/
      });
    }
  }

  /* Open the CRUD class */
  OpenCUMethod() {
    const dialog = this.dialog.open(CuClassComponent, {
      width: '30%',
      height: '60%',
      disableClose: true
    });
  }

  /* Get all classes and display them in this page */
  GetAllClasses() {
    // console.log('HELLO WORLD !!');
    // this.classeSubscription =  this.classesService.classeSubject
    this.classesService.GetAllClasses()
      .subscribe((data) => {
        // console.log(data);
        if (this.isSuperuser === 'true') {
          this.classChooseArray = data;
        } else {
          for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].teachers.length; j++) {
              if (this.id === data[i].teachers[j].id.toString() && this.isStaff === 'true') {
                this.classChooseArray.push(data[i]);
              }
            }
          }
        }
        // console.log(data);
        this.classesService.GetAllClassesArray();
        this.classesService.EmitClass();
      }, error => console.log(error));
  }

  EditClass(classe) {
    console.log(classe);
    const dialog = this.dialog.open(CuClassComponent, {
      width: '30%',
      height: '60%',
      disableClose: true,
      data: classe
    });
  }

  DeleteClass(id) {
    console.log(id);
    if (confirm('Are you sure to delete this course ?') === true) {
      this.classesService.DeleteClass(id)
        .subscribe(result => {
          this.classChooseArray = [];
          this.GetAllClasses();
          this.infoBull.open(result.toString(), 'Close', {
            duration: 4000
          });
          // console.log(result);
        }, error => console.log(error));
    }
  }
}
