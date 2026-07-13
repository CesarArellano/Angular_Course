import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { GifMapper } from '../mappers/gif.mapper';
import { Gif } from '../interfaces/gif.interface';

@Injectable({
	providedIn: 'root',
})
export class GifsService {
	private http = inject(HttpClient);

	trendingGifs = signal<Gif[]>([]);
	trendingGifsLoading = signal<boolean>(false);

	constructor() {
		this.loadTrendingGifs();
	}

	loadTrendingGifs() {
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
				this.trendingGifsLoading.set(false);
			});
	}

	searchGifs(query: string) {
		this.http
			.get<GiphyResponse>(`${environment.giphyUrl}/search`, {
				params: {
					api_key: environment.giphyApiKey,
					q: query,
					limit: 20,
				},
			})
			.subscribe((response) => {
				const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
				console.log({ gifs });
			});
	}
}
