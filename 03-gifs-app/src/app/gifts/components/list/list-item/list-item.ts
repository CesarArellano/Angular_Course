import { Component, inject, input } from '@angular/core';
import { GifsService } from '../../../services/gifs.service';
import { SkeletonImageComponent } from '../../skeleton/skeleton-image/skeleton-image';

@Component({
	selector: 'gifs-list-item',
	templateUrl: './list-item.html',
	imports: [SkeletonImageComponent],
})
export class ListItemComponent {
	gifsService = inject(GifsService);
	url = input.required<string>();
}
