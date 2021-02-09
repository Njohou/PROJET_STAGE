import {Component, OnInit} from '@angular/core';
import {NoteService} from '../services/notes/note.service';
import {ChapterModel} from '../models/chapter/chapters.model';
import {ActivatedRoute} from '@angular/router';

// text to speech library
import Speech from 'speak-tts';
import {OtherServiceService} from "../services/other/other-service.service";
import {AudioModel} from "../models/other/audio.model";
import {MatSnackBar} from "@angular/material";
import * as $ from 'jquery';

@Component({
  selector: 'app-display-course',
  templateUrl: './display-course.component.html',
  styleUrls: ['./display-course.component.scss']
})
export class DisplayCourseComponent implements OnInit {
  result = '';
  username: string;
  myNote: ChapterModel = new ChapterModel('', '', 1);
  url: string;
  constructor(private noteService: NoteService,
              private otherService: OtherServiceService,
              private infoBull: MatSnackBar,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.GetSingleChapter();
    this.username = localStorage.getItem('username');
    $('.spinner').hide();
    // this.MakeAudio();
  }

  GetSingleChapter() {
    const id = this.route.snapshot.params.id;
    this.noteService.GetSingleNote(id)
      .subscribe(
        (data) => {this.myNote = data; console.log(this.myNote); }
      );
  }

  Play() {
    /* Hide Button and show spinner after click event */
    $('.hideButton').hide();
    $('.spinner').show();
    /* End */
    /* wait a second for change the text in HTML page */
    setTimeout(() => {
      /* Take a text loaded in the HTML page */
      const text = document.getElementById('TakeText').textContent;
      /* End */
      const AudioParams = new AudioModel(this.myNote.entitled, this.username, text);
      this.otherService.ListenAudio(AudioParams)
        .subscribe((data) => {
          this.url = data.url.toString();
          this.infoBull.open('The audio is ready !', 'Close', {
            duration: 3000
          });
          /* To hide a block where button and spinner are. */
          document.getElementById('row-btn').style.display = 'none';
          /* End */
          /* Play the sound media part. */
          const audioR = new Audio(this.url);
          audioR.play();
          /* End */
          /* Convert second to millisecond */
          const millisec = Math.round(data.taille) * 1000;
          /* End */
          setTimeout(() => {
            /* Display a block where button and spinner are, show the button and hide the spinner */
            document.getElementById('row-btn').style.display = 'block';
            $('.hideButton').show();
            $('.spinner').hide();
            /* End */
          }, millisec);
        }, error => {
          console.log(error);
          this.infoBull.open('ERROR : a media can\'t be listen in your device !', 'Close', {
            duration: 3000
          });
        });
    }, 1000);
    /* End */
  }

  Pause() {
    const audio = new Audio(this.url);
    audio.pause();
  }
}
