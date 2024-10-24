import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText = '';
  @Input() placement = 'top';
  tooltipElement!: HTMLElement;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltipElement) {
      this.showTooltip();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltipElement) {
      this.hideTooltip();
    }
  }

  showTooltip() {
    let tooltipClassName = 'tooltip';

    this.tooltipElement = this.renderer.createElement('span');
    this.renderer.addClass(this.tooltipElement, 'tooltip');
    if (this.placement === 'top') {
      this.renderer.addClass(this.tooltipElement, 'position-top');
    } else if (this.placement === 'right') {
      this.renderer.addClass(this.tooltipElement, 'position-right');
    } else if (this.placement === 'table') {
      this.renderer.addClass(this.tooltipElement, 'position-in-table');
    }

    const text = this.renderer.createText(this.tooltipText);

    this.renderer.appendChild(this.tooltipElement, text);
    this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);
  }

  hideTooltip() {
    this.renderer.removeChild(this.el.nativeElement, this.tooltipElement);
    this.tooltipElement = null!;
  }
}
