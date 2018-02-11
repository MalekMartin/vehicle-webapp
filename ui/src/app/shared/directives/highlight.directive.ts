import { Directive, ElementRef, HostListener, Input } from '@angular/core';
@Directive({
  selector: '[vaHighlight]'
})
export class HighlightDirective {

  @Input() defaultColor: string;
  @Input('vaHighlight') vaHighlight: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.vaHighlight || this.defaultColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  constructor(private el: ElementRef) { }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
