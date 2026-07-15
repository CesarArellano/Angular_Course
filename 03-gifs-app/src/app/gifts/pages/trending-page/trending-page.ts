import {
	Component,
	computed,
	ElementRef,
	inject,
	viewChild,
} from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
	selector: 'app-trending-page',
	// imports: [ListComponent],
	templateUrl: './trending-page.html',
})
export default class TrendingPageComponent {
	scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

	gifsService = inject(GifsService);
	gifs = computed(() => this.gifsService.trendingGifs());

	onScroll(event: Event) {
		const scrollDiv = this.scrollDivRef()?.nativeElement;
		if (!scrollDiv) return;
		const scrollTop = scrollDiv.scrollTop;
		const scrollHeight = scrollDiv.scrollHeight;
		const clientHeight = scrollDiv.clientHeight;

		const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
		console.log({ isAtBottom });
	}
}
