import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
	HttpTestingController,
	provideHttpClientTesting,
} from '@angular/common/http/testing';
import { environment } from '@environments/environment';
import { GifsService } from './gifs.service';
import { GiphyItem, GiphyResponse } from '../interfaces/giphy.interfaces';

const buildGiphyResponse = (items: Partial<GiphyItem>[]): GiphyResponse =>
	({
		data: items.map(
			(item, index) =>
				({
					id: `${index}`,
					title: `Gif ${index}`,
					images: { original: { url: `https://giphy.com/${index}.gif` } },
					...item,
				}) as GiphyItem,
		),
		meta: { status: 200, msg: 'OK', response_id: 'abc' },
		pagination: { total_count: items.length, count: items.length, offset: 0 },
	}) as GiphyResponse;

describe('GifsService', () => {
	let service: GifsService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		localStorage.clear();

		TestBed.configureTestingModule({
			providers: [provideHttpClient(), provideHttpClientTesting()],
		});

		service = TestBed.inject(GifsService);
		httpMock = TestBed.inject(HttpTestingController);

		// the constructor eagerly calls loadTrendingGifs(), resolve it so each
		// test starts from a clean, settled state
		httpMock
			.expectOne((req) => req.url === `${environment.giphyUrl}/trending`)
			.flush(buildGiphyResponse([{ id: '1', title: 'First' }]));
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should load trending gifs on creation', () => {
		expect(service.trendingGifs().length).toBe(1);
		expect(service.trendingGifs()[0].id).toBe('1');
		expect(service.isLoadingGifs()).toBe(false);
	});

	it('should request the next trending page with an incremented offset', () => {
		service.loadTrendingGifs();

		const req = httpMock.expectOne(
			(r) => r.url === `${environment.giphyUrl}/trending`,
		);
		expect(req.request.params.get('offset')).toBe('20');

		req.flush(buildGiphyResponse([{ id: '2', title: 'Second' }]));

		expect(service.trendingGifs().length).toBe(2);
		expect(service.trendingGifs()[1].id).toBe('2');
	});

	it('should not fire a new trending request while one is already in flight', () => {
		service.loadTrendingGifs();
		service.loadTrendingGifs();

		const req = httpMock.expectOne(
			(r) => r.url === `${environment.giphyUrl}/trending`,
		);
		req.flush(buildGiphyResponse([]));
	});

	it('should search gifs by query', () => {
		let result: unknown;
		service.searchGifs('cats').subscribe((gifs) => (result = gifs));

		const req = httpMock.expectOne(
			(r) => r.url === `${environment.giphyUrl}/search`,
		);
		expect(req.request.params.get('q')).toBe('cats');

		req.flush(buildGiphyResponse([{ id: '10', title: 'Cat' }]));

		expect(result).toEqual([
			{ id: '10', title: 'Cat', url: 'https://giphy.com/0.gif' },
		]);
		expect(service.isLoadingGifs()).toBe(false);
	});

	it('should keep searched gifs available through the history helpers', () => {
		service.searchGifs('dogs').subscribe();

		httpMock
			.expectOne((r) => r.url === `${environment.giphyUrl}/search`)
			.flush(buildGiphyResponse([{ id: '20', title: 'Dog' }]));

		expect(service.searchHistoryKeys()).toContain('dogs');
		expect(service.getHistoryGifs('dogs')[0].id).toBe('20');
	});

	it('should return an empty array for a query with no history', () => {
		expect(service.getHistoryGifs('unknown-query')).toEqual([]);
	});

	it('should persist the search history to localStorage', async () => {
		service.searchGifs('birds').subscribe();

		httpMock
			.expectOne((r) => r.url === `${environment.giphyUrl}/search`)
			.flush(buildGiphyResponse([{ id: '30', title: 'Bird' }]));

		await vi.waitFor(() => {
			expect(localStorage.getItem('searchHistory')).toContain('birds');
		});
	});
});
