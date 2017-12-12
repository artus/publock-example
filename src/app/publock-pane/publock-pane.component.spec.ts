import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublockPaneComponent } from './publock-pane.component';

describe('PublockPaneComponent', () => {
  let component: PublockPaneComponent;
  let fixture: ComponentFixture<PublockPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublockPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublockPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
