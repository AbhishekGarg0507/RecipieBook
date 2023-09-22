import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipiesComponent } from './recipies.component';

describe('RecipiesComponent', () => {
  let component: RecipiesComponent;
  let fixture: ComponentFixture<RecipiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipiesComponent]
    });
    fixture = TestBed.createComponent(RecipiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
