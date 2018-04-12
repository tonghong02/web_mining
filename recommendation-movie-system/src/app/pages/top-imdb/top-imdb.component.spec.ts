import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopImdbComponent } from './top-imdb.component';

describe('TopImdbComponent', () => {
  let component: TopImdbComponent;
  let fixture: ComponentFixture<TopImdbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopImdbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopImdbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
