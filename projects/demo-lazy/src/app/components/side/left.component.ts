import { Component, OnInit } from '@angular/core';
import { EntryLazy } from 'ng-lazy-directive';

@EntryLazy({
  place: 'left',
})
@Component({
  selector: 'app-toolbar-left',
  template: `left content`,
})
export class AppToolbarLeftComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
