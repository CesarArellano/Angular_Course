import { TestBed } from '@angular/core/testing';
import { environment } from '@environments/environment';
import { SideMenuHeaderComponent } from './side-menu-header';

describe('SideMenuHeaderComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SideMenuHeaderComponent],
		}).compileComponents();
	});

	it('should create', () => {
		const fixture = TestBed.createComponent(SideMenuHeaderComponent);
		expect(fixture.componentInstance).toBeTruthy();
	});

	it('should render the company name and slogan from the environment', () => {
		const fixture = TestBed.createComponent(SideMenuHeaderComponent);
		fixture.detectChanges();

		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.textContent).toContain(environment.companyName);
		expect(compiled.textContent).toContain(environment.companySlogan);
	});
});
