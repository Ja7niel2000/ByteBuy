import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortcategoriesComponent } from './sortcategories.component';

describe('SortcategoriesComponent', () => {
  let component: SortcategoriesComponent;
  let fixture: ComponentFixture<SortcategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortcategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
