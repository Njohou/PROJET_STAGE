import { Component, OnInit } from '@angular/core';
import {NoteService} from '../services/notes/note.service';
import {ChapterModel} from '../models/chapter/chapters.model';
import {CoursesService} from "../services/courses/courses.service";
import {GetcourseModel} from "../models/course/getcourses.model";
import {StudentsService} from "../services/student/students.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  chapters: ChapterModel[] = [];
  Course_list: GetcourseModel[] = [];
  id: string;
  isSuperuser: string;
  isStaff: string;
  username: string;

  constructor(private noteService: NoteService,
              private courseService: CoursesService,
              private snackBar: MatSnackBar,
              private studentService: StudentsService) { }

  ngOnInit() {
    this.id = localStorage.getItem('id');
    this.isStaff = localStorage.getItem('is_staff');
    this.isSuperuser = localStorage.getItem('is_superuser');
    this.username = localStorage.getItem('username');
    this.GetAllCourses();
  }
  GetAllCourses() {
    /* if the user is a teacher, display his own courses */
    if (this.isStaff === 'true' && this.isSuperuser === 'false') {
      this.courseService.GetAllCourses()
        .subscribe((data) => {
          for (var i = 0; i < data.length; i++) {
            if (data[i].course_teacher.id.toString() === this.id) {
              this.Course_list.push(data[i]);
            }
          }
        }, error => console.log(error));
      // console.log(this.Course_list);
      /* if the user is a admin, display all courses */
    } else if (this.isSuperuser === 'true') {
      this.courseService.GetAllCourses()
        .subscribe((data) => {
          // console.log(data);
          this.Course_list = data;
        }, error => console.log(error));
      /* if the user is a student, display his own courses */
    } else if (this.isSuperuser === 'false' || this.isStaff === 'false') {
      this.studentService.GetAllStudent()
        .subscribe((data) => {
          for (var i = 0; i < data.length; i++) {
            if (data[i].id.toString() === this.id) {
              for (var j = 0; j < data[i].student_class.all_courses.length; j++) {
                this.Course_list.push(data[i].student_class.all_courses[j]);
              }
            }
          }
        }, error => console.log(error));
      // console.log(this.Course_list);
    }
  }

  OnUpdate(chapter) {

  }

  OnDelete(id) {
    // console.log(id);
    if (confirm('Are you sure to delete this quiz ?') === true) {
      this.noteService.DeleteNote(id)
        .subscribe((data) => {
          this.Course_list = [];
          this.GetAllCourses();
          this.snackBar.open(data.toString(), 'Close', {
            duration: 3000
          });
        });
    }
  }

}
