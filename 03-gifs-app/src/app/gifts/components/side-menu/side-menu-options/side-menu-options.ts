import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifsService } from '../../../services/gifs.service';

interface MenuOption {
	icon: string;
	label: string;
	subLabel: string;
	route: string;
}

@Component({
	selector: 'gifs-side-menu-options',
	imports: [RouterLinkActive, RouterLink],
	templateUrl: './side-menu-options.html',
})
export class SideMenuOptionsComponent {
	menuOptions: MenuOption[] = [
		{
			icon: 'fa-solid fa-chart-line',
			label: 'Trending',
			subLabel: 'Popular Gifs',
			route: '/dashboard/trending',
		},
		{
			icon: 'fa-solid fa-magnifying-glass',
			label: 'Search',
			subLabel: 'Search Gifs',
			route: '/dashboard/search',
		},
	];

	gifsService = inject(GifsService);
}
