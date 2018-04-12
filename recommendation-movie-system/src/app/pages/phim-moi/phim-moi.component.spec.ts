import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhimMoiComponent } from './phim-moi.component';

describe('PhimMoiComponent', () => {
  let component: PhimMoiComponent;
  let fixture: ComponentFixture<PhimMoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhimMoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhimMoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
