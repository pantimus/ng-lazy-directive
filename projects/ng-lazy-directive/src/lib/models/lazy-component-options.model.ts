export interface NgLazyComponentOptions {
  place: string;
  permission?: string;
}

export type LazyComponentOptions = NgLazyComponentOptions & {
  currentPlace?: LazyComponentOptions['place'];
};
