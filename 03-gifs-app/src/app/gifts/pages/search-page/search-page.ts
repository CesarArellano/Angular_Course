import { Component, inject } from '@angular/core';
import { ListComponent } from '../../components/list/list';
import { GifsService } from '../../services/gifs.service';

@Component({
	selector: 'app-search-page',
	imports: [ListComponent],
	templateUrl: './search-page.html',
})
export default class SearchPageComponent {
	searchQuery = '';

	gifService = inject(GifsService);

	onSearch(query: string) {
		this.gifService.searchGifs(query);
	}
}
