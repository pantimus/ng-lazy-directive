import {
  AfterViewInit,
  ComponentRef,
  Directive,
  effect,
  EmbeddedViewRef,
  inject,
  input,
  signal,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { NgLazyComponentOptions } from '../models';
import { NgLazyService } from '../services/ng-lazy-directive.service';

@Directive({
  selector: '[ngPlace]',
  providers: [],
  hostDirectives: [],
})
export class PlaceDirective implements AfterViewInit {
  private _viewContainerRef = inject(ViewContainerRef);
  private _templateRef = inject(TemplateRef, { optional: true });
  private _lazyService = inject(NgLazyService);

  public readonly ngPlace = input.required<NgLazyComponentOptions['place']>();
  public readonly ngPlaceRef = input<ViewContainerRef>();
  public readonly standalone = input(false);
  public readonly skeleton = input<TemplateRef<any> | null>(null);
  public readonly isVisible = input(true);

  private readonly _isLoadingComponent = signal(true);

  private _cache = new Map<any, ComponentRef<unknown>>();
  private _skeletonEmbeddedViewRef: EmbeddedViewRef<any> | null = null;
  private _defaultEmbeddedViewRef!: EmbeddedViewRef<any> | null;

  ngAfterViewInit(): void {
    if (this._templateRef) {
      this._defaultEmbeddedViewRef = this._viewContainerRef.createEmbeddedView(
        this._templateRef
      );
    }
  }

  readonly loadComponents = effect(() => {
    const viewContainerRef = this._viewContainerRef;

    const components = this._lazyService.getComponents(this.ngPlace())() ?? [];
    // const components: any[] = [];
    if (components.length > 0) this._defaultEmbeddedViewRef?.destroy();
    const cachedComponents = Array.from(this._cache.keys());

    if (this.standalone()) {
      const component = components.at(-1);

      cachedComponents.forEach((cachedComponent) => {
        if (cachedComponent !== component) {
          this._cache.get(cachedComponent)?.destroy();
        }
      });
      let componentRef: ComponentRef<unknown> | null = null;

      if (component && !this._cache.has(component)) {
        componentRef = viewContainerRef.createComponent(component);
        componentRef.onDestroy(() => this._cache.delete(component));
        this._cache.set(component, componentRef);
      }

      return [componentRef];
    }

    cachedComponents.forEach((cachedComponent) => {
      if (!components.some((component: any) => component === cachedComponent)) {
        this._cache.get(cachedComponent)?.destroy();
      }
    });

    const componentRefs = components.map((component) => {
      if (this._cache.has(component)) {
        return this._cache.has(component);
      }

      const componentRef = viewContainerRef.createComponent(component);
      componentRef.onDestroy(() => this._cache.delete(component));
      this._cache.set(component, componentRef);

      return componentRef;
    });

    return componentRefs;
  });

  public skeletonCreate = effect(() => {
    if (!this._isLoadingComponent()) {
      this._skeletonEmbeddedViewRef?.destroy();
      this._skeletonEmbeddedViewRef = null;

      return;
    }
    const skeletonRef = this.skeleton();
    if (skeletonRef && !this._skeletonEmbeddedViewRef) {
      this._skeletonEmbeddedViewRef =
        this._viewContainerRef.createEmbeddedView(skeletonRef);
    }
  });
}
