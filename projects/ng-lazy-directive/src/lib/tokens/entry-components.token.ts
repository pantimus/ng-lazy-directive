import { InjectionToken } from '@angular/core';
import { EntryComponent } from '../models';

export const ENTRY_COMPONENTS = new InjectionToken<Promise<EntryComponent[]>>(
  'ENTRY_COMPONENTS'
);
