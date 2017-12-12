import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPaneComponent } from './menu-pane.component';

describe('MenuPaneComponent', () => {
  let component: MenuPaneComponent;
  let fixture: ComponentFixture<MenuPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
