import { Component, inject, input } from '@angular/core';
import { GifsService } from '../../../services/gifs.service';
import { SkeletonComponent } from 'boneyard-js/angular';

@Component({
	selector: 'gifs-list-item',
	imports: [SkeletonComponent],
	templateUrl: './list-item.html',
})
export class ListItemComponent {
	gifsService = inject(GifsService);
	url = input.required<string>();
}
