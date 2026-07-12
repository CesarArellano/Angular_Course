import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';

@Injectable({
	providedIn: 'root',
})
export class GifsService {
	private http = inject(HttpClient);

	constructor() {
		this.loadTrendingGifs();
	}

	loadTrendingGifs() {
		this.http.get<GiphyResponse>(`${environment.giphyUrl}/trending`, {
			params: {
				api_key: environment.giphyApiKey,
				limit: 20,
			},
		});
	}
}
