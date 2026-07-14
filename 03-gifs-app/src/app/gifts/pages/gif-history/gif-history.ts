import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
	selector: 'gifs-gif-history',
	imports: [],
	templateUrl: './gif-history.html',
})
export default class GifHistoryComponet {
	// query = inject(ActivatedRoute).params.subscribe((params) => {
	// 	console.log(params['query']);
	// });
	query = toSignal(
		inject(ActivatedRoute).params.pipe(map((params) => params['query'])),
	);
}
