import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { GifMapper } from '../mappers/gif.mapper';
import { Gif } from '../interfaces/gif.interface';
import { map, Observable, tap } from 'rxjs';

const SEARCH_HISTORY_KEY = 'searchHistory';

const getSearchHistoryFromLocalStorage = () => {
	const searchHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
	return searchHistory ? JSON.parse(searchHistory) : {};
};

@Injectable({
	providedIn: 'root',
})
export class GifsService {
	private http = inject(HttpClient);

	trendingGifs = signal<Gif[]>([]);
	isLoadingGifs = signal<boolean>(false);

	trendingGifGroup = computed(() => {
		const groups: Gif[][] = [];
		for (let i = 0; i < this.trendingGifs().length; i += 3) {
			groups.push(this.trendingGifs().slice(i, i + 3));
		}
		return groups;
	});

	searchHistory = signal<Record<string, Gif[]>>(
		getSearchHistoryFromLocalStorage(),
	);

	constructor() {
		this.loadTrendingGifs();
	}

	loadTrendingGifs() {
		this.isLoadingGifs.set(true);
		this.http
			.get<GiphyResponse>(`${environment.giphyUrl}/trending`, {
				params: {
					api_key: environment.giphyApiKey,
					limit: 20,
				},
			})
			.subscribe((response) => {
				const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
				this.trendingGifs.set(gifs);
				this.isLoadingGifs.set(false);
			});
	}

	searchGifs(query: string): Observable<Gif[]> {
		this.isLoadingGifs.set(true);
		return this.http
			.get<GiphyResponse>(`${environment.giphyUrl}/search`, {
				params: {
					api_key: environment.giphyApiKey,
					q: query,
					limit: 20,
				},
			})
			.pipe(
				map(({ data }) => data),
				map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
				tap((items) => {
					this.searchHistory.update((history) => ({
						...history,
						[query]: items,
					}));
				}),
				tap(() => {
					this.isLoadingGifs.set(false);
				}),
			);
	}

	searchHistoryKeys() {
		return Object.keys(this.searchHistory());
	}

	getHistoryGifs(query: string) {
		return this.searchHistory()[query] ?? [];
	}

	saveGifsToLocalStorage = effect(() => {
		localStorage.setItem(
			SEARCH_HISTORY_KEY,
			JSON.stringify(this.searchHistory()),
		);
	});
}
