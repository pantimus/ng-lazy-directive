import {
  DestroyRef,
  inject,
  InjectionToken,
  isSignal,
  makeEnvironmentProviders,
  Provider,
  signal,
  Signal,
} from '@angular/core';
import { NgLazyService } from '../services/ng-lazy-directive.service';
import { EntryComponent } from '../models';

import { NG_LAZY_DIRECTIVE_ENTRY } from '../tokens';

export function provideNgLazyLoad(
  entry: () => Signal<EntryComponent[]>
): Provider[];
export function provideNgLazyLoad(entry: EntryComponent[]): Provider[];
//
export function provideNgLazyLoad(
  entry: (() => Signal<EntryComponent[]>) | EntryComponent[]
): Provider[] {
  return [
    {
      provide: NG_LAZY_DIRECTIVE_ENTRY,
      useFactory: () => {
        const destroyed = inject(DestroyRef);
        let signaled = null;
        destroyed.onDestroy(() => {
          if (!Array.isArray(entry)) {
            signaled = null;
          }
        });

        if (Array.isArray(entry)) {
          signaled = signal(entry);
          return signaled;
        }
        signaled = entry();
        return signaled;
      },
    },
    NgLazyService,
  ];
}
