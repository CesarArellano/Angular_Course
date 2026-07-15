import { TestBed } from '@angular/core/testing';
import { ScrollStateService } from './scroll-state.service';

describe('ScrollStateService', () => {
	let service: ScrollStateService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ScrollStateService);
	});

	it('should start the trending scroll position at 0', () => {
		expect(service.pageScrollState['trending']()).toBe(0);
	});

	it('should update the trending scroll position', () => {
		service.pageScrollState['trending'].set(250);

		expect(service.pageScrollState['trending']()).toBe(250);
	});
});
