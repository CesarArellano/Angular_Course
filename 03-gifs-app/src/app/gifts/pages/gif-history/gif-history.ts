import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifsService } from '../../services/gifs.service';
import { ListComponent } from '../../components/list/list';

@Component({
	selector: 'gifs-gif-history',
	imports: [ListComponent],
	templateUrl: './gif-history.html',
})
export default class GifHistoryComponet {
	// query = inject(ActivatedRoute).params.subscribe((params) => {
	// 	console.log(params['query']);
	// });
	query = toSignal(
		inject(ActivatedRoute).params.pipe(map((params) => params['query'])),
	);

	gifsService = inject(GifsService);

	gifsByKey = computed(() => {
		return this.gifsService.getHistoryGifs(this.query() || '');
	});
}
