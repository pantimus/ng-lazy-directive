import { InjectionToken, Signal } from '@angular/core';
import { EntryComponent } from '../models';

export const NG_LAZY_DIRECTIVE_ENTRY = new InjectionToken<
  Signal<EntryComponent[]>
>('NG_LAZY_DIRECTIVE_ENTRY');
