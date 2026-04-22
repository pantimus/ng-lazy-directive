import {
  computed,
  effect,
  inject,
  Injectable,
  signal,
  Type,
} from '@angular/core';
import { LazyComponentOptions } from '../models';
import { NG_LAZY_DIRECTIVE_ENTRY } from '../tokens';

@Injectable()
export class NgLazyService {
  private _entries = inject(NG_LAZY_DIRECTIVE_ENTRY);
  private _isLoadingEntry = signal(true);
  public isLoadingEntry = this._isLoadingEntry.asReadonly();

  #entriesByPlace = signal<Record<string, Type<unknown>[]>>({});

  public getComponents(place: LazyComponentOptions['place']) {
    return computed(() => this.#entriesByPlace()[place] ?? []);
  }

  public readonly loadComponents = effect(() => {
    const entries = this._entries();
    this._isLoadingEntry.set(true);
    Promise.all(entries.map((entry) => entry())).then((components) => {
      this.#entriesByPlace.set(
        components.reduce<Record<string, Type<unknown>[]>>(
          (acc, component) => ({
            ...acc,
            ...(component.ɵmetadataLazyDirective && {
              [component.ɵmetadataLazyDirective.place]: (
                acc[component.ɵmetadataLazyDirective.place] ?? []
              ).concat(component),
            }),
          }),
          {}
        )
      );
      this._isLoadingEntry.set(true);
    });
  });
}
