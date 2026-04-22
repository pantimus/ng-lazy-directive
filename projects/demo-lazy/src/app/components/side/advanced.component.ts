import { Component, OnInit } from '@angular/core';
import { EntryLazy } from 'ng-lazy-directive';

@EntryLazy({
  place: 'right',
})
@Component({
  selector: 'app-toolbar-advanced-right',
  template: `advanced content`,
})
export class AppToolbarAdvancedRightComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
