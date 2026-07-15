import {
	AfterViewInit,
	Component,
	computed,
	ElementRef,
	inject,
	viewChild,
} from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { ScrollStateService } from '../../services/scroll-state.service';

@Component({
	selector: 'app-trending-page',
	// imports: [ListComponent],
	templateUrl: './trending-page.html',
})
export default class TrendingPageComponent implements AfterViewInit {
	gifsService = inject(GifsService);
	scrollStateService = inject(ScrollStateService);

	gifs = computed(() => this.gifsService.trendingGifs());
	scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

	ngAfterViewInit(): void {
		const scrollDiv = this.scrollDivRef()?.nativeElement;
		if (!scrollDiv) return;
		scrollDiv.scrollTop = this.scrollStateService.pageScrollState['trending']();
	}

	onScroll(event: Event) {
		const scrollDiv = this.scrollDivRef()?.nativeElement;
		if (!scrollDiv) return;
		const scrollTop = scrollDiv.scrollTop;
		const scrollHeight = scrollDiv.scrollHeight;
		const clientHeight = scrollDiv.clientHeight;

		const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
		this.scrollStateService.pageScrollState['trending'].set(scrollTop);
		if (isAtBottom) {
			this.gifsService.loadTrendingGifs();
		}
	}
}
