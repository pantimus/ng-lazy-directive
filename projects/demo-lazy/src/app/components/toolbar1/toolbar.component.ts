import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EntryLazy } from 'ng-lazy-directive';

@EntryLazy({
  place: 'toolbar',
})
@Component({
  selector: 'app-toolbar-logo',
  template: `<button (click)="navigateTo()">
    Press me to open advanced right content
  </button>`,
})
export class AppToolbarLogoComponent {
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  private _activeAdvanced = false;

  navigateTo() {
    this._activeAdvanced = !this._activeAdvanced;
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: { mod: this._activeAdvanced ? 'advanced' : '' },
      queryParamsHandling: 'merge',
    });
  }
}
