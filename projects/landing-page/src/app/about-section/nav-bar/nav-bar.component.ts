import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'nav-bar',
    templateUrl: 'nav-bar.component.html',
    styleUrls: ['nav-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class NavBarComponent {
  constructor() {
  }
}
