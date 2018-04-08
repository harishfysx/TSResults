import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appStyleResult]'
})
export class StyleResultDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) { }
  ngOnInit() {
      this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
     this.renderer.setAttribute(this.el.nativeElement, 'color', 'success');
    this.renderer.setProperty(this.el.nativeElement, 'color', 'success');
    // this.el.nativeElement.setValue('test');
  }

}
