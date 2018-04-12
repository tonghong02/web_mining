import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhimLeComponent } from './phim-le.component';

describe('PhimLeComponent', () => {
  let component: PhimLeComponent;
  let fixture: ComponentFixture<PhimLeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhimLeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhimLeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
