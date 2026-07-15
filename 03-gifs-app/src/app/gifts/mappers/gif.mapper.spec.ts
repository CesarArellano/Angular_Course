import { GifMapper } from './gif.mapper';
import { GiphyItem } from '../interfaces/giphy.interfaces';

const buildGiphyItem = (overrides: Partial<GiphyItem> = {}): GiphyItem =>
	({
		id: '1',
		title: 'Funny cat',
		images: {
			original: { url: 'https://giphy.com/gifs/1/giphy.gif' },
		},
		...overrides,
	}) as GiphyItem;

describe('GifMapper', () => {
	it('should map a GiphyItem to a Gif', () => {
		const giphyItem = buildGiphyItem();

		const gif = GifMapper.fromGiphyResponseToGif(giphyItem);

		expect(gif).toEqual({
			id: '1',
			title: 'Funny cat',
			url: 'https://giphy.com/gifs/1/giphy.gif',
		});
	});

	it('should map a list of GiphyItems to a list of Gifs', () => {
		const giphyItems = [
			buildGiphyItem({ id: '1', title: 'First' }),
			buildGiphyItem({ id: '2', title: 'Second' }),
		];

		const gifs = GifMapper.mapGiphyItemsToGifArray(giphyItems);

		expect(gifs.length).toBe(2);
		expect(gifs[0].id).toBe('1');
		expect(gifs[1].id).toBe('2');
	});

	it('should return an empty array when given an empty list', () => {
		expect(GifMapper.mapGiphyItemsToGifArray([])).toEqual([]);
	});
});
