import { Component, computed, inject } from '@angular/core';
import { ListComponent } from '../../components/list/list';
import { GifsService } from '../../services/gifs.service';

@Component({
	selector: 'app-trending-page',
	imports: [ListComponent],
	templateUrl: './trending-page.html',
})
export default class TrendingPageComponent {
	gifsService = inject(GifsService);
	gifs = computed(() => this.gifsService.trendingGifs());
}
