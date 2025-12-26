import { Directive } from '@angular/core';

@Directive({
  selector: '[appViewPannel]',
  host: {
    class: 'gridPannel ',
  },
})
export class ViewPannel {
  constructor() {}
}
