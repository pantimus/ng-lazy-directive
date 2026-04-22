import { Type } from '@angular/core';
import { LazyComponentOptions } from './lazy-component-options.model';
import { METADATA } from '../decorators';

type MetaDataComponent = {
  [key in typeof METADATA]?: LazyComponentOptions;
};
export type EntryComponent = EntryLoadComponent;
// export type EntryComponent = EntryLoadComponent | EntryLoadByKeyComponent;
export type EntryLoadComponent = () => Promise<
  Type<unknown> & MetaDataComponent
>;
// export type EntryLoadByKeyComponent = {
//   key: string;
//   load: () => Promise<unknown>;
// };
