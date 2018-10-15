import { Subscription } from "rxjs";
import { OnDestroy } from '@angular/core';

export abstract class DestructableComponent implements OnDestroy {
    protected disposableSubscriptions: Subscription[] = [];
    public ngOnDestroy(): void {
        this.disposableSubscriptions.forEach(subs => subs.unsubscribe());
    }

}
