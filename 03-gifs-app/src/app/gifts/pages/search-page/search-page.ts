import { Component, inject, signal } from '@angular/core';
import { ListComponent } from '../../components/list/list';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
	selector: 'app-search-page',
	imports: [ListComponent],
	templateUrl: './search-page.html',
})
export default class SearchPageComponent {
	gifService = inject(GifsService);
	gifs = signal<Gif[]>([]);

	onSearch(query: string) {
		this.gifService.searchGifs(query).subscribe((gifs) => {
			this.gifs.set(gifs);
		});
	}
}
