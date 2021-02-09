import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dialog-quiz',
  templateUrl: './dialog-quiz.component.html',
  styleUrls: ['./dialog-quiz.component.scss']
})
export class DialogQuizComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogQuizComponent>, private router: Router) { }

  ngOnInit() {
  }

  ReturnFunct() {
    this.dialogRef.close();
    this.router.navigate(['/navMenu/quiz/list']);
  }

}
