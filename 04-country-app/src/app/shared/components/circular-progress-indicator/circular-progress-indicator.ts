import { Component, computed, input } from '@angular/core';

export type CircularProgressIndicatorSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-circular-progress-indicator',
  imports: [],
  templateUrl: './circular-progress-indicator.html',
})
export class CircularProgressIndicatorComponent {
  size = input<CircularProgressIndicatorSize>('md');
  label = input('Loading');

  classes = computed(() => `loading loading-spinner loading-${this.size()}`);
}
