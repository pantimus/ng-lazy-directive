import { EntryComponent } from 'ng-lazy-directive';

export const VIEW_ENTRY_COMPONENTS: EntryComponent[] = [
  () =>
    import('./components/toolbar1/toolbar.component').then(
      (m) => m.AppToolbarLogoComponent
    ),
  () =>
    import('./components/side/left.component').then(
      (m) => m.AppToolbarLeftComponent
    ),
  () =>
    import('./components/side/right.component').then(
      (m) => m.AppToolbarRightComponent
    ),
];

export const VIEW_ENTRY_COMPONENTS_BY_MODS: Record<string, EntryComponent[]> = {
  advanced: [
    () =>
      import('./components/side/advanced.component').then(
        (m) => m.AppToolbarAdvancedRightComponent
      ),
  ],
};
