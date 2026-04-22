import { Component, OnInit } from '@angular/core';
import { EntryLazy } from 'ng-lazy-directive';

@EntryLazy({
  place: 'right',
})
@Component({
  selector: 'app-toolbar-right',
  template: `right content`,
})
export class AppToolbarRightComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
