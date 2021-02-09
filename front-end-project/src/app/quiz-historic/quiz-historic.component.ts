import {Component, OnInit, ViewChild} from '@angular/core';
import {QuizService} from "../services/quizz/quiz.service";
import {MatTableDataSource} from "@angular/material";
import {MatPaginator} from "@angular/material/paginator";
import {QuizTaker} from "../models/quiz_folder/quizTaker";

@Component({
  selector: 'app-quiz-historic',
  templateUrl: './quiz-historic.component.html',
  styleUrls: ['./quiz-historic.component.scss']
})
export class QuizHistoricComponent implements OnInit {

  id: number;
  quiztakerColumns: string[] = ['quiz_entitle', 'course', 'begin_time', 'end_time', 'score'];
  QUIZ_TAKER_DATA: MatTableDataSource<any>;
  QuizTakerArray: QuizTaker[] = [];
  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.id = parseInt(localStorage.getItem('id'));
    this.GetAllQuizTaker();
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  /* Filter the information in DataTable */
  applyFilter(filterValue: string) {
    this.QUIZ_TAKER_DATA.filter = filterValue.trim().toLowerCase();
  }

  GetAllQuizTaker() {
    this.quizService.GetAllQuizTaker()
      .subscribe((data) => {
        this.QuizTakerArray = data.filter(quizTaker => quizTaker.associated_student === this.id);
        this.QUIZ_TAKER_DATA = new MatTableDataSource(this.QuizTakerArray);
        this.QUIZ_TAKER_DATA.paginator = this.paginator;
        // console.log(this.QuizTakerArray);
      });
  }

}
