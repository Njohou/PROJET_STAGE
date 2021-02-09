import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appMyDirectiveWithBackgroundImage]'
})
export class MyDirectiveWithBackgroundImageDirective implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // this.changeColor();
  }
  ngOnInit(): void {
  }

/*  changeColor() {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'red');
    this.renderer.addClass(this.el.nativeElement, 'my-class');
  }*/

}
