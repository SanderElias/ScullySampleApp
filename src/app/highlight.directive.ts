import { AfterViewInit, Directive, ElementRef, Input, NgModule, OnDestroy } from '@angular/core';
import { debounceTime, merge, ReplaySubject, Subject, switchMap, tap } from 'rxjs';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[highlight]'
})
export class HighlightDirective implements AfterViewInit, OnDestroy {
  hlText$ = new ReplaySubject<string>()
  update$ = new Subject<void>()
  @Input() set highlight(x: string) {
    this.hlText$.next(x)
  };

  sub = merge(this.hlText$, this.update$).pipe(    
    debounceTime(100),
    switchMap(() => this.hlText$),
    tap((t) => this.updateView(t))
  ).subscribe();

  constructor(private elmRef: ElementRef) { }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  ngAfterViewInit() {
    this.update$.next()
  }

  updateView(text:string) {
    const elm = this.elmRef.nativeElement as HTMLElement
    if (elm && elm.textContent) {
      if (text) {
        // TODO: make highlighting case insensitive.
        const newHtml = elm.textContent.split(text).join(`<mark class="highlight">${text}</mark>`)
        if (newHtml) {
          elm.innerHTML = newHtml
        }
        return
      }
      /** reset the html to remove old stuff */
      elm.innerHTML = elm.textContent;
    }
  }

}

@NgModule({
  declarations: [HighlightDirective],
  imports: [],
  exports: [HighlightDirective]
})
export class HighlightDirectiveModule {
}
