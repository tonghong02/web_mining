import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhimBoComponent } from './phim-bo.component';

describe('PhimBoComponent', () => {
  let component: PhimBoComponent;
  let fixture: ComponentFixture<PhimBoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhimBoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhimBoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
