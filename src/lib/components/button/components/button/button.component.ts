import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { shareReplayWithRefCount } from '@murus-app/node-utilities';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

enum HoverState {
  Active,
  Inactive,
}

@Component({
  selector: 'mur-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit, OnDestroy {
  public readonly hoverState: typeof HoverState = HoverState;

  private readonly subscription: Subscription = new Subscription();

  private readonly currentHoverState$: BehaviorSubject<HoverState> = new BehaviorSubject<HoverState>(
    HoverState.Inactive
  );
  public readonly isHovered$: Observable<boolean> = this.currentHoverState$.pipe(
    distinctUntilChanged(),
    map((currentHoverState: HoverState) => currentHoverState === HoverState.Active),
    shareReplayWithRefCount()
  );

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.changeDetectorRef.detach();
    this.changeDetectorRef.detectChanges();

    this.subscription.add(this.detectChangesOnHoverStateUpdate());
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public setHoverState(newState: HoverState): void {
    this.currentHoverState$.next(newState);
  }

  private detectChangesOnHoverStateUpdate(): Subscription {
    return this.isHovered$.subscribe(() => this.changeDetectorRef.detectChanges());
  }
}
