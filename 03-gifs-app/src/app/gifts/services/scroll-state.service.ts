import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ScrollStateService {
	pageScrollState: Record<string, WritableSignal<number>> = {
		trending: signal(0),
	};
}
