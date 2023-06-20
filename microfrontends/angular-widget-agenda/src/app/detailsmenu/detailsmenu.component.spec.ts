import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsmenuComponent } from './detailsmenu.component';

describe('DetailsmenuComponent', () => {
  let component: DetailsmenuComponent;
  let fixture: ComponentFixture<DetailsmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsmenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
