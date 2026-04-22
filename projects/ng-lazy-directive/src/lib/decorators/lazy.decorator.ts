import { LazyComponentOptions } from '../models';

export const METADATA = 'ɵmetadataLazyDirective';

export const EntryLazy = (options: LazyComponentOptions): any => {
  return function (ctor: any) {
    ctor[METADATA] = options;
    return ctor;
  };
};
