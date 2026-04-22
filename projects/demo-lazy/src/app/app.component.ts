import { Component, inject } from '@angular/core';
import {
  EntryComponent,
  PlaceDirective,
  provideNgLazyLoad,
} from 'ng-lazy-directive';
import {
  VIEW_ENTRY_COMPONENTS,
  VIEW_ENTRY_COMPONENTS_BY_MODS,
} from './app.entry';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

const strategyFromRoute = (entry: Record<string, EntryComponent[]>) => {
  return () => {
    const route = inject(ActivatedRoute);
    const resultEntry = route.queryParams.pipe(
      map((params) => params['mod']),
      map((mod) => [...(entry[mod] || []), ...VIEW_ENTRY_COMPONENTS])
    );
    return toSignal(resultEntry, {
      requireSync: true,
    });
  };
};

@Component({
  selector: 'app-root',
  imports: [PlaceDirective],
  providers: [
    provideNgLazyLoad(strategyFromRoute(VIEW_ENTRY_COMPONENTS_BY_MODS)),
  ],
  // providers: [provideNgLazyLoad(VIEW_ENTRY_COMPONENTS)],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
