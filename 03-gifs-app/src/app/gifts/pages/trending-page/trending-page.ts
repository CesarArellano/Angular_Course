import { Component, computed, inject } from '@angular/core';
import { ListComponent } from '../../components/list/list';
import { GifsService } from '../../services/gifs.service';
import { SkeletonComponent } from 'boneyard-js/angular';

@Component({
	selector: 'app-trending-page',
	imports: [ListComponent, SkeletonComponent],
	templateUrl: './trending-page.html',
})
export default class TrendingPageComponent {
	gifsService = inject(GifsService);
	gifs = computed(() => this.gifsService.trendingGifs());
}
